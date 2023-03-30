import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProfileContext } from '../../Profile';
import { Avatar, Button, Modal, List } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';

export const FollowedModal = () => {
  const { userData } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} type='secondary'>
        <span style={{display: 'flex', alignItems: 'center'}}>
          {userData?.followedCount} followed{' '}{' '}<CaretDownFilled style={{color: '#1777FF'}} />
        </span>
      </Button>
      <Modal
        title="Followed"
        open={isOpen}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <List
          dataSource={userData?.followed}
          renderItem={
            (followed) =>
              <ul style={{ cursor: 'pointer', display: 'flex', justifyContent: 'start', flexDirection: 'row', alignItems: 'start', padding: '5px', margin: '10px' ,height: '100%', width: '90%' }} key={followed._id} onClick={() => {
                navigate(`/profile/${followed._id}`)
                setOpen(false)
              }}>
                <Avatar style={{ border: '0.5px solid gray' }}  size={60} src={followed.avatar || 'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'} alt={followed.firstName} />
                <h4  style={{ textTransform: 'capitalize', cursor: 'pointer', padding: '10px' ,fontSize: '15px', color: 'rgb(89,138,168)'}} >{followed?.firstName}</h4>
              </ul >
          }
        />
      </Modal>
    </>
  );
};