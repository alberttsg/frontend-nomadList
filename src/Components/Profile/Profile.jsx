import { Divider } from 'antd';
import { useContext, useEffect, useState, createContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GlobalContext } from '../../context/UsersState';
import { UserCard } from './components/UserCard/UserCard';
import UsersPosts from '../UsersPosts/UsersPosts';
import { getUserById } from '../../service/userService';
import { Spin } from 'antd';
import './Profile.scss';

export const ProfileContext = createContext();

export const Profile = () => {
  const { user } = useContext(GlobalContext);
  const { userId } = useParams();
  const [userData, setUserData] = useState();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (!userId) return navigate('/profile/' + user._id);
      const response = await getUserById(userId);
      if (!response) return navigate('/home');
      setUserData(response);
      setLoading(false);
    };
    getData();
  }, [userId])

  return (
    <ProfileContext.Provider value={{ userData, setUserData }}>
      <Spin spinning={isLoading}>
        <div className='profile-container'>
          <UserCard />
          {console.log(userData)}
          <Divider plain />
          {/* <UsersPosts /> */}
        </div>
      </Spin>
    </ProfileContext.Provider>
  );
};
