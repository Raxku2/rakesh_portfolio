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
        setAppStatus("Server error while creating order.");
        return;
      }

      const order = await orderResponse.json();

      if (!order || !order.order_id || !order.amount) {
        setAppStatus("Invalid order response.");
        return;
      }


      // -----------------------------
      // 🔹 STEP 2: Razorpay Config
      // -----------------------------
      const options = {

        key: RAZOR_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.order_id,

        name: "Rakesh Kundu",
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
        // 🔹 STEP 3: Payment Success
        // -----------------------------
        handler: async function (response) {

          try {

            if (
              !response.razorpay_payment_id ||
              !response.razorpay_order_id ||
              !response.razorpay_signature
            ) {
              setAppStatus("Payment response invalid.");
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
                  signature: response.razorpay_signature
                })
              }
            );

            if (!verifyResponse.ok) {
              setAppStatus("Payment verification failed.");
              return;
            }

            const result = await verifyResponse.json();

            if (result && result.success) {

              setAppStatus("Payment successful");

              setTimeout(() => {
                window.location.href = REDION;
              }, 1000);

            } else {

              setAppStatus("Payment verification rejected");

            }

          } catch (verifyError) {

            console.error("Verify error:", verifyError);
            setAppStatus("Payment verification error.");

          }
        },


        // -----------------------------
        // 🔹 Detect User Closing Payment
        // -----------------------------
        modal: {
          ondismiss: function () {
            console.log("User closed payment popup");
            setAppStatus("Payment cancelled");
            window.location.href = REDION;
          }
        },

        theme: {
          color: "#0f172a"
        }

      };


      const rzp = new Razorpay(options);


      // -----------------------------
      // 🔹 Payment Failure Listener
      // -----------------------------
      rzp.on("payment.failed", function (response) {

        console.error("Payment Failed:", response);

        setAppStatus(
          response.error?.description ||
          "Payment failed. Try again."
        );

      });


      // -----------------------------
      // 🔹 Open Razorpay Checkout
      // -----------------------------
      rzp.open();


    } catch (error) {

      console.error("Payment error:", error);
      setAppStatus("Unexpected payment error. Try again.");

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
