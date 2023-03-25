import React, { useContext, useEffect } from 'react'
import { Button, Form, Input, notification } from 'antd';
import { GlobalContext } from '../../../context/UsersState';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [form] = Form.useForm();
  const { login, isError, reset } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onFinish = (values) => {
    login(values);
    form.resetFields()
    navigate('/');
    reset()
  };

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Wrong email or password. Try Again!!"
      });
      reset()
    };
  }, [isError]);

  return (
    <Form
      name="basic"
      align='center'
      labelCol={{ span: 8, }}
      wrapperCol={{ span: 16 }}
      style={{ padding: '20px', width: '100%' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <div className='title-login'>
        <h2>Login</h2>
      </div>
      <Form.Item label="E-mail" name="email"
        rules={[
          {
            required: true,
            pattern: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
            message: 'Please input a correct e-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm;