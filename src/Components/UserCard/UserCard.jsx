import {
  CheckCircleTwoTone,
  InstagramFilled,
  LinkedinFilled,
  TwitterCircleFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Avatar, Button, Col, Descriptions, Divider, Row } from "antd";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import EditUser from "../../Components/EditUser/EditUser";
import "./UserCard.scss";
import FollowersModal from "../FollowersModal/FollowersModal";
import FollowedModal from "../FollowedModal/FollowedModal";

const UserCard = () => {
  const [visible, setVisible] = useState(false);
  const [visiblers, setVisiblers] = useState(false);

  const { getUserInfo, user } = useContext(GlobalContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showEditModal = () => {
    getUserInfo();
    setIsModalVisible(true);
  };
  const handleShowFollowers = async () => {
    console.log("kndakdhik");
    setVisible(true);
  };
  const handleShowFollowed = async () => {
    console.log("juujujujujujuujuu");
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
    <Divider plain/>
    <Row>
      <Col xs={0} lg={1}></Col>
      <Col xs={24} lg={6} className='left-avatar'>
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
            type='primary'
            onClick={() => {
              showEditModal();
              console.log("editando");
            }}
            >
            <SettingFilled />
            Editar Perfil
          </Button>
        </div>
        <div className='second-line'>
          <span onClick={handleShowFollowers}>
            {user.followersCount} seguidores
          </span>
          <FollowersModal visible={visible} onClose={() => setVisible(false)} />

          <span onClick={handleShowFollowed}>
            {user.followedCount} seguidos
          </span>
          <FollowedModal
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
                text={<TwitterCircleFilled />}
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
      <Col xs={2} lg={2}></Col>
      <EditUser visible={isModalVisible} setVisible={setIsModalVisible} />
      </Row>

 </>
  );
};

export default UserCard;
