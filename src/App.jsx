import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'
import { GlobalContext } from './context/UsersState'
import { Login } from './Components/Auth/Login/Login'
import { useContext, useEffect } from 'react'
import { notification } from 'antd'
import { ChatLayout } from './Components/Chat/components/ChatLayout'

export const App = () => {

  const { token, isSuccess, reset } = useContext(GlobalContext);
  useEffect(() => {
    if (isSuccess) {
      return notification.success({
        message: "Welcome to Nomad, your social network!",
      });
    }
    reset()
  }, [isSuccess]);

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
        <ChatLayout />
      </BrowserRouter>

    </div>
  )
}
