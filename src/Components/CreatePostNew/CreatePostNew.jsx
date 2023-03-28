import React from 'react';
import { Button, Form, Input, Upload, Col, Row, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ServiceCreatePost } from '../CreatePost/ServiceCreatePost';


const { TextArea } = Input;


export const CreatePostNew = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  const onFinish = (values) => {
    const archivo = values.image.file.originFileObj
    const formData = new FormData();
    setLoading(true);
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('image', archivo);
    messageApi.open({
      type: 'loading',
      content: 'Loading...',
      maxCount: 3,
      duration: 0,
      style: {
        marginLeft: '45vh',
        textAlign : 'center',
      },
    })
    ServiceCreatePost(formData).then((res) => {
      console.log(res);
      messageApi.destroy();
      setLoading(false);
      if(res === false){
        messageApi.open({
          type: 'error',
          maxCount: 3,
          content: 'Bad language has been detected, please use good words..',
          duration: 10,
          style: {
            marginLeft: '45vh',
            textAlign : 'center',
          },
        })
        setTimeout(messageApi.destroy, 3500);
      }
      if (res) {
        message.success('Post created successfully');
        form.resetFields();
      }

    });
  };
  return (
    <>
    <Row span={2}>
    <Col span={24}></Col>   
    </Row>
    <Row span={20}>
      <Col span={5}></Col>
      <Col span={14}>
        {contextHolder}
        <Spin spinning={loading} delay={500}>
      <Form
        form={form}
        wrapperCol={{span: 24}}
        layout="horizontal"
        style={{
          maxWidth: 600,
          border: "1px solid #e8e8e8",
          borderRadius: "5px",
          padding: "20px",
          margin: "0 auto",
          boxShadow: "0 0 10px #e8e8e8",
        }}
        size="large"
        onFinish={onFinish}
      >
        <h2 style={{textAlign: 'center'}}>Create post</h2>
        <Form.Item  name="title" style={{ marginBottom: "-0px"}}>
          <Input placeholder='Title' />
        </Form.Item>
        <Form.Item name="content"  style={{ margin: '0px 0' }}>
          <TextArea rows={4}  placeholder="Description"/>
        </Form.Item>
        <Form.Item name='image' style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
        <Upload beforeUpload={(file)=> {if(file){resolve("success")}}} multiple='false' maxCount='1' name='image' status='uploading' style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Button style={{width:'34vh'}} icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' style={{width:'100%'}} >Create Post</Button>
        </Form.Item>
      </Form>
      </Spin>
      </Col>
      <Col span={5}></Col>
    </Row>  
    <Row span={2}>
    <Col span={24}></Col> 
    </Row>
    </>
  );
}
