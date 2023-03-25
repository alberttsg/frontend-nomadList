import { Divider } from 'antd';
import { useContext, useEffect, useState, createContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GlobalContext } from '../../context/UsersState';
import { UserCard } from './components/UserCard/UserCard';
import UsersPosts from '../UsersPosts/UsersPosts';
import { getUserById } from '../../service/userService';
import './Profile.scss';

export const ProfileContext = createContext();

export const Profile = () => {
  const { user } = useContext(GlobalContext);
  const { userId } = useParams();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      if (!userId) return navigate('/profile/' + user._id);
      const response = await getUserById(userId);
      if (!response) return navigate('/home');
      setUserData(response);
    };
    getData();
  }, [userId])

  return (
    <ProfileContext.Provider value={{ userData, setUserData }}>
      <div className='profile-container'>
        <UserCard />
        <Divider plain />
        {/* <UsersPosts /> */}
      </div>
    </ProfileContext.Provider>
  );
};
