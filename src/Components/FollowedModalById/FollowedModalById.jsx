import { useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Avatar, Button, Modal } from 'antd';
import { GlobalContext } from '../../context/UsersState';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const FollowedModalById = ({ followed, visible, onClose }) => {
  const [data, setData] = useState([])
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
      return res.data;
    }
    
   
  return (
    <Modal
      title="Followed"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <ul>
        {user && user.followed.map(followed => (
          <ul style={{cursor: 'pointer'}} key={followed._id} onClick={()=>{
            navigate(`/profile/${followed._id}`)
          }}>
            <Avatar size={60} src={followed.avatar[0] ||'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'} alt={followed.firstName} />
            {followed.firstName}
          </ul >
        ))}
      </ul>
    </Modal>
  );
};
export default FollowedModalById;