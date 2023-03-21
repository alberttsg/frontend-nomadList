import { Card } from 'antd';
import './Post.scss'

function Post(props){
  const { userName, profilePhoto, postTitle, postContent, imgContent, createdAt } = props;


  return(
    <Card size='large' style={{ width: 800, backgroundColor: '#f0f0f0'}}>
      <div className='containerPost'>
        <div className='userInfo'>
          <img src={ profilePhoto } className='imgProfile'/>
          <div className='userName'>{ userName }</div>
        </div>
        <div>
          { createdAt }
        </div>
        <div className='title'>
          {postTitle}
        </div>
        <div>
          { postContent }
        </div>
      </div>
    </Card>
  )
}

export default Post;