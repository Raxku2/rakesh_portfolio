import React, { useContext } from 'react'
import { DataContext } from '../../Context/DataContext'

export default function ProjectDisplay({ side = 'l', url = '', ProjectName = 'nam', Desc = 'description' }) {
    const handelclick = () => {
        window.open(url, '_blank');
    }
    return (
        <div className={`flex items-center ${side == 'r' ? "justify-end" : side == 'l' ? "justify-start" : ''}`}>

            <div className={`p-2 m-4 rounded-[6px] lg:w-[70%] w-[88%] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.158)] ${side == 'r' ? "text-end" : side == 'l' ? "text-start" : ''} `}
                onClick={handelclick}
            >
                <h2 className='text-[24px] font-semibold'>{ProjectName}</h2>
                <p className='text-center font-medium p-2'>{Desc}
                </p>
            </div>

        </div >
    )
}
