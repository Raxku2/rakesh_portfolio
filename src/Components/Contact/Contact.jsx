import React, { useState } from 'react'
import { BackGroundColor } from '../../Dependecy/Dpnc';
import SocialCard from '../SocialCard/SocialCard';

export default function Contact() {

  const [SentIcon, setSentIcon] = useState(false)
  const [Msg, setMsg] = useState('Send it')

  const onSubmit = async (event) => {
    event.preventDefault();
    setSentIcon(true)
    setMsg("Sending...")
    const formData = new FormData(event.target);

    formData.append("access_key", "09d4d1df-6fbb-4238-8940-23dd4689e934");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());
    setSentIcon(true)
    setMsg("Sent!!")
    if (res.success) {
      setSentIcon(false)
      console.log("Success", res);
      setMsg("Sent to me")
      document.getElementById('myForm').reset();
    }
  };

  return (
    <div className="ContactBody p-2">
      <div>
        <h2 className='p-1 lg:pl-[14%] text-[20px] font-semibold'>
        Drop me a message
        </h2>
        <div className='flex justify-center items-center'>
          <form onSubmit={onSubmit} className='w-[80%] lg:w-[50%] text-[12px] ' id='myForm'>
            <div >
              <div><input type="text" className='border-none text-[12px] outline-none m-2 w-[100%] rounded-[8px]' name="name" style={{ backgroundColor: BackGroundColor }} placeholder='What is your name?' required /></div>
              <div><input type="text" name="Subject" value={"Contact from Portfolio"} hidden readOnly /></div>
              <div><input type="email" className='border-none text-[12px] outline-none m-2 w-[100%] rounded-[8px]' name="email" style={{ backgroundColor: BackGroundColor }} placeholder='Where should I email you?' required /> </div>
              <div><textarea name="message" className='border-none text-[12px] outline-none m-2 w-[100%] rounded-[8px] p-2 h-32 ' style={{ backgroundColor: BackGroundColor }} placeholder=' Write a message to me:'required  ></textarea></div>
              <div className='flex justify-center items-center '>
                <button type="submit" className={`flex justify-center items-center h-8 text-8 p-2 rounded-[8px] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.158)]`}>
                  <p className='text-[14px] ' >{Msg}</p>
                  <img src="./send.png" className='h-[18px] filter invert pl-1' alt="" hidden={SentIcon} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='p-10'>
        <h2 className='p-1 text-[20px] font-semibold text-center'>
        Connect with me on
        </h2>
        <div className='flex items-center justify-center p-2 flex-wrap'>
          <SocialCard Logo={"./social/ld.png"} url={"http://www.linkedin.com/in/rakesh4002/"} />
          <SocialCard Logo={"./social/fb.png"} url={"https://www.facebook.com/Raxkund"} />
          <SocialCard Logo={"./social/ins.png"} url={"https://www.instagram.com/rakeshkun2024/"} />
          <SocialCard Logo={"./social/twt.png"} url={"https://x.com/r4ksh"} />
          <SocialCard Logo={"./social/gh.png"} url={"http://github.com/rax-2"} />
          <SocialCard Logo={"./social/disc.png"} url={"https://discord.gg/WEj45mdEFN"} />
        </div>
      </div>
    </div>
  );

}
