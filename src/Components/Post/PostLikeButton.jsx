import { Badge } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib/icons';

export function PostLikeButton(props) {
  const { post } = props;

  return (
    <Badge count={post?.likesCount} overflowCount={99}>
      <HeartOutlined onClick={likeHandler} />
    </Badge>
  )
}