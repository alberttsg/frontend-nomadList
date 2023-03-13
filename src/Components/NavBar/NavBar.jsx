import './NavBar.scss'
import { HomeFilled, PlusCircleFilled, UserOutlined, UnlockFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {

  const navigate = useNavigate()

  const Logout = () => {

    localStorage.removeItem('token')
    return navigate('/')
  }

  return (
    <div className='navbar'>
      <div className='logo' onClick={()=>navigate('/')}>nomad</div>
      <div className='container-nav'>
        <div className='home' onClick={()=>navigate('/')}><HomeFilled className='iconHome'/><div className='divHome'>Home</div> </div>
        <div className='profile' onClick={()=>navigate('/profile')}><UserOutlined className='iconProfile'/><div className='divProfile'>Profile</div></div>
        <div className='create' onClick={()=>navigate('/createPost')} ><PlusCircleFilled className='iconCreate'/><div className='divCreate'>Crear</div></div>
        <div className='logout' onClick={Logout}><UnlockFilled className='iconlogout'/><div className='divLogout'>Log out</div></div>
      </div>
    </div>
  )
}
