import React, { useContext, useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { ChatContext } from '../context/ChatProvider';

export function ChatInput() {
  const { socket, activeRoom } = useContext(ChatContext);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function emitMessage(input) {
    if (!input) return;
    try {
      setIsLoading(true);
      await socket.emitWithAck('message', input, activeRoom);
      form.resetFields();
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ marginTop: '5px' }}>
      <Form
        disabled={!socket || !socket.connected || isLoading}
        form={form}
        layout='horizontal'
        autoComplete='off'
        labelCol={24}
        wrapperCol={24}
      >
        <Form.Item name='message'>
          <Input.Search
            autoFocus={true}
            enterButton='Send'
            onSearch={emitMessage}
            loading={isLoading}
          />
        </Form.Item>
      </Form>
    </div>
  )
}