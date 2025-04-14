import './index.css'
import App from './App.jsx'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { DataContext } from './Context/DataContext.js'
import { Contact, Footer, NavBar, Projects } from './Components'
import { BrowserRouter, Route, Routes } from "react-router"
import { SkillsList, Name, Bio, BackGroundColor, DisPlayProjects } from './Dependecy/Dpnc.js'

function Main() {
  const [profilePicUrl, setProfilePicUrl] = useState('./DP/dp.jpg')
  const [Repos,setRepos] = useState([])

  return (
    <DataContext.Provider value={{ Name, Bio, profilePicUrl, setProfilePicUrl, BackGroundColor, SkillsList, DisPlayProjects,Repos }}>
      <BrowserRouter >
        <header className='fixed top-0 left-0 right-0 z-50  pl-1 pr-1 '>
          <NavBar />
        </header>

        <main className=' mt-14'>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/projects' element={<Projects username={"rax-2"} />} />
          </Routes>
        </main>

        <footer >
          <Footer/>
        </footer>
      </BrowserRouter>
    </DataContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)