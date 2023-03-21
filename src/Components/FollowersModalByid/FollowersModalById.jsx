import { useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Avatar, Button, Modal } from 'antd';
import { GlobalContext } from '../../context/UsersState';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const FollowersModalById = ({ visible, onClose }) => {
  const [followers, setFollowers] = useState([]);
  const [user,setUser] = useState([]);
  const {userId} = useParams();
  console.log(userId)
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
 
    getFollowers();

  },[]);
    const getFollowers = async () => {
      const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/users/id/${userId}`, {
        headers: {
          Authorization: token
        }
      });
      console.log(res.data);
      setUser(res.data);
    }
    useEffect(() => {
    setFollowers(user.followers)
    console.log('followers',followers);
    },[user])
    
   
  return (
    <Modal
      title="Followers"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <ul>
        {followers && followers.map(follower => (
          <ul style={{cursor: 'pointer'}} key={follower._id} onClick={()=>{
            const userlocal = JSON.parse(localStorage.getItem('user'));
            if(userlocal._id === follower._id){
            navigate('/profile');
            }
            console.log('userLocal', userlocal);
            navigate(`/profile/${follower._id}`);
            
          }}>
            <Avatar size={60} src={follower.avatar[0] ||'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'} alt={follower.firstName} />
            {follower.firstName}
          </ul >
        ))}
      </ul>
    </Modal>
  );
};
export default FollowersModalById;