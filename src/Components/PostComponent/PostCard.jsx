import { LikeButton } from '../LikeButton/LikeButton.jsx'
import CommentsPrint from '../Comments/CommentsPrint.jsx';
import { DateComponent } from '../DateComponent/DateComponent.jsx';
import { Card, Carousel } from 'antd';

export function PostCard(props) {
  const { post, forwardedRef } = props;

  return (
    <Card hoverable className="post-content">
      <div ref={forwardedRef} style={{ width: '100%' }}>
        <h3>{post?.title}</h3>
        {post?.author?.displayName}
        <Carousel>
          {post?.imagePost?.map(img =>
            <img className='post-img' key={img} src={img} alt="Resource not found" />
          )}
        </Carousel>
        <div style={{ border: '1px solid lightgrey', borderRadius: '5px', padding: '5px' }}>
          {post?.content}
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <LikeButton id={post?._id} likes={post?.likesCount} />
        <CommentsPrint postId={post?._id} />
        <DateComponent datePost={post?.createdAt} />
      </div>
    </Card>
  )
}