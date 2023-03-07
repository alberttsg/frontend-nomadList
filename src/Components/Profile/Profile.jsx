import { Header } from '../Header/Header'
import { NavBar } from '../NavBar/NavBar'
import { Content } from '../Content/Content'
import './Profile.scss'

export const Profile = () => {

  return (
    <div className='body'>
      <NavBar/>
      <div className='headerContent'>
        <Header/>
        <Content/>
      </div>
    </div>
  )
}
