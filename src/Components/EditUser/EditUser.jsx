import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form, Input, Select, message, Row, Col } from "antd";
import { GlobalContext } from "../../context/UsersState";
import './EditUser.scss'
import { UploadAvatar } from "./UploadAvatar";


const EditUser = ({ visible, setVisible}) => {
  const { editUser, user, getUserInfo, deleteUser} = useContext(GlobalContext);

  const handleDeleteUserClick = (id) => {
    setVisible(false);
    Modal.confirm({
       title: "¿Estas seguro de borrar tu cuenta?",
       content: " Esta acción no se puede deshacer! No podrás revertirlo!",
       okText: "SI",
       okType: "danger",
       cancelText: "No",
       onOk() {
         deleteUser(id);
        logOut();
        navigate('/');
        reset();
        message.success('CIAO, BORRASTE LA CUENTA');
       },
       onCancel() {
         message.error('NO BORRASTE LA CUENTA');
         console.log("Cancel");
        //  setVisible(true)
       },
      });
    
  };
    const countriesArray = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
  const options = countriesArray.map((e) => (
    { value: `${e}`, label: `${e}` }
  ))


  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue(user);
  }, [user])

  const onFinish = (values) => {
    console.log(values);
    editUser(values, user._id);
    getUserInfo()
    setVisible(false);
  };
  return (
    <Modal
    title={<h3 style={{ textAlign: 'center' }}>EDITAR USUARIO</h3>}
    open={visible}
    onCancel={() => setVisible(false)}
    footer={[]}
    width={800} 
  >
    <Form form={form} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label='Nombre' name='firstName'>
            <Input placeholder='Edite su nombre' />
          </Form.Item>
          <Form.Item label='Apellidos' name='lastName'>
            <Input placeholder='Edite su apellido' />
          </Form.Item>
          <Form.Item label='username' name='username'>
            <Input placeholder='Edite su nombre de usuario' />
          </Form.Item>
          <Form.Item label='email' name='email'>
            <Input placeholder='¿Desea cambiar su correo electrónico?' />
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
            <Select placeholder='select your country' options={[{ options }]} />
          </Form.Item>
          <Form.Item label='BIO' name='bio'>
            <Input placeholder='¿Qué estas pensando?' />
          </Form.Item>
          <Form.Item label='Profesion' name='profesion'>
            <Input placeholder='Cuentanos de que estas trabajando!' />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label='Hobbie' name='hobbie'>
            <Input placeholder='¿Qué te apasiona?' />
          </Form.Item>
          <Form.Item label='Otro Hobbie' name='hobbie2'>
            <Input placeholder='¿Qué te apasiona?' />
          </Form.Item>
          <Form.Item label='Lugar de Preferencia' name='prefLocation'>
            <Input placeholder='Cuentanos tu lugar preferido?' />
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
          <Form.Item label='Foto de Perfil' name='avatar'>
            <UploadAvatar />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <div className='handle-user-actions'>
          <Button
            onClick={() => handleDeleteUserClick(user._id)}
            style={{ background: '#F23F42' }}
            type='primary'
            htmlType=''
          >
            Eliminar Cuenta
          </Button>
          <Button onClick={() => setVisible(false)} style={{ background: 'gray' }} type='primary'>
            Cancelar
          </Button>
          <Button type='primary' htmlType='submit'>
            Enviar
          </Button>
          </div>
        </Form.Item>
       
     
      </Form>
    </Modal>
  );
};

export default EditUser;
