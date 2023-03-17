import React, { useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';

const token = 'abcd'

export function ChatInput(props) {
  const { emitMessage, isConnected } = props;
  const [form] = Form.useForm();

  function sendInput(input) {
    emitMessage(input.message);
    form.resetFields();
  }

  return (
    <>
      <Divider />
      <Form
        disabled={!isConnected}
        form={form}
        layout='inline'
        autoComplete='off'
        onFinish={(input) => sendInput(input)}
      >
        <Form.Item name='message'><Input /></Form.Item>
        <Button type="primary" htmlType="submit">Enviar</Button>
      </Form>
    </>
  )
}