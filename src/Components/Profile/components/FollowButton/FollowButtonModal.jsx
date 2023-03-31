import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../../context/UsersState';
import { toggleFollow } from '../../../../service/userService';
import { Button, Spin } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';

export function FollowButtonModal({ userId }) {
  const { user, getUserInfo } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(user?.followed.some(e => e._id === userId));

  const handleFollow = async () => {
    setLoading(true);
    await toggleFollow(userId);
    await getUserInfo();
    setLoading(false);
  }

  useEffect(() => {
    setFollowed(user?.followed.some(e => e._id === userId));
  }, [user])
  
  if (user?._id == userId) return null;

  return (
    <Spin spinning={isLoading}>
      <Button
        style={{
          backgroundColor: !followed ? '#52B2C8' : '#c8c6c7',
          color: 'white',
        }}
        onClick={() => handleFollow()}
      >
        {!followed ?
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', color: 'white' }}>
            <StarOutlined style={{ color: 'yellow', fontSize: '20px' }} />
            Follow
          </div>
          :
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', color: 'black' }}>
            <StarFilled style={{ color: 'yellow', fontSize: '20px' }} />
            Unfollow
          </div>
        }
      </Button>
    </Spin>
  )
}
