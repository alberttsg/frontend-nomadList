import { Button, Form, Input, Modal, notification } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../context/UsersState';
import { Register } from '../Register/Register';
import './Login.scss';


export const Login = () => {
  const [form] = Form.useForm();

  const { login, isError, reset } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const showModal = () => {
    setIsModalOpen(true);
    reset()
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
        <div className='logo-login' onClick={() => navigate('/')}>nomad</div>
        <div className="carousel-container">
          <div className="carousel-box">
            <div className="carousel-element">
              <img className="image" src="https://res.cloudinary.com/lauradohle/image/upload/v1678500630/nomad-socialNetwork/pexels-ma%C3%ABl-balland-2076968_dmncwo.jpg" />
            </div>
            <div className="carousel-element">
              <img className="image" src="https://res.cloudinary.com/lauradohle/image/upload/v1678500630/nomad-socialNetwork/pexels-kyle-roxas-2187629_kob09h.jpg" />
            </div>
            <div className="carousel-element">
              <img className="image" src="https://res.cloudinary.com/lauradohle/image/upload/v1678500629/nomad-socialNetwork/pexels-shaan-johari-2405041_dv31xq.jpg" />
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
          autoComplete="off"
          form={form}
        >
          <div className='title-login'>
            <h2>Login</h2>
          </div>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                message: 'Please input a correct e-mail!',
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