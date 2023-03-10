import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'
import { UsersProvider } from './context/UsersState'
import { Register } from './Components/Auth/Register/Register'

export const App = () => {
localStorage.setItem('token', 'dd')
  const token = localStorage.getItem('token')
 localStorage.clear()
  console.log(token)

  return (
    <div className='body'>
      <UsersProvider>
        <BrowserRouter>
        {
        !token ?
        <Register/> :
        <>
          <NavBar className='navbar'/>
            <div className='header-container'>
              <Header className='header'/>
              <Routes className='content'/>
            </div></>
          }
        
        
        </BrowserRouter>
      </UsersProvider>
    </div>
  )
}
