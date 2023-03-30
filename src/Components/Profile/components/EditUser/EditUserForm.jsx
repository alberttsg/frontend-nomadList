import { countries } from '../../../../resources/countries';
import { Button, Modal, Form, Input, Select, Row, Col, Upload, message } from "antd";
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../../Profile';
import { editUserById, deleteUserById } from '../../../../service/userService';
import { GlobalContext } from '../../../../context/UsersState';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

export function EditUserForm({ setModalOpen }) {
  const { logOut } = useContext(GlobalContext);
  const { userData, setUserData } = useContext(ProfileContext);
  const [form] = Form.useForm();
  const countriesArray = countries.map((e) => ({ value: `${e}`, label: `${e}` }));

  useEffect(() => {
    form.setFieldsValue(userData);
  }, [userData]);

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('nationality', values.nationality);
    formData.append('image', values.avatar.file);
    formData.append('bio', values.bio);
    formData.append('hobby', values.hobby);
    formData.append('hobby2', values.hobby2);
    formData.append('prefLocation', values.prefLocation);
    formData.append('linkedin', values.linkedin);
    formData.append('twitter', values.twitter);
    formData.append('instagram', values.instagram);
    formData.append('profession', values.profession);
    formData.append('username', values.username);
    formData.append('email', values.email);

    async function updateUser() {
      const res = await editUserById(userData._id, formData);
      setUserData(res);
    };
    updateUser()
    .then(res => message.success('User updated successfully'))
    .catch(err => message.error('Something went wrong, please try again later'));
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
            <TextArea maxLength={100} placeholder='What are you thinking?' />
          </Form.Item>
          <Form.Item label='Profession' name='profession'>
            <Input placeholder='Tell us what you are working on!' />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label='Hobbie' name='hobby'>
            <Input placeholder='What are you passionate about?' />
          </Form.Item>
          <Form.Item label='Other Hobbie' name='hobby2'>
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
          <Form.Item  name='avatar' style={{ display: 'flex', justifyContent: 'right'}}>
          <Upload beforeUpload={(file)=> {if(file){resolve("success")}}} multiple={false} maxCount='1' name='image' accept="image/*" style={{ }}>
            <Button style={{alignSelf: 'flex-start'}} icon={<UploadOutlined />}>Click to Upload your profile's picture</Button>
          </Upload>
          </Form.Item>
        </Col>
      </Row>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', gap: '20px' }}>
        <Button
          type='secondary'
          className='delete-account-button'
          onClick={() => onDelete(userData._id)}
          style={{ color: 'tomato', border: '1.5px solid tomato' }}
        >
          <DeleteOutlined />
          Delete account
        </Button>
        <Button
          type='primary'
          htmlType='submit'
        >
          Update info
        </Button>
      </div>
    </Form>
  )
}