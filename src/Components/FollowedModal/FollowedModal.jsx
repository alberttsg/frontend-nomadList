import { useContext, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Modal } from 'antd';
import { GlobalContext } from '../../context/UsersState';
import { useNavigate } from 'react-router';

const FollowedModal = ({ followed, visiblers, onClosers }) => {
    const {user} = useContext(GlobalContext)
    const navigate = useNavigate();
    
  return (
    <Modal
      title="Followers"
      open={visiblers}
      onCancel={onClosers}
      footer={[
        <Button key="close" onClick={onClosers}>
          Cerrar
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
export default FollowedModal;