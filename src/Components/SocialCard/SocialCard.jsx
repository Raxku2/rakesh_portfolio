import React from 'react'

export default function SocialCard({url,Logo}) {
    const handelclick = () => {
        window.open(url, '_blank');
    }
  return (
    <div className='m-2 p-2 rounded-3 cursor-pointer rounded-[6px]  bg-[rgba(255,255,255,0.06)] md:hover:bg-[rgba(255,255,255,0.158)] ' onClick={handelclick}>
        <img src={Logo} alt="" className='rounded-2 h-10 ' />
    </div>
  )
}
