import { createContext } from 'react';
import { PostHeader } from './components/PostHeader';
import { PostImage } from './components/PostImage';
import { PostContent } from './components/PostContent';
import { LikeButton } from './components/LikeButton.jsx'
import { CommentsButton } from './components/CommentsButton.jsx'
import CommentsPrint from '../../Comments/CommentsPrint.jsx';
import { Card, Divider } from 'antd';

export const PostContext = createContext();

export function PostCard({ post, forwardedRef }) {
  return (
    <PostContext.Provider value={{ post: post }}>
      <Card hoverable style={{ maxWidth: '95vw' }}
        title={<PostHeader />}>

        <div ref={forwardedRef}>
          <PostImage />
          <PostContent />
          <Divider type='horizontal' />
          <div style={{display: 'flex', gap: '20px'}}>
          <LikeButton />
          <CommentsPrint />
          </div>
        </div>

      </Card>
    </PostContext.Provider>
  )
}






