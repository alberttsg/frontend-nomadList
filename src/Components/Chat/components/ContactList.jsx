import { useContext, useEffect } from 'react'
import { ChatContext } from '../context/ChatProvider';
import { List, Avatar, Button, ConfigProvider } from 'antd';
import '../styles/chatStyles.scss';

export function ContactList() {
  const { setSocket, personalSocket, activeRoom, setActiveRoom, contacts, setContacts } = useContext(ChatContext);

  useEffect(() => {
    setContacts();
  }, [activeRoom])

  async function changeRoom(room, title) {
    await setSocket(personalSocket);
    await personalSocket.emitWithAck('joinRoom', room);
    setActiveRoom(room, title);
  }

  return (
    <ConfigProvider renderEmpty={() =>
      <>
        <p>No contacts.</p>
        <p>Add one</p>
      </>
    }>
      <List
        split={false}
        itemLayout='vertical'
        dataSource={contacts}
        loading={false}
        renderItem={(item) => (
          <List.Item style={{ padding: '5px 0' }}>
            <Button
              className={activeRoom === item.userId ? 'active' : null}
              style={{ display: 'flex', alignItems: 'center', padding: '5px', justifyContent: 'left', gap: '5px', width: '100%' }}
              onClick={() => changeRoom(item.userId, item.title)}
            >
              <Avatar
                src={item.avatar}
                size='small'
                style={{ flex: '0 0 auto', width: '20px', height: '20px' }}
              />
              <span>{item.title}</span>
              <span style={{ position: 'absolute', right: '5px' }}>{item.state}</span>
            </Button>
          </List.Item>
        )}
      />
    </ConfigProvider>

  )
};
