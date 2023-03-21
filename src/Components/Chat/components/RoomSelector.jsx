import { ContactList } from './ContactList.jsx';
import { ContactsFinder } from './ContactsFinder.jsx';
import { ChatRooms } from './ChatRooms.jsx';
import { RoomCreator } from './RoomCreator.jsx';
import { Tooltip, Button, Collapse } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

export function RoomSelector() {
  const [isModal1Open, setModal1Open] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);

  const showModal1 = () => { setModal1Open(true) };
  const handleOk1 = () => { setModal1Open(false) };
  const handleCancel1 = () => { setModal1Open(false) };

  const showModal2 = () => { setModal2Open(true) };
  const handleOk2 = () => { setModal2Open(false) };
  const handleCancel2 = () => { setModal2Open(false) };

  return (
    <Collapse>
      <Collapse.Panel header={
        <>
          Contacts
          <Tooltip title='Add contact'>
            <Button
              size='small'
              shape='circle'
              icon={<PlusCircleOutlined/>}
              onClick={showModal1}
              style={{ position: 'absolute', right: '10px' }}
            ></Button>
          </Tooltip>
        </>
      }>
        <ContactList />
        <ContactsFinder
          open={isModal1Open}
          onOk={handleOk1}
          onCancel={handleCancel1}
        />
      </Collapse.Panel>
      <Collapse.Panel header={
        <>
          Chat Rooms
          <Tooltip title='Add contact'>
            <Button
              size='small'
              shape='circle'
              icon={<PlusCircleOutlined/>}
              onClick={showModal2}
              style={{ position: 'absolute', right: '10px' }}
            ></Button>
          </Tooltip>
        </>
      }>
        <ChatRooms />
        <RoomCreator
          open={isModal2Open}
          onOk={handleOk2}
          onCancel={handleCancel2}
        />
      </Collapse.Panel>
    </Collapse >
  )
}
