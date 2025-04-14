import React from 'react'
import GitHubCalendarComponent from '../GithubCal/GithubCal'
import { GetRepo } from '../../Hooks'
import RepoCard from '../ReoCard/RepoCard';

export default function Projects() {
  const { repos2DArray, error } = GetRepo();
  // console.log(repos2DArray);
  
  return (
    <div className="PrjBody p-2 ">
      {/*  <div className='m-2'>
        <h2 className='font-bold text-[18px]'>I manage multiple GitHub accounts. Below is an overview of my GitHub activity</h2>
        <div className='flex flex-wrap p-2 justify-center items-center '>
          <GitHubCalendarComponent username={"pin4ka"} />
          <GitHubCalendarComponent username={"rax-2"} />
        </div>
        <p className='text-[10px] text-center font-semibold'>I manage multiple GitHub accounts to deepen my understanding of GitHub workflows, including pull requests, pushes, commits, and version control coordination between accounts. </p>
      </div> */}
      <div className='m-2'>
        <p className='font-bold text-[18px]'>The Complete Collection of My Projects </p>
        <div className='flex m-2 p-2 flex-wrap justify-center '>
          {
            repos2DArray.map((arr, index) =>{
             return ( <RepoCard Name={arr[0]} Desc={arr[1]} url={arr[2]} key={index} />)
            }  )
          }
        </div>
      </div>
    </div>
  )
}
