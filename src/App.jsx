import { Routes } from './routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'
import { UserContext } from './context/UserState'
import { Login } from './Components/Auth/Login/Login'
import { useContext, useEffect } from 'react'
import { notification } from 'antd'

export const App = () => {

  const { token } = useContext(UserContext);
  useEffect(() => {
    if (token) {
      return notification.success({
        message: `Welcome to Nomad, your social network!`,
      });
    }
  }, [token]);

  return (
    <div className='body'>
      <BrowserRouter>
        {!token ?
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
