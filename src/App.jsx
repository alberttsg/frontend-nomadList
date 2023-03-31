import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'
import { GlobalContext } from './context/UsersState'
import { Login } from './Components/Auth/Login/Login'
import { useContext, useEffect } from 'react'
import { notification } from 'antd'
import { ChatProvider } from './Components/Chat/context/ChatProvider'

export const App = () => {

  const { isSuccess, reset, token } = useContext(GlobalContext);
  
  useEffect(() => {
    if (isSuccess) {
      return notification.success({
        message: "Welcome to Nomad, your social network!",
        style: {
          width: "100%"
        }
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
            <ChatProvider>
              <NavBar className='navbar' />
              <div className='header-container'>
                <Header className='header' />
                <Routes className='content' />
              </div>
            </ChatProvider>
        }
      </BrowserRouter>
    </div>
  )
}
