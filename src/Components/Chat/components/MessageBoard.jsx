import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/UsersState';
import { ChatContext } from '../context/ChatProvider';
import { List, ConfigProvider } from 'antd';
import '../styles/chatStyles.scss';

export function MessageBoard() {
  const { user } = useContext(GlobalContext);
  const { socket } = useContext(ChatContext)
  const [events, setEvents] = useState([]);

  function onConnect() { }

  function onDisconnect(err) {
    console.log(err.message);
    return setEvents(prev => [...prev, { type: 'warning', value: 'You are now disconnected' }]);
  }

  function onMessage(value, type) {
    if (type == 'warning') return setEvents([{ type: 'warning', value }]);
    if (type == user.id) {
      return setEvents(prev => [...prev, { type: 'message', value }]);
    } else {
      return setEvents(prev => [...prev, { type: 'inc_message', value }]);
    }
  }

  function onChatHistory(history) {
    setEvents(history);
  }

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', onConnect);
    socket.on('connect_error', onDisconnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);
    socket.on('chat-history', onChatHistory);

    return () => {
      socket.off('connect', onConnect);
      socket.off('connect_error', onDisconnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
      socket.off('chat-history', onChatHistory);
    };
  }, [socket]);

  return (
    <ConfigProvider renderEmpty={() => <span>No messages</span>}>
      <List
        split={false}
        bordered={true}
        itemLayout='vertical'
        dataSource={events}
        style={{ height: '95%', overflowY: 'auto' }}
        renderItem={(event, index) => (
          <List.Item style={{ padding: '5px 5px' }}>
            <div key={index} className={event.type}>{event.value}</div>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}