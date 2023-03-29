import { createContext, useContext, useState } from 'react';
import { PostHeader } from './components/PostHeader';
import { PostImage } from './components/PostImage';
import { PostContent } from './components/PostContent';
import { LikeButton } from './components/LikeButton.jsx'
import { CommentsButton } from './components/comments/CommentsButton.jsx'
import { CommentsDisplay } from './components/comments/CommentsDisplay';
import { CommentsInputForm } from './components/comments/CommentsInputForm';
import { Card, Divider } from 'antd';
import { emojisBySentiment } from '../../../resources/sentimentAnalysis';
import { useNavigate } from 'react-router';

export const PostContext = createContext();

export function PostCard({ post, forwardedRef }) {
  const [postData, setPostData] = useState(post)
  const [showComments, setShowComments] = useState(false);


  const emojiSentiment = emojisBySentiment(postData?.sentiment)
  
  return (
    <PostContext.Provider value={{ post: postData, setPostData }}>
      <Card hoverable title={<PostHeader />} style={{ width: '100%', maxWidth: '450px', paddingTop: 'none' }} >
        <div style={{ paddingTop: 'none' }} ref={forwardedRef}>
          <PostImage />
          <PostContent />
          <Divider type='horizontal' />
          <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <LikeButton />
              <CommentsButton handleOpen={() => setShowComments(!showComments)} />
            </div>
            <div>{emojiSentiment}</div>
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
