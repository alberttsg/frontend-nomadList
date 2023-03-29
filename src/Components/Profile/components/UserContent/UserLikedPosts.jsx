import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../Profile';
import { PostCard } from '../../../PostComponent/PostCard/PostCard';

export function UserLikedPosts() {
  const { userData } = useContext(ProfileContext);
  const [posts, setPosts] = useState(userData?.posts);

  useEffect(() => {
    setPosts(userData?.posts);
  }, [userData])

  return (
    <div style={{ display: 'flex', boxSizing: 'border-box', flexFlow: 'column nowrap', width: '100%', alignItems: 'center', padding: '10px', gap: '20px' }}>
      {posts && posts.map((post, index) =>
        <PostCard post={post} key={index} />
      )}
    </div>
  )
}