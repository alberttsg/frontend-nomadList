import { useContext } from 'react';
import { PostContext } from '../PostCard.jsx';
import defaultImage from '../../../../resources/default-placeholder.png';
import { Carousel, Image } from 'antd';

export function PostImage() {
  const { post } = useContext(PostContext);

  return (
    <Carousel>
      {post?.imagePost?.map(img =>
        <Image className='post-img' 
        width={'100%'}
        height={'100%'}
        key={img} 
        src={img} 
       
        alt="Resource not found" 
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = [defaultImage];
        }} />
      )}
    </Carousel>
  )
}