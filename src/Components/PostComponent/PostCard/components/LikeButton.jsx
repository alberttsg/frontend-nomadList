import { useContext, useState } from 'react';
import { PostContext } from '../PostCard';
import { GlobalContext } from '../../../../context/UsersState';
import { Badge } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib/icons';
import { toggleLike } from '../../../../service/postService';

export function LikeButton() {
  const { post } = useContext(PostContext);
  const { user, getUserInfo } = useContext(GlobalContext);
  const [likes, setLikes] = useState(post?.likesCount);
  const [isLiked, setIsLiked] = useState(user?.likedPosts?.includes(post?._id));

  const likeToggle = async () => {
    setIsLiked(!isLiked);
    setLikes(await toggleLike(post?._id));
    await getUserInfo();
  }

  return (
    <Badge count={likes} overflowCount={99} size='small'>
      {isLiked ?
        <HeartFilled
          onClick={() => likeToggle()}
          style={{ fontSize: '20px', color: "#eb2f96", marginRight: '5px' }}
        />
        :
        <HeartOutlined
          onClick={() => likeToggle()}
          style={{ fontSize: '20px', marginRight: '5px' }}
        />}
    </Badge>
  )
}
