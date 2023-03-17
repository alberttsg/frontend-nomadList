import { useEffect, useState } from 'react';
import { Manager } from 'socket.io-client';
import { RoomSelector } from './ContactList';
import { MessageBoard } from './MessageBoard';
import { ChatInput } from './ChatInput';
import { Collapse, Col, Row, Divider } from 'antd';

const URL = 'http://localhost:4000'
const manager = new Manager(URL);
const token = 'abcd';
const options = {
  withCredentials: true,
  auth: {
    token: token
  },
  autoConnect: true,
  reconnection: true,
}

export function ChatLayout() {
  const [messageEvents, setMessageEvents] = useState([]);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', onConnect);
    socket.on('connect_error', onDisconnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('connect_error', onDisconnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
    };
  }, [socket]);

  function onConnect() {
  }

  function onDisconnect(err) {
    console.log(err)
    return setMessageEvents(prev => [...prev, { type: 'warning', value: 'You are now disconnected' }]);
  }

  function onMessage(value, type) {
    console.log(value, type)
    if (type == 'warning') return setMessageEvents(prev => [...prev, { type: 'warning', value }]);
    if (type == token) {
      return setMessageEvents(prev => [...prev, { type: 'message', value }]);
    } else {
      return setMessageEvents(prev => [...prev, { type: 'inc_message', value }]);
    }
  }

  async function changeRoom(nsp, room) {
    const newSocket = manager.socket(nsp, options);
    setSocket(newSocket);
    newSocket.emit('joinRoom', room);
    if (nsp == '/personal') retrieveChatHistory(room);
    setRoom(room);
  }

  async function emitMessage(message) {
    if (!message) return;
    try {
      await socket.emitWithAck('message', message, room);
    } catch (error) {
      console.log(error)
    }
  }

  async function retrieveChatHistory(userId) {
    console.log(userId);
  }

  return (
    <>
      <Collapse
        expandIconPosition='end'
        bordered={true}
        collapsible='icon'
        style={{ position: 'absolute', right: '10px', bottom: '10px', minWidth: '500px' }}
      >
        <Collapse.Panel header={<>Hola</>}>
          <Row align='center' gutter={0} justify='center' wrap={false}>
            <Col flex='1 1 auto' style={{ height: '400px', overflowY: 'auto' }}>
              <RoomSelector changeRoom={changeRoom} />
            </Col>
            <Col flex='0 0 auto'>
              <Divider type='vertical' style={{ height: '100%' }} />
            </Col>
            <Col flex='1 0 200px' style={{ height: '400px', overflowY: 'auto' }}>
              <MessageBoard events={messageEvents} />
            </Col>
          </Row>
          <Row>
            <ChatInput emitMessage={emitMessage} isConnected={socket} />
          </Row>
        </Collapse.Panel>
      </Collapse>
    </>
  )
}
