import {
  DeleteTwoTone,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  PlusCircleTwoTone,
  ThunderboltFilled,
} from "@ant-design/icons";
import { Card, Avatar, Modal, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../../context/UsersState";
import EditUser from "../EditUser/EditUser";
import "./Profile.scss";

export const Profile = () => {
  const { getUserInfo, user, deleteUser, logOut, reset } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const showEditModal = () => {
    getUserInfo();

    setIsModalVisible(true);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    getUserInfo();
  }, []);
  const handleDeleteUserClick = (id) => {
    Modal.confirm({
       title: "¿Estas seguro de borrar tu cuenta?",
       content: " Esta acción no se puede deshacer! No podrás revertirlo!",
       okText: "SI",
       okType: "danger",
       cancelText: "No",
       onOk() {
         deleteUser(id);
        logOut();
        navigate('/');
        reset();
        message.success('CIAO, BORRASTE LA CUENTA');
       },
       onCancel() {
        message.error('NO BORRASTE LA CUENTA');
         console.log("Cancel");
       },
      });
    
  };
  return (
    <div className='profile-container'>
      <Card 
        title={
          <span className="title-edit-user">
            <span>
            {user.displayName}
            </span>
            <span style={{margin: "5px"}}>

            <EditOutlined style={{ fontSize: '24px', margin: "5px"}} onClick={() => {
              showEditModal();
              console.log("editando");
            }} />
            <DeleteTwoTone style={{ fontSize: '22px', margin: "5px"}}  twoToneColor={"#DC675B" } onClick={()=>handleDeleteUserClick(user._id)}/>    
            </span>
            
          </span>
        }
        className='card-title'
      >
        <div className='card-container'>
          <Avatar
            size={138}
            src={user.avatar || 'https://img.freepik.com/vector-premium/lindo-retrato-hombres-pelo-largo-rubio-avatar-aislado-fondo-blanco_555467-2696.jpg?w=2000'}
          />
          <div className='card-container-info'>
            <p>
              <b>Correo electrónico:</b> {user.email}
            </p>
            <p>
              <b>Nacionalidad:</b> {user.nationality}
            </p>
            <p>
              <b>Genero:</b> {user.gender}
            </p>
            <p>
              <b>Usuario desde: </b> {user.createdAt}
            </p>
            <p>
              <b>Seguidores: </b> {user.followersCount}
            </p>
            <p>
              <b>Siguiendo: </b> {user.followedCount}
            </p>
          </div>
          
        </div>
      </Card>
      <Card
        className='follows-container card-title'
        title={
          <span>
            {" "}
            <HeartOutlined style={{ color: "red"}} /> SIGUIENDO A {"  "} 
            {user.followedCount} PERSONAS
          </span>
        }
        style={{margin: "15px"}}
      >
  <span>
      {user.followed && user.followed.length > 0 ? (
        <>
          <span
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
              gap: "10px",
              overflow: "hidden",
            }}
          >
            {user.followed.slice(0, 11).map((followedOne, index) => (
              <span className="followers-list" key={index + followedOne._id}>
                <p>
                  <Avatar
                    size={75}
                    src={
                      followedOne.avatar ||
                      "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
                    }
                  />
                </p>
              </span>
            ))}
            {user.followed.length > 11 && (
              <span
                className="followers-list"
                onClick={handleModal}
                style={{ cursor: "pointer" }}
              >
                <p style={{ position: "relative" }}><PlusCircleTwoTone twoToneColor={"#FA91CF" } style={{  fontSize: "35px", transform: "scale(2)", position: "absolute",
          left: "24px",
          bottom: "21px"}} /></p>
              </span>
            )}
          </span>
          <Modal open={showModal} onCancel={() => setShowModal(false)} onOk={()=>setShowModal(false)}>
            <span
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
                gap: "10px",
                overflow: "hidden",
              }}
            >
              {user.followed.map((followedOne, index) => (
                <span className="followers-list" key={index + followedOne._id}>
                  <p>
                    <Avatar
                      size={75}
                      src={
                        followedOne.avatar ||
                        "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
                      }
                    />
                  
                  </p>
                </span>
              ))}
            </span>
          </Modal>
        </>
      ) : (
        <span>Aún no estás siguiendo a nadie.</span>
      )}
    </span>
  
      </Card>
      <Card
        className='followed-container card-title'
        title={
          <span>
            {" "}
            <HeartFilled style={{ color: "red" }} /> TE SIGUEN{" "}
            {user.followersCount} PERSONAS
          </span>
        }
      >
        <span>
      {user.followers && user.followers.length > 0 ? (
        <>
          <span
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
              gap: "10px",
              overflow: "hidden",
            }}
          >
            {user.followers.slice(0, 11).map((followersOne, index) => (
              <span className="followers-list" key={index + followersOne._id}>
                <p>
                  <Avatar
                    size={75}
                    src={
                      followersOne.avatar ||
                      "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
                    }
                  />
                </p>
              </span>
            ))}
            {user.followers.length > 11 && (
              <span
                className="followers-list"
                onClick={handleModal}
                style={{ cursor: "pointer" }}
              >
                <p style={{ position: "relative" }}><PlusCircleTwoTone twoToneColor={"#FA91CF" } style={{  fontSize: "35px", transform: "scale(2)", position: "absolute",
          left: "24px",
          bottom: "21px"}} /></p>
              </span>
            )}
          </span>
          <Modal open={showModal} onCancel={() => setShowModal(false)} onOk={()=>setShowModal(false)}>
            <span
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
                gap: "10px",
                overflow: "hidden",
              }}
            >
              {user.followers.map((followersOne, index) => (
                <span className="followers-list" key={index + followersOne._id}>
                  <p>
                    <Avatar
                      size={75}
                      src={
                        followersOne.avatar ||
                        "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
                      }
                    />
                  </p>
                </span>
              ))}
            </span>
          </Modal>
        </>
      ) : (
        <span>Aún no te está siguiendo  nadie.</span>
      )}
    </span>
  
      </Card>
      <Card style={{margin: "15px"}}
        className='posts-container card-title'
        title={
          <span>
            {" "}
            <ThunderboltFilled
              style={{ color: "#Eee05f", borderBlockColor: "black" }}
            />{" "}
            POSTS
          </span>
        }
      ></Card>
    <EditUser visible={isModalVisible} setVisible={setIsModalVisible}/>
    </div>
  );
};
