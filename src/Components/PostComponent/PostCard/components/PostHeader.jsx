import { useContext } from 'react';
import { PostContext } from '../PostCard.jsx';
import { DateComponent } from '../../../DateComponent/DateComponent.jsx';
import { Row, Avatar } from 'antd';

export function PostHeader() {
  const { post } = useContext(PostContext);

  return (
    <Row justify='start'>
      <Row
        align='middle'
        style={{
          width: '100%',
          margin: '10px',
          fontSize: '12px',
          gap: '10px',
        }}>
        <Avatar size={20} src={post?.author?.avatar} />
        <span>{post?.author?.displayName}</span>
        <DateComponent datePost={post?.createdAt} />
      </Row>
      <Row
        align='middle'
        style={{
          width: '100%',
          fontWeight: 'bold',
          fontSize: '20px',
          boxSizing: 'content-box',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
        }}>
        {post?.title}
      </Row>
    </Row>
  )
}