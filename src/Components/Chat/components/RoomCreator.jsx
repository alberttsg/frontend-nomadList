import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatProvider';
import { Modal, Form, Input, Button } from 'antd';

export function RoomCreator(props) {
  const { open, onOk, onCancel } = props;
  const { socket, createRoom } = useContext(ChatContext);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel}>
      <Form
        form={form}
        layout='horizontal'
        autoComplete='off'
        onFinish={(input) => console.log(input)}
      >
        <Form.Item name='message' style={{ width: '410px' }}><Input /></Form.Item>
        <Button type="primary" htmlType="submit">Enviar</Button>
      </Form>
    </Modal>
  )
}