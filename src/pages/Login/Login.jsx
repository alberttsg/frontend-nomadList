import { images } from '../../resources/loginImages';
import { LoginForm } from '../../aaaaa/Login/LoginForm';
import { RegisterModal } from '../../aaaaa/Register/RegisterModal';
import { Row, Col, Carousel } from 'antd';
import './Login.scss';
import { Logo } from '../../aaaaa/Header/Logo';

export const Login = () => {
  return (
    <Row align='middle' justify='center' style={{ padding: '20px', height: '100%' }}>
      <Col xs={{ span: 0 }} md={{ span: 0 }} lg={{ span: 4 }}></Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
        <Logo size={40} width={100} />
        <Carousel autoplay>
          {images.map((img, ind) => <img className='image' src={img} key={ind} />)}
        </Carousel>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
        <LoginForm />
        <div className='register'>
          Don't have an account?
          <RegisterModal />
        </div>
      </Col>
      <Col xs={{ span: 0 }} md={{ span: 0 }} lg={{ span: 4 }}></Col>
    </Row>
  )
}
