
import React, { useContext } from 'react';
import './ProfileUserId.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/UsersState';
import { Avatar, Button, Card, Spin } from 'antd';
import { CheckCircleTwoTone, CommentOutlined, ThunderboltFilled } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { LikeButton } from '../LikeButton/LikeButton';
import { DateComponent } from '../DateComponent/DateComponent';
import FollowersModal from '../FollowersModal/FollowersModal';
import FollowedModal from '../FollowedModal/FollowedModal';
import FollowedModalById from '../FollowedModalById/FollowedModalById';
import FollowersModalById from '../FollowersModalByid/FollowersModalById';

const ProfileUserId = () => {
  const [visible, setVisible] = useState(false);
  const [visiblers, setVisiblers] = useState(false);

  

    const [loading, setLoading] = useState(true);
//   const { editUser, user, getUserInfo, deleteUser } = useContext(GlobalContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();
const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userlocal = JSON.parse(localStorage.getItem('user'));
    if(userlocal._id === userId){
    navigate('/profile');
    }
    console.log('userLocal', userlocal);
    const fetchData = async () => {
      try {
        const responseUser = await axios.get(`https://backend-nomadsociety-development.up.railway.app/users/id/${userId}`, {
            headers: {
              Authorization: token
            }
          });
        setUser(responseUser.data);

        const res = await axios.get(
            `https://backend-nomadsociety-development.up.railway.app/post/userPosts/${userId}`,
            {
              headers: {
                Authorization: token
              }
            }
          );
          setPosts(res.data);
          setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);
  if (!user) {
      return <div>Loading...</div>;
  }
  const handleShowFollowers = async () => {
    console.log('kndakdhik')
      setVisible(true);
    
  };
  const handleShowFollowed = async () => {
    console.log('kndakdhik')
      setVisiblers(true);
    
  };
    return (
        <>
        <br />
        <br />
        <div className='card-info-container'>
        {console.log(user)}
         <div className='left-avatar'><Avatar size={158}
            src={user.avatar[0]}/>
            </div>
           <div className='right-info'>

            <div className='first-line'>
              <span>{user.username || user.firstName}{' '}<CheckCircleTwoTone  style={{fontSize: '12px'}} twoToneColor={'#3797F0'} /></span>
              <Button style={{backgroundColor: '#3797F0'}} type='primary '>Siguiendo</Button>
              <Button style={{backgroundColor: '#3797F0'}} type='primary '>Enviar mensaje</Button>
              {/* <Button type='primary' onClick={() => {
              showEditModal();
              console.log("editando");
            } }><SettingFilled />Editar Perfil</Button> */}

            </div>
            <div className='second-line'>
              <span onClick={handleShowFollowers}>{user.followedCount}{' '}seguidores</span>
              <FollowersModalById visible={visible} onClose={() => setVisible(false)}/>

              <span onClick={handleShowFollowed}>{user.followedCount}{' '}seguidos</span>
              <FollowedModalById  visiblers={visiblers} onClosers={() => setVisiblers(false)}/>

            </div>
            <br />
            <div className='third-line'>
              <div ><b>Bio: </b> {user.bio}</div>
             
              <div> <b>Profesión:</b> {' ' +  user.profesion }</div>
             
              <div><b>Hobbie:</b> { ' ' + user.hobbie}</div>
           
            </div> 

           </div>
         
       </div>
        <Spin size='large' spinning={loading}>
          <div className='publis'>
            <h3>
              {" "}
              <ThunderboltFilled spin={false} style={{ color: "#F0C311" }} />{" "}
              {posts && posts.length} PUBLICACIONES{" "}
            </h3>
          </div>
          <div className='posts-container-profiles'>
            {console.log(posts)}
            {posts &&
              posts.map((post) => {
                // const likes = post.likes.length;
                return (
                  <Card
                    key={post._id}
                    className='post-container-uni'
                    hoverable
                    style={{ width: 250 }}
                    cover={
                      <img
                        alt='example'
                        src={
                          "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
                        }
                      />
                    }
                  >
                    <Meta title={post.title} description={post.content} />
                    {/* <p>{post.content}</p> */}
                    {/* <img src={'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'} alt="img" /> */}
                    <br />
                    <div className="orginze-buttons">
                      <div>
                        {/* <LikeButton id={post._id} likes={likes} />{" "} */}
                        <CommentOutlined
                          onClick={() => {
                            return <CommentsPrint postId={post._id} />;
                          }}
                        ></CommentOutlined>
                      </div>
                      <div>
                        <DateComponent datePost={post.createdAt} />
                      </div>
                    </div>
                    <br />
                    <div className='button-container-posts'>
                      {/* <Button
                        type='primary'
                        size='small'
                        onClick={() => console.log("borra")}
                      >
                        Seguir
                      </Button>
                      <Button
                        type='primary'
                        size='small'
                        onClick={() => console.log("edit")}
                      >
                        Enviar
                      </Button> */}
                    </div>
                  </Card>
                );
              })}
          </div>
        </Spin>
      </>

    );
};

export default ProfileUserId;