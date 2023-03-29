import React, { useContext } from 'react'
import { ProfileContext } from '../../Profile';
import { PostCard } from '../../../PostComponent/PostCard/PostCard';

export function UserLikedPosts() {
  const { userData } = useContext(ProfileContext);

  return (
    <div style={{ display: 'flex', boxSizing: 'border-box', flexFlow: 'column nowrap', width: '100%', alignItems: 'center', padding: '10px', gap: '20px' }}>
      {userData?.likedPosts && userData?.likedPosts?.map((post, index) =>
        <PostCard post={post} key={index} />
      )}
    </div>
  )
}