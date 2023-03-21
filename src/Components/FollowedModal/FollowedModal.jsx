import { useContext, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Modal } from 'antd';
import { GlobalContext } from '../../context/UsersState';
import { useNavigate } from 'react-router';

const FollowedModal = ({ followed, visible, onClose }) => {
    const {user} = useContext(GlobalContext)
    const navigate = useNavigate();
    
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
            <Avatar size={60} src={followed.avatar ||'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'} alt={followed.firstName} />
            {followed.firstName}
          </ul >
        ))}
      </ul>
    </Modal>
  );
};
export default FollowedModal;