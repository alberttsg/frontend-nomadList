import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserState';
import { Logo } from '../Header/Logo';
import { HomeFilled, PlusCircleFilled, UserOutlined, UnlockFilled } from '@ant-design/icons';
import './NavBar.scss';

export const NavBar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate()

  return (
    <div className='nav-bar'>
      <Logo size={50} width={100}/>
      <div className='nav-button' onClick={() => navigate('/')}>
        <HomeFilled />Home
      </div>
      <div className='nav-button' onClick={() => navigate('/profile')}>
        <UserOutlined />Profile
      </div>
      <div className='nav-button' onClick={() => navigate('/createpost')} >
        <PlusCircleFilled />Post
      </div>
      <div className='nav-button' onClick={() => { logout() }}>
        <UnlockFilled />Log out
      </div>
    </div>
  )
}
