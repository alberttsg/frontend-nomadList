import { Row, Descriptions, Button, Input } from "antd";
import { EditOutlined } from '@ant-design/icons';

export function UserCardDescriptions(props) {
  const { user, canEdit } = props;

  const calculateAge = (date) => {
    if (!date) return null;
    const birthdate = new Date(date);
    const diff = new Date(Date.now() - birthdate);
    return Math.abs(diff.getUTCFullYear() - 1970);
  };

  return (
    <>
      <Row>
        <Descriptions title='User information' extra={
          <>
            {canEdit && <Button type='primary' onClick={() => console.log('hola')}><EditOutlined />Edit profile</Button>}
          </>
        }>
          <Descriptions.Item label='Name'>
            {user?.displayName}
          </Descriptions.Item>
          <Descriptions.Item label='Gender'>
            {user?.gender}
          </Descriptions.Item>
          <Descriptions.Item label='Age'>
            {calculateAge(user?.birthdate)}
          </Descriptions.Item>
          <Descriptions.Item label='City'>
            {user?.city}
          </Descriptions.Item>
          <Descriptions.Item label='Nationality'>
            {user?.nationality}
          </Descriptions.Item>
        </Descriptions>
      </Row>
      <Row>
        <Descriptions title='About me'>
          <Descriptions.Item label='Bio'>
            {user?.bio}
          </Descriptions.Item>
          <Descriptions.Item label='Profession'>
            {user?.profesion}
          </Descriptions.Item>
          <Descriptions.Item label='Hobbie'>
            {user?.hobbie}
          </Descriptions.Item>
        </Descriptions>
      </Row>
      <Row>
        <Descriptions title='Social networks'>
          <Descriptions.Item label={<LinkButton text='Website' to={user?.website} />}>
            {user?.website}
          </Descriptions.Item>
          <Descriptions.Item label={<LinkButton text='Facebook' to={user?.facebook} />}>
            {user?.facebook}
          </Descriptions.Item>
          <Descriptions.Item label={<LinkButton text='Twitter' to={user?.twitter} />}>
            {user?.twitter}
          </Descriptions.Item>
        </Descriptions>
      </Row>
      <Row>
        <Descriptions title='Activity'>
          <Descriptions.Item label={<ModalButton text='Followers' />}>
            {user?.followersCount}
          </Descriptions.Item>
          <Descriptions.Item label={<ModalButton text='Followed' />}>
            {user?.followedCount}
          </Descriptions.Item>
          <Descriptions.Item label={<ModalButton text='Liked posts' />}>
            {user?.likedPostsCount}
          </Descriptions.Item>
        </Descriptions>
      </Row>
    </>
  )
}

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

function EditInput(props) {
  const { item } = props;

  return (
    <Input id={item}/>
  )
} 