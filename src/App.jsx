import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import { NavBar } from './Components/NavBar/NavBar'
import { Header } from './Components/Header/Header'

export const App = () => {

  return (
    <div className='body'>
      <BrowserRouter>
      <NavBar/>
        <div className='header-content'>
          <Header/>
          <Routes/>
        </div>
      </BrowserRouter>
    </div>
  )
}
