import { useContext, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Modal } from 'antd';
import { UserContext } from '../../context/UserState';
import { useNavigate } from 'react-router';

const FollowersModal = ({  visible, onClose }) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate();
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
        {user && user.followers.map(follower => (
          <ul style={{cursor: 'pointer'}} key={follower._id} onClick={()=>{
            navigate(`/profile/${follower._id}`)
          }}>
            <Avatar size={60} src={follower.avatar ||'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'} alt={follower.firstName} />
            {follower.firstName}
          </ul >
        ))}
      </ul>
    </Modal>
  );
};
export default FollowersModal;