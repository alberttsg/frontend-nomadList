import { Card } from 'antd';
import { useContext } from 'react';
import { PostContext } from '../PostCard.jsx';

export function PostContent() {
  const { post } = useContext(PostContext);

  if (!post?.content) return null;

  return (
    <>
    <Card bordered={true} style={{ width: '100%', border:'0.1px solid lightgray' }}>
    <p>{post?.content}</p>
    
  </Card>
        </>
  )
}