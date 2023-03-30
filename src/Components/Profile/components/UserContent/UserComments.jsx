import { useEffect, useContext, useState } from 'react';
import { ProfileContext } from '../../Profile';

export function UserComments() {
  const { userData } = useContext(ProfileContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {

  }, [userData])

  return (
    <div style={{ display: 'flex', boxSizing: 'border-box', flexFlow: 'column nowrap', width: '100%', alignItems: 'center', padding: '10px', gap: '20px' }}>
      {comments && comments?.map((post, index) =>
        <PostCard post={post} key={index} />
      )}
    </div>
  )
}