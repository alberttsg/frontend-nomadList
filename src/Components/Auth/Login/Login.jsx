import { Button, Checkbox, Form, Input,Modal } from 'antd'
import { useState } from 'react';
import { Register } from '../Register/Register';
import './Login.scss'


export const Login = () => {
  

  const onFinish = (values) => {
    console.log('Success:', values);
  }
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };  
  return(

  
  <div className='login-container'>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" href='/profile'>
          login
        </Button>
      </Form.Item>
    </Form>
    <Button type="link" onClick={showModal} >Register</Button>
    <Modal title="Register" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
        <Register  onCancel={handleCancel} />
      </Modal>
  </div>
)}