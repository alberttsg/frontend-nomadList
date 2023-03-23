import { useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Avatar, Button, Modal } from 'antd';
import { GlobalContext } from '../../context/UsersState';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const FollowedModalById = ({  visiblers, onClosers }) => {
  const [followed, setFollowed] = useState([]);
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
    setFollowed(user.followed)
    },[user])
    
   
  return (
    <Modal
      title="Followed"
      open={visiblers}
      onCancel={onClosers}
      footer={[
        <Button key="close" onClick={onClosers}>
          Close
        </Button>,
      ]}
    >
      <ul>
        {followed && followed.map(followed => (
          <ul style={{cursor: 'pointer'}} key={followed._id} onClick={()=>{
            const userlocal = JSON.parse(localStorage.getItem('user'));
            if(userlocal._id === followed._id){
            navigate('/profile');
            }
            console.log('userLocal', userlocal);
            navigate(`/profile/${followed._id}`);
            
          }}>
            <Avatar size={60} src={followed.avatar ||'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'} alt={followed.firstName} />
            {followed.firstName}
          </ul >
        ))}
      </ul>
    </Modal>
  );
};
export default FollowedModalById;