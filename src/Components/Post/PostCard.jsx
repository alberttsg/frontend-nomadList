import { PostLikeButton } from './PostLikeButton.jsx'
import CommentsPrint from './buttons/CommentsPrint.jsx';
import { DateComponent } from '../DateComponent/DateComponent.jsx';
import { Card, Carousel } from 'antd';

export function PostCard(props) {
  const { post, forwardedRef } = props;

  return (
    <Card hoverable className="post-content" title={<h3>{post?.title}</h3>}>
      {post?.author?.displayName}
      <div ref={forwardedRef} style={{ width: '100%' }}>
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
        {/* <PostLikeButton id={post?._id} likes={post?.likesCount} /> */}
        <CommentsPrint postId={post?._id} />
        <DateComponent datePost={post?.createdAt} />
      </div>
    </Card>
  )
}