import React, { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router'

export default function Panoroma() {
  const navigate = useNavigate();

  const params = useParams();   // gets all params
  const id = params.id;         // access specific param

  const BACKEND = import.meta.env.VITE_BACKEND
  const REDION = import.meta.env.VITE_REDION;
  const RAZOR_KEY = import.meta.env.CHABI;

  const [appStatus, setAppStatus] = useState('payment token verifying')

  const startRegistrationPayment = async (dataOfToken) => {
  if (!window.Razorpay) {
    setAppStatus("Payment gateway failed to load. Refresh page.");
    return;
  }

  try {
    setAppStatus("Initializing payment...");

    // -----------------------------
    // 🔹 STEP 1: Create Order
    // -----------------------------
    const orderResponse = await fetch(
      `${BACKEND}/pay/order/${dataOfToken.user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: dataOfToken.user_id,
          team_id: dataOfToken.team_id,
          username: dataOfToken.username
        })
      }
    );

    if (!orderResponse.ok) {
      setAppStatus("Server error while creating order. Please try again.");
      return;
    }

    const order = await orderResponse.json();

    if (!order || !order.order_id || !order.amount) {
      setAppStatus("Invalid order response from server.");
      return;
    }

    // Flag to prevent the "ondismiss" race condition if a user pays via UPI
    let isPaymentSuccess = false;

    // -----------------------------
    // 🔹 STEP 2: Razorpay Config
    // -----------------------------
    const options = {
      key: RAZOR_KEY,
      amount: order.amount,
      currency: "INR",
      order_id: order.order_id,
      name: "InnovateArena", // You can update this to your actual app name
      description: "InnovateArena - Payment",
      method: {
        emi: false,
        paylater: false
      },
      prefill: {
        name: dataOfToken.username || "",
        email: dataOfToken.email || "",
        contact: dataOfToken.phone || ""
      },
      notes: {
        team_id: dataOfToken.team_id,
        user_id: dataOfToken.user_id
      },

      // -----------------------------
      // 🔹 STEP 3: Payment Success Handler
      // -----------------------------
      handler: async function (response) {
        // Mark as success immediately so the modal 'ondismiss' doesn't fire as a cancellation
        isPaymentSuccess = true; 
        setAppStatus("Payment received! Verifying securely...");

        try {
          if (
            !response.razorpay_payment_id ||
            !response.razorpay_order_id ||
            !response.razorpay_signature
          ) {
            setAppStatus("Payment response invalid from gateway.");
            return;
          }

          const verifyResponse = await fetch(
            `${BACKEND}/pay/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                user_id: dataOfToken.user_id,
                team_id: dataOfToken.team_id,
                username: dataOfToken.username,
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature // MATCHES your updated backend!
              })
            }
          );

          // We parse the JSON because our backend now returns {"success": true}
          const result = await verifyResponse.json();

          // Check if response is 200 OK AND the JSON success flag is true
          if (verifyResponse.ok && result.success) {
            setAppStatus("Payment successful! Redirecting...");
            
            setTimeout(() => {
              window.location.href = REDION;
            }, 1500); // 1.5 seconds gives the user time to read the success message

          } else {
            setAppStatus("Payment verification rejected. Contact support.");
          }

        } catch (verifyError) {
          console.error("Verify error:", verifyError);
          setAppStatus("Network error during verification.");
        }
      },

      // -----------------------------
      // 🔹 Detect User Closing Payment
      // -----------------------------
      modal: {
        ondismiss: function () {
          // ONLY trigger cancellation if a success hasn't already been registered
          if (!isPaymentSuccess) {
            console.log("User closed payment popup");
            setAppStatus("Payment cancelled");
            // No automatic redirect here, so they can click 'Pay' again if they want
          }
        }
      },
      theme: {
        color: "#0f172a"
      }
    };

    const rzp = new window.Razorpay(options); // Added window. just to be safe

    // -----------------------------
    // 🔹 Payment Failure Listener
    // -----------------------------
    rzp.on("payment.failed", function (response) {
      console.error("Payment Failed:", response);
      setAppStatus(
        response.error?.description || "Payment failed. Try another method."
      );
    });

    // -----------------------------
    // 🔹 Open Razorpay Checkout
    // -----------------------------
    rzp.open();

  } catch (error) {
    console.error("Payment error:", error);
    setAppStatus("Unexpected payment error. Please try again.");
  }
}



  useEffect(() => {
    if (!id || id == '') {
      window.location.href = REDION
    }
    ; (async () => {
      try {
        const tokenData = await fetch(BACKEND + `/pay/token/${id}`)
        if (tokenData.status == 200) {
          const dataOfToken = await tokenData.json();
          console.log(dataOfToken);

          startRegistrationPayment(dataOfToken);
        }
        else {
          console.log(tokenData.status)
        }
      } catch (error) {
        console.log(error);

      }


    })();
  })

  return (
    <div>
      <button
        onClick={() => {
          window.location.href = REDION
        }}
      >
        go back to INNOVATEARENA
      </button>
      <h1>Status: {appStatus}</h1>
    </div>
  )
}
