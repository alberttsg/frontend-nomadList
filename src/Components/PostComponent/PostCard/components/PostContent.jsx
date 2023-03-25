import { useContext } from 'react';
import { PostContext } from '../PostCard.jsx';

export function PostContent() {
  const { post } = useContext(PostContext);

  if (!post?.content) return null;

  return (
    <div
      style={{
        border: '1px solid lightgrey',
        borderRadius: '5px',
        padding: '5px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'normal',
        minHeight: '20px',
      }}>
      {post?.content}
    </div>
  )
}