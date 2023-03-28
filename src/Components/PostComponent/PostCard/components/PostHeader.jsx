import { useContext } from 'react';
import { GlobalContext } from '../../../../context/UsersState.jsx';
import { PostContext } from '../PostCard.jsx';
import { EditPostButton } from './EditPostButton.jsx';
import { DateComponent } from '../../../DateComponent/DateComponent.jsx';
import { Row, Avatar, Button } from 'antd';
import { useNavigate } from 'react-router';

export function PostHeader() {
  const { user } = useContext(GlobalContext);
  const { post } = useContext(PostContext);
  const canEdit = user?._id === post?.author?._id;
  const navigate = useNavigate();

  return (
    <Row justify='start'>
      <Row
        style={{
          display: 'flex',
          justifyContent:'left',
          alignItems: 'center',
          width: '100%',
          margin: '10px 0 5px 0',
          fontSize: '12px',
        }}>
        <Avatar span style={{
          boxShadow:'initial',
          border: '0.2px solid lightgray',
        }}size={29} src={post?.author?.avatar} />
        <Button size='small' type='secondary' style={{
          textTransform: 'capitalize',
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#598aa8',
          display: 'flex',
          alignItems: 'center',
          justifyContent:'start',
          padding:'0 9px 2px 5px ',
          
          
       
       
        }} onClick={
          ()=>{
            navigate(`/profile/${post?.author?._id}`);
          }
        }><span>{post?.author?.displayName}</span></Button>
        <DateComponent datePost={post?.createdAt}  />
        {canEdit && <EditPostButton  />}
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
          margin: '1px 0 10px 0',
        }}>
        {post?.title}
      </Row>
    </Row>
  )
}