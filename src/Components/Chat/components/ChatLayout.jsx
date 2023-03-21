import { useContext } from 'react';
import { GlobalContext } from '../../../context/UsersState';
import { ChatProvider } from '../context/ChatProvider';
import { RoomSelector } from './RoomSelector';
import { MessageBoard } from './MessageBoard';
import { ChatInput } from './ChatInput';
import { Collapse, Col, Row, Divider } from 'antd';

export function ChatLayout() {
  const { token } = useContext(GlobalContext);

  if (!token) return;
  
  return (
    <ChatProvider>
      <Collapse
        expandIconPosition='end'
        bordered={true}
        collapsible='icon'
        style={{ position: 'absolute', right: '10px', bottom: '10px', minWidth: '500px' }}
      >
        <Collapse.Panel header={<>Hola</>}>
          <Row align='center' gutter={0} justify='center' wrap={false}>
            <Col flex='1 1 auto' style={{ height: '400px', overflowY: 'auto' }}>
              <RoomSelector />
            </Col>
            <Col flex='0 0 auto'>
              <Divider type='vertical' style={{ height: '100%' }} />
            </Col>
            <Col flex='1 0 200px' style={{ height: '400px', overflowY: 'auto' }}>
              <MessageBoard />
            </Col>
          </Row>
          <Row>
            <ChatInput />
          </Row>
        </Collapse.Panel>
      </Collapse>
    </ChatProvider>
  )
}
