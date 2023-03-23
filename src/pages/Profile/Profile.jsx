import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { UserContext } from '../../context/UserState';
import { getUserById } from '../../service/userService';
import { UserCard } from '../../components/Profile/UserCard';
import UsersPosts from '../../Components/UsersPosts/UsersPosts';
import { Row } from 'antd';
import './Profile.scss';

export const Profile = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function getData() {
      if (!id) return navigate('/profile/' + user._id)
      const res = await getUserById(id);
      if (!res) navigate('/notfound');
      setUserData(res);
    };
    getData();
  }, [id])

  return (
    <>
      <Row>
        <UserCard user={userData} />
      </Row>
      <Row>
        <UsersPosts />
      </Row>
    </>
  );
};
