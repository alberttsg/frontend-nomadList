import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'
import { UsersProvider } from './context/UsersState'
import { Login } from './Components/Auth/Login/Login'


export const App = () => {

localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGUwNDhjMmI0NzQzYjcxM2RlMDYwZSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2Nzg2NDAyNjksImV4cCI6MTY4MzgyNDI2OX0.FEFtiq0npjbzPz_YTslGuqtQfQ7bbYknfHP1ttuxNac')
  const token = localStorage.getItem('token')
 localStorage.clear()

  return (
    <div className='body'>
      <UsersProvider>
        <BrowserRouter>
        {
        !token ?
        <Login/> :
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
