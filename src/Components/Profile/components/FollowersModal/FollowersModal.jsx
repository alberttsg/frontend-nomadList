import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProfileContext } from '../../Profile';
import { Avatar, Button, Modal, List } from 'antd';

export const FollowersModal = () => {
  const { userData } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} type='secondary'>
        <span>
          {userData?.followersCount} seguidores
        </span>
      </Button>
      <Modal
        title="Followers"
        open={isOpen}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
            Close
          </Button>
        ]}
      >
        <List
          dataSource={userData?.followers}
          renderItem={
            (follower) =>
              <ul style={{ cursor: 'pointer' }} key={follower?._id} onClick={() => {
                navigate(`/profile/${follower?._id}`)
              }}>
                <Avatar size={60} src={follower?.avatar || 'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'} alt={follower?.firstName} />
                {follower?.firstName}
              </ul >
          }
        />
      </Modal>
    </>
  );
};