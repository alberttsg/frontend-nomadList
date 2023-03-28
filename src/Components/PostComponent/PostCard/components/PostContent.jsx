import { Card } from 'antd';
import { useContext } from 'react';
import { PostContext } from '../PostCard.jsx';

export function PostContent() {
  const { post } = useContext(PostContext);

  if (!post?.content) return null;

  return (
    <>
    <Card bordered={true} style={{ width: '100%', webkitBoxShadow: '4px 6px 10px 1px rgba(0,0,0,0.22)', 
boxShadow:' 4px 6px 10px 1px rgba(0,0,0,0.06)' }}>
    <p>{post?.content}</p>
    
  </Card>
        </>
  )
}