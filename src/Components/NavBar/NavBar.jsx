import React, { useContext } from 'react'
import { PageName, Resume } from '../../Hooks'
import { NavLink, useLocation } from 'react-router'
import { DataContext } from '../../Context/DataContext'

export default function NavBar() {
    PageName(useLocation())
    const { Name } = useContext(DataContext)
    return (
        <div>
            <nav className='backdrop-blur-30 text-[14px]'>
                <ul>
                    <NavLink to={'/'}>
                        <li className='Name_Page' style={{}}>{Name.split(" ")[0]}.</li>
                    </NavLink>
                </ul>
                <ul>
                    <NavLink to='/'><li>Home</li></NavLink>
                    <NavLink to='/projects'><li>Projects</li></NavLink>
                    <NavLink to='/contact'><li>Contact</li></NavLink>
                    <li className='NavItem flex justify-center items-center' onClick={Resume}>Resume <img className='h-[14px] filter invert ml-1'  src="./download.png" alt="" /> </li>
                </ul>
            </nav>
        </div>
    )
}
