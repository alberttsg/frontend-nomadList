import React, { useContext } from "react";
import "./ProfileUserId.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/UsersState";
import { Avatar, Button, Card, Col, Descriptions, Divider, Row, Spin } from "antd";
import {
  CheckCircleTwoTone,
  CommentOutlined,
  InstagramFilled,
  LinkedinFilled,
  MessageFilled,
  MessageTwoTone,
  SettingFilled,
  StarFilled,
  ThunderboltFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { DateComponent } from "../DateComponent/DateComponent";
import FollowedModalById from "../FollowedModalById/FollowedModalById";
import FollowersModalById from "../FollowersModalByid/FollowersModalById";
import { PostCard } from "../PostComponent/PostCard/PostCard";

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
    const token = JSON.parse(localStorage.getItem("token"));
    const userlocal = JSON.parse(localStorage.getItem("user"));
    if (userlocal._id === userId) {
      navigate("/profile");
    }
    console.log("userLocal", userlocal);
    const fetchData = async () => {
      try {
        const responseUser = await axios.get(
          `https://backend-nomadsociety-development.up.railway.app/users/id/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUser(responseUser.data);

        const res = await axios.get(
          `https://backend-nomadsociety-development.up.railway.app/post/userPosts/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPosts(res.data.posts);
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
    console.log("kndakdhik");
    setVisible(true);
  };
  const handleShowFollowed = async () => {
    console.log("kndakdhik");
    setVisiblers(true);
  };
  function LinkButton({ text, to }) {
    return (
      <Button type='link' size='small' target='_blank' href={to}>
        {text}
      </Button>
    );
  }
  return (
    <>
    <Divider/>
    <Row>

      {console.log(user)}
      <Col xs={2} lg={1}></Col>
      <Col xs={22} lg={6} className='left-avatar'>
        <Avatar size={180} src={user.avatar} />
      </Col>
      <Col xs={22} lg={14} className='right-info'>
        <div className='first-line'>
          <h4>
            {user.username || user?.firstName}{" "}
            <CheckCircleTwoTone
              style={{ fontSize: "12px" }}
              twoToneColor={"#3797F0"}
              />
          </h4>
          {/* <button>siguiendo</button>
              <button>enviar mensaje</button> */}
          <Button
          style={{background: '#769299' }}
            type='primary'
            >
           <StarFilled style={{
       
            color: '#F5D200'}} />
            Seguir
          </Button>
          <Button
          style={{background: '#1777FF' }}
            type='primary'
            >
           <MessageTwoTone  style={{
            color: '#F5D200'}} />
            Enviar mensaje
            
          </Button>
        </div>
        <div className='second-line'>
          <span onClick={handleShowFollowers}>
            {user.followersCount} seguidores
          </span>
          <FollowersModalById visible={visible} onClose={() => setVisible(false)} />

          <span onClick={handleShowFollowed}>
            {user.followedCount} seguidos
          </span>
          <FollowedModalById
            visiblers={visiblers}
            onClosers={() => setVisiblers(false)}
            />
        </div>
        <br />
        <Row>
          <Descriptions title='Info'>
            <Descriptions.Item label={"Bio "}>{user?.bio}</Descriptions.Item>

            <Descriptions.Item label={"Profesion "}>
              {user?.profesion}
            </Descriptions.Item>

            <Descriptions.Item label={"Hobbies "}>
              {user?.hobbie},{user?.hobbie2}
            </Descriptions.Item>
          </Descriptions>
        </Row>
        <Row>
          <Descriptions title='Social networks'>
            <Descriptions.Item
              label={
                <LinkButton
                text={<LinkedinFilled />}
                to={"https://linkedin.com/in/" + user?.linkedin}
                />
              }
              >
              {user?.linkedin}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <LinkButton
                text={<TwitterCircleFilled/>}
                to={"https://twitter.com/" + user?.twitter}
                />
              }
              >
              {user?.twitter}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <LinkButton
                text={<InstagramFilled />}
                to={"https://instagram.com/" + user?.instagram}
                />
              }
              >
              {user?.instagram}
            </Descriptions.Item>
          </Descriptions>
        </Row>
      </Col>
      <Col xs={2} lg={6}></Col>
              </Row>
              <Divider plain/>
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
            posts.map((post, index) => {
              // const likes = post.likes.length;
              return (
                <PostCard post={post} key={index} />
                // <Card
                //   key={post._id}
                //   className='post-container-uni'
                //   hoverable
                //   style={{ width: 250 }}
                //   cover={
                //     <img
                //       alt='example'
                //       src={
                //         "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
                //       }
                //     />
                //   }
                // >
                //   <Meta title={post.title} description={post.content} />
                //   {/* <p>{post.content}</p> */}
                //   {/* <img src={'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'} alt="img" /> */}
                //   <br />
                //   <div className='orginze-buttons'>
                //     <div>
                //       <CommentOutlined
                //         onClick={() => {
                //           return <CommentsPrint postId={post._id} />;
                //         }}
                //       ></CommentOutlined>
                //     </div>
                //     <div>
                //       <DateComponent datePost={post.createdAt} />
                //     </div>
                //   </div>
                //   <br />
                //   <div className='button-container-posts'>
                //     {/* <Button
                //         type='primary'
                //         size='small'
                //         onClick={() => console.log("borra")}
                //       >
                //         Seguir
                //       </Button>
                //       <Button
                //         type='primary'
                //         size='small'
                //         onClick={() => console.log("edit")}
                //       >
                //         Enviar
                //       </Button> */}
                //   </div>
                // </Card>
              );
            })}
        </div>
      </Spin>
    </>
  );
};

export default ProfileUserId;
