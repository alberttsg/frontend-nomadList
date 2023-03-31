import { Button, Form, Input, Select, notification } from 'antd'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/UsersState'
import { countries } from '../../../resources/countries'
import './Register.scss'

export const Register = ({ onCancel }) => {
  const { register, reset, isErrorRegister } = useContext(GlobalContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    form.resetFields()
    register(values);
    reset()
  }

  useEffect(() => {
    if (isErrorRegister) {
      return notification.error({
        message: "This email already exists. Please log in or use another email",
      });
    }
    reset()
  }, [isErrorRegister]);

  const options = countries.map((e) => (
    { value: `${e}`, label: `${e}` }
  ))

  return (
    <div className='register-container'>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 800,
         
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='birthDate' label="Birth Date">
          <Input type="date" />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              pattern: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              unique: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
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
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
              message: 'Must be between 8 and 15 digits. Include at leaste one number, and one upper case letter',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

        <Form.Item
          name="nationality"
          label="Nationality"
          rules={[
            {
              required: true,
              message: 'Please select your Nationality!',
            },
          ]}
        >
          <Select placeholder="select your country" showSearch="true" options={[{ options }]} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 10,
           
          }}
        >
          <Button style={{
        position:'absolute'
      }}  type="primary" htmlType="submit" onClick={onCancel}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Button style={{
        marginLeft:'2px'
      }} type="link" href='/' className='login-button'>Login</Button>
    </div>
  )
}
