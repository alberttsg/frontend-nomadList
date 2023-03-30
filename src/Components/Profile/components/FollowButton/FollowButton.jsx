import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../context/UsersState';
import { ProfileContext } from '../../Profile';
import { toggleFollow } from '../../../../service/userService';
import { Button, Spin } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';

export function FollowButton() {
  const { user, getUserInfo } = useContext(GlobalContext);
  const { userData, setUserData } = useContext(ProfileContext);
  const [followed, setFollowed] = useState(userData?.followers?.some(e => e._id == user?._id))
  const [isLoading, setLoading] = useState(false)

  const handleFollow = async () => {
    setLoading(true);
    const res = await toggleFollow(userData?._id);
    setUserData(res);
    await getUserInfo();
    setLoading(false);
  }

  useEffect(() => {
    const followStatus = userData?.followers?.some(e => e._id == user?._id);
    setFollowed(followStatus);
  }, [userData])

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