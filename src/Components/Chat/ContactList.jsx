import { useEffect } from 'react';
import { Collapse, List, Avatar, Button } from 'antd';

export function RoomSelector(props) {
  const { changeRoom } = props;

  useEffect(() => {

  }, [])

  return (
    <Collapse>
      <Collapse.Panel header='Contacts'>
        <ContactList changeRoom={changeRoom} />
      </Collapse.Panel>
      <Collapse.Panel header='Chat Rooms'>
        <ChatRooms changeRoom={changeRoom} />
      </Collapse.Panel>
    </Collapse >
  )
}

const contacts = [
  {
    title: 'Paco',
    state: '✅',
    nsp: '/personal',
    userId: '01',
  },
  {
    title: 'Pepe',
    state: '✅',
    nsp: '/personal',
    userId: '02',
  },
  {
    title: 'Manolo',
    state: '✅',
    nsp: '/personal',
    userId: '03',
  },
  {
    title: 'Ramon',
    state: '✅',
    nsp: '/personal',
    userId: '04',
  },
]

export function ContactList(props) {
  const { changeRoom } = props;

  return (
    <List
      split={false}
      itemLayout='vertical'
      dataSource={contacts}
      loading={false}
      renderItem={(item) => (
        <List.Item >
          <Button style={{ display: 'flex', padding: '5px', justifyContent: 'left', gap: '10px', width: '100%' }} onClick={() => changeRoom(item.nsp, item.userId)} >
            <Avatar src={'https://static.vecteezy.com/system/resources/previews/006/487/917/original/man-avatar-icon-free-vector.jpg'} size='small' />
            {item.title}
            <span style={{ position: 'absolute', right: '5px' }}>{item.state}</span>
          </Button>
        </List.Item>
      )}
    />
  )
}

const rooms = [
  {
    title: 'General',
    state: '(504 users)',
    nsp: '/chatrooms',
    room: 'general',
  },
  {
    title: 'Europe',
    state: '(127 users)',
    nsp: '/chatrooms',
    room: 'europe',
  },
  {
    title: 'America',
    state: '(108 users)',
    nsp: '/chatrooms',
    room: 'america',
  },
  {
    title: 'Spain',
    state: '(32 users)',
    nsp: '/chatrooms',
    room: 'spain',
  },
]

export function ChatRooms(props) {
  const { changeRoom } = props;

  return (
    <List
      split={false}
      itemLayout='vertical'
      dataSource={rooms}
      loading={false}
      renderItem={(item) => (
        <List.Item style={{ padding: '5px' }}>
          <Button style={{ display: 'flex', padding: '5px', justifyContent: 'left', width: '100%' }} onClick={() => changeRoom(item.nsp, item.room)} >
            {item.title}
            <span style={{ position: 'absolute', right: '5px', fontStyle: 'italic' }}>{item.state}</span>
          </Button>
        </List.Item>
      )}
    />
  )
}