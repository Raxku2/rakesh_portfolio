import React, { useContext } from 'react'
import { DataContext } from '../../Context/DataContext'
import DP from '../DP/DP';

export default function Info() {
    const { Name, Bio } = useContext(DataContext)

    return (
        <div className='flex flex-wrap flex-col lg:flex-row items-center justify-center p-4 '>

            <div className="B w-full lg:w-[65%] flex justify-center lg:justify-end items-center lg:items-start " >
                <div className="text-center lg:text-left lg:mr-12">
                    <div className='text-[50px] font-bold'>{Name}</div>
                    <div className='pl-[8px] pt-[0px] text-[20px]'>{Bio}</div>
                </div>
            </div>

            <div className="A w-full lg:w-[35%] p-2 flex items-center justify-center lg:justify-start lg:items-start">
                <DP />
            </div>
        </div>


    )
}
