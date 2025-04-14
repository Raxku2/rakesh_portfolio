import React from 'react'

export default function Footer() {
  return (
    <div className='footerContainer flex justify-between pl-4 pt-1 pb-1 pr-4 text-[10px] items-center flex-wrap'>
        <ul className='flex items-center flex-wrap '>
            <li className=' pr-2'>&copy; { new Date().getFullYear()} {`Pinaka`}  </li>
            <li className=''>All rights reserved.</li>
        </ul>
        <ul className="flex justify-center items-center flex-wrap">
            <li>Built using React</li>
            <li><img src="./react.png" alt=""  className="h-[14px] ml-1 animate-spin360"/></li>
        </ul>
    </div>
  )
}
