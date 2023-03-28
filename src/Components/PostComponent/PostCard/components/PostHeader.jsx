import { useContext } from 'react';
import { GlobalContext } from '../../../../context/UsersState.jsx';
import { PostContext } from '../PostCard.jsx';
import { EditPostButton } from './EditPostButton.jsx';
import { DateComponent } from '../../../DateComponent/DateComponent.jsx';
import { Row, Avatar } from 'antd';

export function PostHeader() {
  const { user } = useContext(GlobalContext);
  const { post } = useContext(PostContext);
  const canEdit = user?._id === post?.author?._id;

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
        {canEdit && <EditPostButton />}
      </Row>
      <Row
        align='middle'
        style={{
          width: '100%',
          fontWeight: 'bold',
          fontSize: '18px',
          boxSizing: 'content-box',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
        }}>
        {post?.title}
      </Row>
    </Row>
  )
}