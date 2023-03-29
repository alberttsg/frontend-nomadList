import { useContext, useEffect } from 'react';
import { ChatContext } from '../context/ChatProvider';
import { List, Button, ConfigProvider } from 'antd';
import '../styles/chatStyles.scss';

export function ChatRooms() {
  const { setSocket, generalSocket, activeRoom, setActiveRoom, chatrooms, setChatrooms } = useContext(ChatContext);

  useEffect(() => {
    setChatrooms();
  }, [activeRoom])

  useEffect(() => {
    const chatUpdate = setInterval(() => {
      setChatrooms();
    }, 10000);
    return () => clearInterval(chatUpdate);
  }, [])

  function changeRoom(room, title) {
    setSocket(generalSocket);
    generalSocket.emitWithAck('joinRoom', room);
    setActiveRoom(room, title);
  }

  return (
    <ConfigProvider renderEmpty={() =>
      <>
        <p>No chatrooms.</p>
        <p>Create one</p>
      </>
    }>
      <List
        split={false}
        itemLayout='vertical'
        dataSource={chatrooms}
        loading={false}
        renderItem={(item) => (
          <List.Item style={{ padding: '5px 0' }}>
            <Button
              className={activeRoom === item.room ? 'active' : null}
              style={{ display: 'flex', padding: '5px', justifyContent: 'left', width: '100%' }}
              onClick={() => changeRoom(item.room, item.title)}
            >
              <span>{item.title}</span>
              <span style={{ position: 'absolute', right: '5px', fontStyle: 'italic' }}>{item.state}</span>
            </Button>
          </List.Item>
        )}
      />
    </ConfigProvider>
  )
}