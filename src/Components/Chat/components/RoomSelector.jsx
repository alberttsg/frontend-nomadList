import { ContactList } from './ContactList.jsx';
import { ChatRooms } from './ChatRooms.jsx';
import { Collapse } from 'antd';

export function RoomSelector() {
  return (
    <Collapse>
      <Collapse.Panel header='Contacts'>
        <ContactList />
      </Collapse.Panel>
      <Collapse.Panel header='Chat Rooms'>
        <ChatRooms />
      </Collapse.Panel>
    </Collapse >
  )
}
