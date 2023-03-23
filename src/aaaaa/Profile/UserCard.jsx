import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserState';
import { UserCardDescriptions } from './UserCardDescriptions';
import { Avatar, Button, Row, Col } from 'antd';
import { EditOutlined, SettingFilled } from '@ant-design/icons';

export function UserCard(props) {
  const { user } = props;
  const { user: localUser } = useContext(UserContext);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setCanEdit(user?._id == localUser?._id);
  }, [user, localUser])


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
        style={{ padding: '10px' }}
      >
        <UserCardDescriptions user={user} canEdit={canEdit} />
      </Col>
    </Row>
  );
};
