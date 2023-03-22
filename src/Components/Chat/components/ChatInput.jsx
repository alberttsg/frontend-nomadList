import React, { useContext, useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { ChatContext } from '../context/ChatProvider';

export function ChatInput() {
  const { socket, activeRoom } = useContext(ChatContext);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function emitMessage(input) {
    if (!input.message) return;
    try {
      setIsLoading(true);
      await socket.emitWithAck('message', input.message, activeRoom);
      form.resetFields();
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Divider />
      <Form
        disabled={!socket || !socket.connected || isLoading}
        form={form}
        layout='inline'
        autoComplete='off'
        onFinish={(input) => emitMessage(input)}
      >
        <Form.Item name='message' style={{ width: '410px' }}>
          <Input autoFocus={true} />
        </Form.Item>
        <Button type="primary" htmlType="submit">Enviar</Button>
      </Form>
    </>
  )
}