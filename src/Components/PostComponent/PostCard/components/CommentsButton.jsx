import { useContext, useState } from 'react';
import { PostContext } from '../PostCard';
import { GlobalContext } from '../../../../context/UsersState';
import { Badge } from 'antd';
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

export function CommentsButton() {
  const { post } = useContext(PostContext);
  const { user, getUserInfo } = useContext(GlobalContext);
  const [comments, setComments] = useState(post?.commentsCount);

  const likeToggle = async () => {
    setIsLiked(!isLiked);
    setLikes(await toggleLike(post?._id));
    await getUserInfo();
  }

  return (
    <Badge count={comments} overflowCount={99} size='small'>
      <CommentOutlined
        style={{ fontSize: '20px', marginRight: '5px' }}
      />
    </Badge>
  )
}
