import React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import axios from "axios";
import "./UserPosts.scss";
import { Button, Card, message, Modal, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { LikeButton } from "../LikeButton/LikeButton";
import { CommentOutlined, ThunderboltFilled } from "@ant-design/icons";
import CommentsPrint from "../Comments/CommentsPrint";
import { DateComponent } from "../DateComponent/DateComponent";
import EditPostProfile from "../EditPostsProfile/EditPostProfile";
import { PostContext } from "../../context/PostContext/PostState";

const UsersPosts = () => {

  const {getPostById, post, deletePost } = useContext(PostContext);
  const [selectedPost, setSelectedPost] = useState(null);
  const { editUser, user, getUserInfo, deleteUser } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showEditModal = (id) => {
    console.log('soy postId', id)
    setIsModalVisible(true);
  };
  const token = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const getPosts = async (id) => {
    const res = await axios.get(
      `https://backend-nomadsociety-development.up.railway.app/post/userPosts/${id}`,
      config
    );
    setPosts(res.data);
   
    setLoading(false);
  };
  useEffect(() => {
  getPosts(user._id);
    console.log(
      "user posts",
    );
 
  }, []);
  useEffect(() => {
    if(isModalVisible === false){
      const res = getPosts(user._id);
      setPosts(res.data)
    }
  },[isModalVisible])
  
  const handleDeleteUserClick = (id) => {
        
    Modal.confirm({
        title: "¿Estas seguro de borrar tu post?",
        content: " Esta acción no se puede deshacer! No podrás revertirlo!",
        okText: "SI",
        okType: "danger",
        cancelText: "No",
        onOk() {
            console.log('soy id del post', id);
            deletePost(id);
            message.success(' BORRASTE EL POST');
            getPosts(user._id);
        },
        onCancel() {
            message.error('NO BORRASTE EL POST');
            console.log("Cancel");
        },
    });
    }

  return (
    <>
      <Spin size='large' spinning={loading}>
        <div className='publis'>
          <h3>
            {" "}
            <ThunderboltFilled spin={false} style={{ color: "#F0C311" }} />{" "}
            {posts && posts.length} PUBLICACIONES{" "}
          </h3>
        </div>
        <div className='posts-container-profiles'>
          {posts &&
            posts.map((post) => {
              const likes = post.likes.length;
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
                      console.log("editando", post);
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
