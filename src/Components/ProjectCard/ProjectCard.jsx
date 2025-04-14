import React, { useContext } from 'react'
import ProjectDisplay from '../ProjectDisplay/ProjectDisplay'
import { DataContext } from '../../Context/DataContext'

export default function ProjectCard() {
    const { DisPlayProjects } = useContext(DataContext)
    return (
        <div className={`flex flex-wrap  lg:flex-row items-center justify-start p-4`}>
            <div className='w-[100%] lg:w-[80%]  text-center p-1 bg-[rgba(255,255,255,0.06)] rounded-[10px]' >
                <h2 className={`text-[30px] m-4 font-bold `}>Favorite Projects</h2>

                {
                    DisPlayProjects.map((e,index) => {
                        return (<ProjectDisplay side={e[3]} ProjectName={e[0]} Desc={e[1]} url={e[2]} key={index} />)
                    })
                }


            </div>
        </div >
    )
}
