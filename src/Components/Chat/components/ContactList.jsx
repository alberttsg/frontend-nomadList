import { useContext, useEffect } from 'react'
import { ChatContext } from '../context/ChatProvider';
import { List, Avatar, Button } from 'antd';

export function ContactList() {
  const { setSocket, personalSocket, activeRoom, setActiveRoom, contacts, setContacts } = useContext(ChatContext);

  useEffect(() => {
    setContacts();
  }, [])

  async function changeRoom(room) {
    await setSocket(personalSocket);
    await personalSocket.emitWithAck('joinRoom', room);
    setActiveRoom(room);
  }

  return (
    <List
      split={false}
      itemLayout='vertical'
      dataSource={contacts}
      loading={false}
      renderItem={(item) => (
        <List.Item >
          <Button
            className={activeRoom === item.room ? 'active' : null}
            style={{ display: 'flex', padding: '5px', justifyContent: 'left', gap: '10px', width: '100%' }}
            onClick={() => changeRoom(item.userId)}
          >
            <Avatar
              src={'https://static.vecteezy.com/system/resources/previews/006/487/917/original/man-avatar-icon-free-vector.jpg'}
              size='small'
            />
            <span>{item.title}</span>
            <span style={{ position: 'absolute', right: '5px' }}>{item.state}</span>
          </Button>
        </List.Item>
      )}
    />
  )
};
