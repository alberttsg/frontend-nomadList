import { countries } from '../../../../resources/countries';
import { Button, Modal, Form, Input, Select, Row, Col } from "antd";
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../../Profile';
import { UploadAvatar } from "./UploadAvatar";
import { editUserById, deleteUserById } from '../../../../service/userService';
import { GlobalContext } from '../../../../context/UsersState';

export function EditUserForm({ setModalOpen }) {
  const { logOut } = useContext(GlobalContext);
  const { userData, setUserData } = useContext(ProfileContext);
  const [form] = Form.useForm();
  const countriesArray = countries.map((e) => ({ value: `${e}`, label: `${e}` }));

  useEffect(() => {
    form.setFieldsValue(userData);
  }, [userData]);

  const onFinish = (values) => {
    async function updateUser() {
      const res = await editUserById(userData._id, values);
      setUserData(res);
    };
    updateUser();
    setModalOpen(false);
  };

  const onDelete = () => {
    async function deleteUser() {
      const res = await deleteUserById(userData._id);
      if (res) logOut();
    }
    Modal.confirm({
      title: "¿Are you sure you want to delete your account?",
      content: "This action cannot be reverted.",
      okText: "YES",
      okType: "danger",
      cancelText: "NO",
      onOk() { deleteUser(userData._id) },
      onCancel() { setModalOpen(false) },
    });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={[16, 16]}>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label='Name' name='firstName'>
            <Input placeholder='Edit your name' />
          </Form.Item>
          <Form.Item label='Last Name' name='lastName'>
            <Input placeholder='Edit your lastname' />
          </Form.Item>
          <Form.Item label='username' name='username'>
            <Input placeholder='Edit your username' />
          </Form.Item>
          <Form.Item label='email' name='email'>
            <Input placeholder='Do you want to change your email?' />
          </Form.Item>
          <Form.Item
            name='nationality'
            label='Nationality'
            rules={[
              {
                required: true,
                message: 'Please select your Nationality!',
              },
            ]}
          >
            <Select placeholder='select your country' showSearch="true" options={[{ options: countriesArray }]} />
          </Form.Item>
          <Form.Item label='BIO' name='bio'>
            <Input placeholder='What are you thinking?' />
          </Form.Item>
          <Form.Item label='Profession' name='profesion'>
            <Input placeholder='Tell us what you are working on!' />
          </Form.Item>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label='Hobbie' name='hobbie'>
            <Input placeholder='What are you passionate about?' />
          </Form.Item>
          <Form.Item label='Other Hobbie' name='hobbie2'>
            <Input placeholder='What are you passionate about?' />
          </Form.Item>
          <Form.Item label='Preference place' name='prefLocation'>
            <Input placeholder='What is your favorite place?' />
          </Form.Item>
          <Form.Item label='Linkedin' name='linkedin'>
            <Input placeholder='@linkedin' />
          </Form.Item>
          <Form.Item label='Twitter' name='twitter'>
            <Input placeholder='@twitter' />
          </Form.Item>
          <Form.Item label='Instagram' name='instagram'>
            <Input placeholder='@instagram' />
          </Form.Item>
          <Form.Item label='Profile photo' name='avatar'>
            <UploadAvatar />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type='primary'
          style={{ background: '#F23F42' }}
          onClick={() => onDelete(userData._id)}
        >
          Delete account
        </Button>
        <Button
          type='primary'
          htmlType='submit'
        >
          Update info
        </Button>
      </Form.Item>
    </Form>
  )
}