import { useContext } from 'react';
import { PostContext } from '../PostCard.jsx';
import defaultImage from '../../../../resources/default-placeholder.png';
import { Carousel } from 'antd';

export function PostImage() {
  const { post } = useContext(PostContext);

  return (
    <Carousel>
      {post?.imagePost?.map(img =>
        <img className='post-img' 
        
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