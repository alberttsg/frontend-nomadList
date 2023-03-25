import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserState';
import { Badge } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib/icons';
import { toggleLike } from '../../service/postService';

export function PostLikeButton(props) {
  const { id, likesCount } = props;
  const { user, getUserInfo } = useContext(UserContext);
  const [likes, setLikes] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(user?.likedPosts?.includes(id))
  }, [])

  const likeToggle = async () => {
    setIsLiked(!isLiked);
    setLikes(await toggleLike(id));
    await getUserInfo(false, false, false);
  }

  return (
    <Badge count={likes} overflowCount={99} size='small'>
      {isLiked ?
        <HeartFilled
          onClick={() => likeToggle()}
          style={{ fontSize: '20px', color: "#eb2f96" }}
        />
        :
        <HeartOutlined
          onClick={() => likeToggle()}
          style={{ fontSize: '20px' }}
        />}
    </Badge>
  )
}