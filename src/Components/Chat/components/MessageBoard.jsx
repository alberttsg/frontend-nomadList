import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/UsersState';
import { ChatContext } from '../context/ChatProvider';
import { List, ConfigProvider } from 'antd';
import '../styles/chatStyles.scss';

export function MessageBoard() {
  const { user } = useContext(GlobalContext);
  const { socket } = useContext(ChatContext)
  const [events, setEvents] = useState([]);
  const colors = new Map();

  function onConnect() { }

  function onDisconnect(err) {
    console.log(err.message);
    return setEvents(prev => [...prev, { type: 'warning', value: 'You are now disconnected' }]);
  }

  function onMessage(value, type, username) {
    console.log(value, type, username)
    if (type == 'warning') return setEvents([{ type: 'warning', value }]);
    if (!colors.has(username)) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      colors.set(username, `#${randomColor}`);
    }
    if (type == user.id) {
      return setEvents(prev => [...prev, { type: 'message', value, username, bg: colors.get(username) }]);
    } else {
      return setEvents(prev => [...prev, { type: 'inc_message', value, username, bg: colors.get(username) }]);
    }
  }

  function onChatHistory(history) {
    const usernames = history.map(e => e.username);
    usernames.map(username => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      if (!colors.has(username)) colors.set(username, `#${randomColor}`);
    });
    const addedStyles = history.map(e => { return { ...e, bg: colors.get(e.username) } })
    setEvents(addedStyles);
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
            <div key={index}>
              {event.type != 'warning' &&
                <div className='username'>
                  {event.username}
                </div>
              }
              <div
                className={event.type}
                style={{ backgroundColor: `${event.bg}` }}
              >
                {event.value}
              </div>
            </div>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}