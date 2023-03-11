import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'
import { UsersProvider } from './context/UsersState'
import { Login } from './Components/Auth/Login/Login'

export const App = () => {

  return (
    <div className='body'>
      <UsersProvider>
        <Login/> 
        <BrowserRouter>
          <NavBar className='navbar' />
          <div className='header-container'>
            <Header className='header' />
            <Routes className='content' />
          </div>
        </BrowserRouter>
      </UsersProvider>
    </div>
  )
}
