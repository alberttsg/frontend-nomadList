import { Button, Form, Input, Modal } from 'antd';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../context/UsersState';
import { Register } from '../Register/Register';

import './Login.scss';


export const Login = () => {
  const { login } = useContext(GlobalContext);

  const onFinish = (values) => {
    login(values);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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

  return (
    <div className='container'>
      <div className='primary-container'>
        <div className='logo' onClick={() => navigate('/')}>nomad</div>
        <div className="carousel-container">
            <div className="carousel-box">
                <div className="carousel-element">
                    <img className="image" src="https://res.cloudinary.com/lauradohle/image/upload/v1678500630/nomad-socialNetwork/pexels-ma%C3%ABl-balland-2076968_dmncwo.jpg" />
                </div>
                <div className="carousel-element">   
                    <img className="image" src="https://res.cloudinary.com/lauradohle/image/upload/v1678500630/nomad-socialNetwork/pexels-kyle-roxas-2187629_kob09h.jpg"/>
                </div>
                <div className="carousel-element">   
                    <img className="image" src="https://res.cloudinary.com/lauradohle/image/upload/v1678500629/nomad-socialNetwork/pexels-shaan-johari-2405041_dv31xq.jpg"/>                        
                </div>
            </div>
        </div>
      </div>
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
          <div className='title-login'>
            <h2>Login</h2>
          </div>
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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className='register-content'>
          <p>You don´t have an account?</p>
          <Button type="link" onClick={showModal} >Register</Button>
        </div>
            <Modal title="Register" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
              <Register onCancel={handleCancel} />
            </Modal>
      </div>
    </div>

  )
}