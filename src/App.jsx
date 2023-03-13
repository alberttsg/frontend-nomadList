import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'
import { GlobalContext } from './context/UsersState'
import { Login } from './Components/Auth/Login/Login'
import { useContext } from 'react'



export const App = () => {

  const { token } = useContext(GlobalContext);

  return (
    <div className='body'>
      <BrowserRouter>
        {
          !token ?
            <Login /> :
            <>
              <NavBar className='navbar' />
              <div className='header-container'>
                <Header className='header' />
                <Routes className='content' />
              </div>
            </>
        }
      </BrowserRouter>

    </div>
  )
}
