import { useContext } from 'react';
import { GlobalContext } from '../../../context/UsersState';
import { RoomSelector } from './RoomSelector';
import { ActiveRoom } from './ActiveRoom';
import { MessageBoard } from './MessageBoard';
import { ChatInput } from './ChatInput';
import { Affix, Collapse, Col, Row } from 'antd';
import { UsergroupAddOutlined } from "@ant-design/icons";

export function ChatLayout() {
  const { token } = useContext(GlobalContext);

  if (!token) return;

  return (
    <Affix
      style={{
        position: 'absolute',
        boxSizing: 'border-box',
        bottom: '0',
        right: '0',
        zIndex: 1,
      }}
    >
      <Collapse
        expandIconPosition='end'
        bordered={true}
        collapsible='icon'
        style={{ background: '#efefef' }}
      >
        <Collapse.Panel header={<UsergroupAddOutlined />}>
          <Row justify='center' gutter={[10, 10]} style={{ maxHeight: '100vh' }}>
            <Col xs={{ span: 24 }} style={{ maxHeight: '20vh', overflowY: 'auto' }}>
              <RoomSelector />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }} style={{ maxHeight: '5vh' }}>
              <ActiveRoom />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }} style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <MessageBoard />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }} style={{ maxHeight: '5vh' }}>
              <ChatInput />
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
    </Affix>
  )
}
