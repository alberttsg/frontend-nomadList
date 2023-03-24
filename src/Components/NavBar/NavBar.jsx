import './NavBar.scss'
import { HomeFilled, PlusCircleFilled, UserOutlined, UnlockFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalContext } from '../../context/UsersState'

export const NavBar = () => {
  const { reset, logOut } = useContext(GlobalContext);
  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <div className='logo' onClick={() => navigate('/')}>nomad</div>
      <div className='container-nav'>
        <div className='home' onClick={() => navigate('/')}><HomeFilled className='iconHome' /><div className='divHome'>Home</div> </div>
        <div className='profile' onClick={() => navigate('/profile')}><UserOutlined className='iconProfile' /><div className='divProfile'>Profile</div></div>
        <div className='create' onClick={() => navigate('/createpost')} ><PlusCircleFilled className='iconCreate' /><div className='divCreate'>Create</div></div>
        <div className='logout' 
        onClick={()=>{
          logOut(),
          navigate('/')
          reset()
        }}>
          <UnlockFilled className='iconlogout' /><div className='divLogout'>Log out</div></div>
      </div>
    </div>
  )
}
