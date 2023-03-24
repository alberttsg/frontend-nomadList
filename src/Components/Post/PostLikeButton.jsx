import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserState';
import { Badge } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib/icons';
import { toggleLike } from '../../service/postService';

export function PostLikeButton(props) {
  const { id, likes } = props;
  const { user, getUserInfo } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(false);

  // useEffect(() => {
  //   async function getData() {
  //     await getUserInfo(false, false, true);
  //     const liked = user.likedPosts.includes(id);
  //     setIsLiked(liked);
  //   };
  //   getData();
  // }, [user])

  // const likeToggle = async () => {
  //   await toggleLike(id);
  // }
  return null;
  // return (
  //   <Badge count={likes} overflowCount={99}>
  //     {isLiked ? <HeartFilled onClick={likeToggle} /> : <HeartOutlined onClick={likeToggle} />}
  //   </Badge>
  // )
}