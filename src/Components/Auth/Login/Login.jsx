
import { Button, Modal, Row, Col, Carousel } from 'antd';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../context/UsersState';
import { Register } from '../Register/Register';
import './Login.scss';
import LoginForm from './LoginForm';
import { images } from './loginImages';

export const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reset } = useContext(GlobalContext);
  const navigate = useNavigate();

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
      <Row align='middle' justify='end' style={{ height: '100%' }}>
        <Row align='middle' justify='center'>

          <Col md={{ span: 0 }} lg={{ span: 4 }} style={{ padding: '20px' }} />

          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <div className='logo-login' onClick={() => navigate('/')}>nomad</div>
            <Col xs={{ span: 0 }} md={{ span: 24 }} style={{ padding: '20px' }} >
              <Carousel autoplay >
                {images.map((img, ind) => <img className='image' src={img} key={ind} />)}
              </Carousel>
            </Col>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} style={{ padding: '20px' }}>
            <LoginForm />
            <div className='register-content'>
              <p>You don´t have an account?</p>
              <Button type="link" onClick={showModal} className="register-button">Register</Button>
            </div>
            <Modal title="Register" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
              <Register onCancel={handleCancel} />
            </Modal>
          </Col>
          <Col md={{ span: 0 }} lg={{ span: 4 }}></Col>
        </Row>
      </Row>
  )
}