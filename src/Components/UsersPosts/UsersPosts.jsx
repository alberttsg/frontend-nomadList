import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import axios from "axios";
import "./UserPosts.scss";
import { Avatar, Button, Card, Divider, Image, message, Modal, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { LikeButton } from "../LikeButton/LikeButton";
import { CommentOutlined, ThunderboltFilled } from "@ant-design/icons";
import CommentsPrint from "../Comments/CommentsPrint";
import { DateComponent } from "../DateComponent/DateComponent";
import EditPostProfile from "../EditPostsProfile/EditPostProfile";
import { PostContext } from "../../context/PostContext/PostState";

const UsersPosts = () => {
  const [posts, setPosts] = useState([]);
  const {getPostById, post, deletePost } = useContext(PostContext);
  const [selectedPost, setSelectedPost] = useState(null);
  const { editUser, user, getUserInfo, deleteUser } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  
  const config = {headers: {Authorization: token}};
  
  const getPosts = async (id) => {
    const res = await axios.get(`https://backend-nomadsociety-development.up.railway.app/post/userPosts/${id}`, config);
      return res.data;
    };
    
    const showEditModal = () => {
      setIsModalVisible(true);
    };
    
    const handleDeleteUserClick = (id) => {
      Modal.confirm({
        title: "¿Estas seguro de borrar tu post?",
        content: " Esta acción no se puede deshacer! No podrás revertirlo!",
        okText: "SI",
        okType: "danger",
        cancelText: "No",

        onOk() {
          deletePost(id);
          message.success(' BORRASTE EL POST');
          getPosts(user._id);
          setPosts(posts.filter(post => post._id!== id));
        },

        onCancel() {
          message.error('NO BORRASTE EL POST');
        },
    })}

    useEffect(() => {
      const id = user._id;
      getPosts(id)
      .then((res) => {
        setPosts(res.posts);
        setLoading(false);
      })
    }, []);

    useEffect( () => {
    if(isModalVisible === false){
      const id = user._id;
      getPosts(id)
      .then((res) => {
        setPosts(res.posts);
        setLoading(false);
      })
    }
  },[isModalVisible])
   
  return (
    <>
      <Spin size='large' spinning={loading}>
        <div className='publis'>
          <h3>
            {" "}
            <ThunderboltFilled spin={false} style={{ color: "#F0C311" }} />{" "}
            {posts && posts.length > 0}{posts.length} PUBLICACIONES{" "}
          </h3>
        </div>
        <Divider/>
        <div className='posts-container-profiles'>

          {posts && posts.length > 0 && posts.map((post) => {
            console.log(post.author.firstName)
              const likes = post.likes.length;
              return (
                <Card
                  key={post._id}
                  className='post-container-uni'
                  hoverable
                  style={
                    {
                      height:600,
                      width:750, 
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center", 
                    }}
                  cover={
                    <Image
                    style={{
                      borderRadius: "1%",
                      width: 750,
                      height: 400,
                      objectFit: "cover",
                    }}
                  src={post.image || 'https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg'}
                    alt='example2'
                    // src={'https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg'}
                  />
                  }
                  >
                    <p><Avatar size={15} src={post.author.avatar} alt="" />{' '}{' '}{post.author.displayName}</p>
            
                  
                  
                  <Meta title={post.title} description={post.content}  />
                  <br />
                  <div className="orginze-buttons">
                    <div>
                      <LikeButton id={post._id} likes={likes} />{" "}
                      <CommentOutlined postid={post._id}
                        onClick={() => {
                          return <CommentsPrint postid={post._id} />;
                        }}
                      ></CommentOutlined>
                    </div>
                    <div>
                      <DateComponent datePost={post.createdAt} />
                    </div>
                  </div>
                  <br />
                  <div className='button-container-posts'>
                    <Button
                      type='primary'
                      size='small'
                      onClick={() => handleDeleteUserClick(post._id)}
                    >
                      Delete
                    </Button>
                    <Button  size='small' type='primary' onClick={() => {
                      setSelectedPost(post);
                      showEditModal(post._id);
                    } }>Editar</Button>
                    
                  </div>
                </Card>
              );
            })}
            <EditPostProfile  selectedPost={selectedPost} visible={isModalVisible} setVisible={setIsModalVisible}/>
              </div>
              </Spin>
    </>
  );
};

export default UsersPosts;
