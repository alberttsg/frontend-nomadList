import { createContext, useState } from 'react';
import { PostHeader } from './components/PostHeader';
import { PostImage } from './components/PostImage';
import { PostContent } from './components/PostContent';
import { LikeButton } from './components/LikeButton.jsx'
import { CommentsButton } from './components/comments/CommentsButton.jsx'
import { CommentsDisplay } from './components/comments/CommentsDisplay';
import { CommentsInputForm } from './components/comments/CommentsInputForm';
import { Card, Divider } from 'antd';

export const PostContext = createContext();

export function PostCard({ post, forwardedRef }) {
  const [postData, setPostData] = useState(post)
  const [showComments, setShowComments] = useState(false);

  return (
    <PostContext.Provider value={{ post: postData, setPostData }}>
      <Card hoverable style={{ maxWidth: '95vw' }}
        title={<PostHeader />}>

        <div ref={forwardedRef}>
          <PostImage />
          <PostContent />
          <Divider type='horizontal' />
          <div style={{ display: 'flex', gap: '20px' }}>
            <LikeButton />
            <CommentsButton handleOpen={() => setShowComments(!showComments)} />
          </div>
          {showComments &&
            <>
              <Divider type='horizontal' />
              <CommentsDisplay />
              <Divider type='horizontal' />
              <CommentsInputForm />
            </>
          }
        </div>

      </Card>
    </PostContext.Provider>
  )
}






