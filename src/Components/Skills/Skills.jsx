import React, { useContext, useEffect } from "react"
import { DataContext } from "../../Context/DataContext"
import SkiillMeter from "../SkillMeter/SkiillMeter"

export default function Skills() {
    const { BackGroundColor, SkillsList } = useContext(DataContext)


    return (
        <div className='flex flex-wrap  lg:flex-row items-center justify-end p-4'>
            <div className='w-[92%] lg:w-[80%]  text-center p-1 rounded-[10px]'
                style={{ backgroundColor: BackGroundColor }}
            >
                <h2 className='text-[30px] m-4 font-bold'>My Skills</h2>
                <div className='p-2 m-4 flex flex-wrap justify-center'>
                    {
                        SkillsList.map((TheSkill,index) => {
                            return (
                                <SkiillMeter Name={TheSkill[0]} num={TheSkill[1]} 
                                key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
