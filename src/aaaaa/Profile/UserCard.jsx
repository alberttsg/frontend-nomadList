import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserState';
import { Avatar, Button, Descriptions, Row, Col, Collapse } from 'antd';
import { EditOutlined, SettingFilled } from '@ant-design/icons';

export function UserCard(props) {
  const { user } = props;
  const { user: localUser } = useContext(UserContext);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setCanEdit(user?._id == localUser?._id);
  }, [user, localUser])

  const calculateAge = (date) => {
    if (!date) return null;
    const birthdate = new Date(date);
    const diff = new Date(Date.now() - birthdate);
    return Math.abs(diff.getUTCFullYear() - 1970);
  };

  return (
    <Row>
      <Col
        xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column nowrap',
          padding: '20px',
          gap: '5px',
        }}>
        <Avatar size={158} src={user?.avatar} />
        <h3>User {user?.username}</h3>
        {canEdit && <Button type='primary' onClick={() => console.log('hola')}><EditOutlined />Change avatar</Button>}
        {canEdit && <Button type='primary' onClick={() => console.log('hola')}><SettingFilled />Settings</Button>}
      </Col>
      <Col
        xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 16 }}
        style={{
          padding: '10px'
        }}
      >
        <Row>
          <Collapse>
            <Collapse.Panel>
              <Descriptions title='User information' extra={
                <>
                  {canEdit && <Button type='primary' onClick={() => console.log('hola')}><EditOutlined />Edit profile</Button>}
                </>
              }>
                <Descriptions.Item label='Name'>{user?.displayName}</Descriptions.Item>
                <Descriptions.Item label='Gender'>{user?.gender}</Descriptions.Item>
                <Descriptions.Item label='Age'>{calculateAge(user?.birthdate)}</Descriptions.Item>
                <Descriptions.Item label='City'>{user?.city}</Descriptions.Item>
                <Descriptions.Item label='Nationality'>{user?.nationality}</Descriptions.Item>
              </Descriptions>
            </Collapse.Panel>
          </Collapse>
        </Row>
        <Row>
          <Descriptions title='About me'>
            <Descriptions.Item label='Bio'>{user?.bio}</Descriptions.Item>
            <Descriptions.Item label='Profession'>{user?.profesion}</Descriptions.Item>
            <Descriptions.Item label='Hobbie'>{user?.hobbie}</Descriptions.Item>
          </Descriptions>
        </Row>
        <Row>
          <Descriptions title='Social networks'>
            <Descriptions.Item label={<LinkButton text='Website' to={user?.website} />}>{user?.website}</Descriptions.Item>
            <Descriptions.Item label={<LinkButton text='Facebook' to={user?.facebook} />}>{user?.facebook}</Descriptions.Item>
            <Descriptions.Item label={<LinkButton text='Twitter' to={user?.twitter} />}>{user?.twitter}</Descriptions.Item>
          </Descriptions>
        </Row>
        <Row>
          <Descriptions title='Activity'>
            <Descriptions.Item label={<ModalButton text='Followers' />}>{user?.followersCount}</Descriptions.Item>
            <Descriptions.Item label={<ModalButton text='Followed' />}>{user?.followedCount}</Descriptions.Item>
            <Descriptions.Item label={<ModalButton text='Liked posts' />}>{user?.likedPostsCount}</Descriptions.Item>
          </Descriptions>
        </Row>
      </Col>
    </Row>
  );
};

function LinkButton({ text, to }) {
  return (
    <Button
      type='link'
      size='small'
      target='_blank'
      href={to}
    >
      {text}
    </Button>
  )
}

function ModalButton({ text, handleClick }) {
  return (
    <Button
      type='text'
      size='small'
      onClick={handleClick}
    >
      {text}
    </Button>
  )
}



/*
<div className='card-info-container'>
  <div className='left-avatar'><Avatar size={158}
    src={user.avatar} />
  </div>
  <div className='right-info'>

    <div className='first-line'>
      <span>{user.username}{' '}<CheckCircleTwoTone style={{ fontSize: '12px' }} twoToneColor={'#3797F0'} /></span>
      {<button>siguiendo</button>
              <button>enviar mensaje</button>

      <Button type='primary' onClick={() => {
        showEditModal();
        console.log("editando");
      }}><SettingFilled />Editar Perfil</Button>

    </div>
    <div className='second-line'>

      <span onClick={handleShowFollowers}>{user.followersCount}{' '}seguidores</span>
      <FollowersModal visible={visible} onClose={() => setVisible(false)} />

      <span onClick={handleShowFollowed}>{user.followedCount}{' '}seguidos</span>
      <FollowedModal visiblers={visiblers} onClosers={() => setVisiblers(false)} />

    </div>
    <br />
    <div className='third-line'>
      <div ><b>Bio: </b> {user.bio}</div>

      <div> <b>Profesión:</b> {' ' + user.profesion}</div>

      <div><b>Hobbie:</b> {' ' + user.hobbie}</div>

    </div>

  </div>
  <EditUser visible={isModalVisible} setVisible={setIsModalVisible} />
</div>*/