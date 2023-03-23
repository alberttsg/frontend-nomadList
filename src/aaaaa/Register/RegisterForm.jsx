import { useContext } from 'react'
import { UserContext } from '../../context/UserState'
import { countries } from '../../resources/countries';
import { Button, Form, Input, Select, notification } from 'antd';

export function RegisterForm() {
  const { register } = useContext(UserContext);
  const [form] = Form.useForm();

  const options = countries.map((e) => (
    { value: `${e}`, label: `${e}` }
  ))

  const onFinish = async (values) => {
    const response = await register(values)
    if (!response) {
      return notification.error({ message: 'Something went wrong' })
    };
    form.resetFields()
  }

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
      form={form}
      align='right'
    >
      <Form.Item
        label='First Name'
        name='firstName'
        rules={[{ required: true, message: 'Please enter your first name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Last Name'
        name='lastName'
        rules={[{ required: true, message: 'Please enter your last name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='birthDate' label='Birth Date'>
        <Input type='date' />
      </Form.Item>
      <Form.Item
        name='email'
        label='E-mail'
        rules={[{ type: 'email', message: 'E-mail is not valid!' },
        { required: true, unique: true, message: 'Please enter your E-mail!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
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
      <Form.Item
        name='confirm'
        label='Confirm Password'
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
        name='nationality'
        label='Nationality'
        rules={[{ required: true, message: 'Please select your Nationality!' }]}
      >
        <Select placeholder='select your country' showSearch='true' options={[{ options }]} />
      </Form.Item>
      <Form.Item
        name='gender'
        label='Gender'
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder='select your gender'>
          <Option value='male'>Male</Option>
          <Option value='female'>Female</Option>
          <Option value='other'>Other</Option>
        </Select>
      </Form.Item>
      <Button type='primary' htmlType='submit'>Register</Button>
    </Form>
  )
}
