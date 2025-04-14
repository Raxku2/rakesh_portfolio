import React from 'react'

export default function RepoCard({Name = "Name" ,Desc = "Decscription",url}) {

    const handelclick = () => {
        window.open(url, '_blank');
    }
  return (
    <div onClick={handelclick} className='m-2 p-3 bg-[rgba(255,255,255,0.06)] md:hover:bg-[rgba(255,255,255,0.158)] rounded-[8px]' >
    <h2 className='text-[12px] font-semibold'>
        {Name}
    </h2>
    <div className='p-2 text-[10px] flex flex-wrap justify-normal'>
        <p>{Desc}</p>
    </div>
    </div>
  )
}
