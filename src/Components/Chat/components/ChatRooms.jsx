import { useContext, useEffect } from 'react';
import { ChatContext } from '../context/ChatProvider';
import { List, Button } from 'antd';

export function ChatRooms() {
  const { setSocket, generalSocket, activeRoom, setActiveRoom, chatrooms, setChatrooms } = useContext(ChatContext);

  useEffect(() => {
    setChatrooms();
  }, [])

  function changeRoom(room) {
    setSocket(generalSocket);
    generalSocket.emitWithAck('joinRoom', room);
    setActiveRoom(room);
  }

  return (
    <List
      split={false}
      itemLayout='vertical'
      dataSource={chatrooms}
      loading={false}
      renderItem={(item) => (
        <List.Item style={{ padding: '5px' }}>
          <Button
            className={activeRoom === item.room ? 'active' : null}
            style={{ display: 'flex', padding: '5px', justifyContent: 'left', width: '100%' }}
            onClick={() => changeRoom(item.room)}
          >
            <span>{item.title}</span>
            <span style={{ position: 'absolute', right: '5px', fontStyle: 'italic' }}>{item.state}</span>
          </Button>
        </List.Item>
      )}
    />
  )
}