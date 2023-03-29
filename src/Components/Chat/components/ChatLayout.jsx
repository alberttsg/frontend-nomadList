import { useContext } from 'react';
import { GlobalContext } from '../../../context/UsersState';
import { RoomSelector } from './RoomSelector';
import { ActiveRoom } from './ActiveRoom';
import { MessageBoard } from './MessageBoard';
import { ChatInput } from './ChatInput';
import { Affix, Collapse, Col, Row, Divider } from 'antd';

export function ChatLayout() {
  const { token } = useContext(GlobalContext);

  if (!token) return;

  return (
    <Affix
      offsetBottom={10}
      style={{ position: 'fixed', right: '20px', bottom: '20px', minWidth: '100px' }}
    >
      <Collapse
        expandIconPosition='end'
        bordered={true}
        collapsible='icon'
        style={{ background: '#efefef' }}
      >
        <Collapse.Panel header={<>Chat</>}>
          <Row align='center' gutter={0} justify='center' wrap={false} style={{ minWidth: '500px', height: '400px' }} >
            <Col flex='1 1 40%' style={{ overflowY: 'auto' }}>
              <RoomSelector />
            </Col>
            <Col flex='0 0 5%'>
              <Divider type='vertical' style={{ height: '100%' }} />
            </Col>
            <Col flex='1 0 55%'>
              <ActiveRoom />
              <MessageBoard />
            </Col>
          </Row>
          <Row>
            <ChatInput />
          </Row>
        </Collapse.Panel>
      </Collapse>
    </Affix>
  )
}
