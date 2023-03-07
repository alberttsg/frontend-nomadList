import { Routes } from './Components/Routes/Routes'
import { BrowserRouter } from "react-router-dom"
import './App.scss'

export const App = () => {

  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  )
}
