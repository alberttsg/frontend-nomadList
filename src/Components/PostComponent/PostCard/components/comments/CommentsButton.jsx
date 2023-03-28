import { useContext } from 'react';
import { PostContext } from '../../PostCard';
import { Badge } from 'antd';
import { CommentOutlined } from "@ant-design/icons";

export function CommentsButton({ handleOpen }) {
  const { post } = useContext(PostContext);
  const comments = post?.commentsCount;

  return (
    <Badge count={comments} overflowCount={99} size='small'>
      <CommentOutlined
        style={{ fontSize: '20px', marginRight: '5px' }}
        onClick={handleOpen}
      />
    </Badge>
  )
}
