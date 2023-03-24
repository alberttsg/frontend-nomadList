import { useContext } from 'react';
import { UserContext } from '../../../context/UserState';
import { Button, Form, Input, notification } from 'antd';

export function LoginForm() {
  const { login } = useContext(UserContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const response = await login(values);
    if (!response) {
      return notification.error({ message: 'Wrong email or password. Try Again.' })
    };
    form.resetFields();
  };

  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='on'
      form={form}
      align='center'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ padding: '20px', width: '100%' }}
    >
      <div className='form-title'>Login</div>
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: 'Please enter a valid e-mail!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Button type='primary' htmlType='submit'>
        Login
      </Button>
    </Form>
  )
}
