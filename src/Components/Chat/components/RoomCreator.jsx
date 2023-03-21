import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatProvider';
import { Modal, Input } from 'antd';

export function RoomCreator(props) {
  const { open, onOk, onCancel } = props;
  const { createRoom } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);

  const addRoom = async (room) => {
    setIsLoading(true);
    await createRoom(room);
    setIsLoading(false);
    onCancel();
  }

  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel} closable={false}>
      <Input.Search
        loading={isLoading}
        disabled={isLoading}
        enterButton='Create'
        size='big'
        placeholder='Create a room'
        onSearch={(input) => addRoom(input)}
      />
    </Modal>
  )
}