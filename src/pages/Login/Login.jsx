import { images } from '../../resources/loginImages';
import { LoginForm } from '../../aaaaa/Login/LoginForm';
import { RegisterModal } from '../../aaaaa/Register/RegisterModal';
import { Row, Col, Carousel } from 'antd';
import './Login.scss';
import { Logo } from '../../aaaaa/Header/Logo';

export const Login = () => {
  return (
    <Row align='middle' justify='center' style={{ height: '100%' }}>
      <Row align='middle' justify='center'>

        <Col md={{ span: 0 }} lg={{ span: 4 }} />

        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Logo size={40} width={100} />
          <Col xs={{ span: 0 }} md={{ span: 24 }}>
            <Carousel autoplay>
              {images.map((img, ind) => <img className='image' src={img} key={ind} />)}
            </Carousel>
          </Col>
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <LoginForm />
          <div className='register'>
            Don't have an account?
            <RegisterModal />
          </div>
        </Col>

        <Col md={{ span: 0 }} lg={{ span: 4 }} />

      </Row>
    </Row>
  )
}
