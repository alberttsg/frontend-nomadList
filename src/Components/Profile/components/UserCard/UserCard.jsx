import React, { useContext } from "react";
import { GlobalContext } from "../../../../context/UsersState";
import { ProfileContext } from "../../Profile";
import { EditUser } from "../EditUser/EditUser";
import { FollowersModal } from "../FollowersModal/FollowersModal";
import { FollowedModal } from "../FollowedModal/FollowedModal";
import { FollowButton } from "../FollowButton/FollowButton";
import { AddContactButton } from "../AddContact/AddContactButton";
import { Avatar, Button, Col, Descriptions, Row } from "antd";
import { CheckCircleFilled, InstagramFilled, LinkedinFilled, TwitterCircleFilled } from "@ant-design/icons";
import "./UserCard.scss";

export const UserCard = () => {
  const { user } = useContext(GlobalContext);
  const { userData } = useContext(ProfileContext);
  const canEdit = user?._id === userData?._id;

  return (
    <div style={{ padding: '10px' }} >
      <Row>
        <Col xs={0} lg={1}></Col>
        <Col xs={24} lg={6} className='left-avatar'>
          <Avatar style={{ border: '1px solid black' }} size={180} src={userData?.avatar} />
        </Col>
        <Col xs={22} lg={14} className='right-info'>
          <Row justify='space-between'>
            {<h4>
              {userData?.username}{" "}
              <CheckCircleFilled
                style={{ fontSize: "14px", color: '#3797F0', margin: '5px' }}
              />
            </h4>}
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'center',
              gap: '10px'
            }}>
              {!canEdit && <AddContactButton />}
              {!canEdit && <FollowButton />}
              {canEdit && <EditUser />}
            </div>
          </Row>

          <Row>
            <div className='second-line'>
              <FollowersModal />
              <FollowedModal />
            </div>
          </Row>

          <Row>
            <Descriptions title={'Info'}>
              <Descriptions.Item label={"Bio "}>
                {userData?.bio}
              </Descriptions.Item>
              <Descriptions.Item label={"Profession "}>
                {userData?.profession}
              </Descriptions.Item>
              <Descriptions.Item label={"Hobbies "}>
                {userData?.hobby},{userData?.hobby2}
              </Descriptions.Item>
            </Descriptions>
          </Row>

          <Row >
            <Descriptions className="social-networks" title='Social networks'>
              <div>
                <LinkButton logo='linkedin' to={userData?.linkedin} />


                <LinkButton logo='twitter' to={userData?.twitter} />

                <LinkButton logo='instagram' to={userData?.instagram} />
              </div>
              <span></span>

            </Descriptions>
          </Row>
        </Col>
        <Col xs={2} lg={2}></Col>
      </Row>

    </div>
  );
};

function LinkButton({ logo, to }) {
  const logos = {
    twitter: <TwitterCircleFilled style={{ fontSize: '20px', color: '#1D9BF0' }} />,
    linkedin: <LinkedinFilled style={{ fontSize: '20px', color: '#0B66C2' }} />,
    instagram: <InstagramFilled style={{ fontSize: '20px', color: '#FF5420' }} />,
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