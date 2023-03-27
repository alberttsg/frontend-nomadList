import React, { useContext } from "react";
import { GlobalContext } from "../../../../context/UsersState";
import { ProfileContext } from "../../Profile";
import { EditUser } from "../EditUser/EditUser";
import { FollowersModal } from "../FollowersModal/FollowersModal";
import { FollowedModal } from "../FollowedModal/FollowedModal";
import { FollowButton } from "../FollowButton/FollowButton";
import { Avatar, Button, Col, Descriptions, Divider, Row } from "antd";
import { CheckCircleTwoTone, InstagramFilled, LinkedinFilled, TwitterCircleFilled } from "@ant-design/icons";
import "./UserCard.scss";

export const UserCard = () => {
  const { user } = useContext(GlobalContext);
  const { userData } = useContext(ProfileContext);
  const canEdit = user?._id === userData?._id;

  return (
    <>
      <Divider plain />
      <Row>
        <Col xs={0} lg={1}></Col>
        <Col xs={24} lg={6} className='left-avatar'>
          <Avatar size={180} src={userData?.avatar} />
        </Col>
        <Col xs={22} lg={14} className='right-info'>
          <Row justify='space-between'>
            <h4>
              {userData?.username || userData?.firstName}{" "}
              <CheckCircleTwoTone
                style={{ fontSize: "12px" }}
                twoToneColor={"#3797F0"}
              />
            </h4>
            {/* <button>Enviar mensaje Añadir contacto</button> */}
            {!canEdit && <FollowButton />}
            {canEdit && <EditUser />}
          </Row>

          <Row>
            <div className='second-line'>
              <FollowersModal />
              <FollowedModal />
            </div>
          </Row>

          <Row>
            <Descriptions title='Info'>
              <Descriptions.Item label={"Bio "}>
                {userData?.bio}
              </Descriptions.Item>
              <Descriptions.Item label={"Profession "}>
                {userData?.profesion}
              </Descriptions.Item>
              <Descriptions.Item label={"Hobbies "}>
                {userData?.hobbie},{userData?.hobbie2}
              </Descriptions.Item>
            </Descriptions>
          </Row>

          <Row>
            <Descriptions title='Social networks'>
              <Descriptions.Item label={<LinkButton logo='linkedin' to={userData?.linkedin}/>}>
                {userData?.linkedin}
              </Descriptions.Item>
              <Descriptions.Item label={<LinkButton logo='twitter' to={userData?.twitter}/>}>
                {userData?.twitter}
              </Descriptions.Item>
              <Descriptions.Item label={<LinkButton logo='instagram' to={userData?.instagram}/>}>
                {userData?.instagram}
              </Descriptions.Item>
            </Descriptions>
          </Row>
        </Col>
        <Col xs={2} lg={2}></Col>
      </Row>

    </>
  );
};

function LinkButton({ logo, to }) {
  const logos = {
    twitter: <TwitterCircleFilled />,
    linkedin: <LinkedinFilled />,
    instagram: <InstagramFilled />,
  };
  const urls = {
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/',
    instagram: 'https://instagram.com/',
  };
  return (
    <Button type='link' size='small' target='_blank' href={urls[logo] + to}>
      {logos[logo]}
    </Button>
  );
}