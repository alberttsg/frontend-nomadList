import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'
import { GlobalContext } from './context/UsersState'
import { Login } from './Components/Auth/Login/Login'
import { useContext, useEffect } from 'react'
import { notification } from 'antd'

export const App = () => {

  const { token, isSuccess, reset } = useContext(GlobalContext);
  useEffect(() => {
    if (isSuccess) {
      return notification.success({
        message: "Welcome. You have successfully registered!!",
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
      </BrowserRouter>

    </div>
  )
}
