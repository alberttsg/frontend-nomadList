import React from 'react';
import { Button, Form, Input, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ServiceCreatePost } from '../CreatePost/ServiceCreatePost';
import { useNavigate } from 'react-router';


export const CreatePostNew = ({onAction, onClose}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const navigate = useNavigate();
  const [tipState, setTipState] = useState('')

  const onFinish = (values) => {
    const archivo = values.image.file
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('image', archivo);

    if(values.image.file.type === "image/png" ||  values.image.file.type === "image/jpg" || values.image.file.type === "image/jpeg"){
      setLoading(true);
      setTipState('Uploading ...');
      messageApi.open({
        type: 'loading',
        content: 'Loading...',
        maxCount: 3,
        duration: 0,
        style: {
          textAlign : 'center',
        },
      })

      ServiceCreatePost(formData).then((res) => {
        messageApi.destroy();
        setLoading(false);
        if(res === false){
          messageApi.open({
            type: 'error',
            maxCount: 3,
            content: 'Bad language has been detected, please use good words..',
            duration: 10,
            style: {
              textAlign : 'center',
            },
          })
          setTimeout(messageApi.destroy, 3500);
        }

        if (res) {
          messageApi.open({
            type: 'success',
            maxCount: 3,
            content: 'Post has been successfully created',
            duration: 10,
            style: {
              textAlign : 'center',
            },
          })

          navigate('/');
          onClose();
          location.reload();
          form.resetFields();
        }
      });

  }else{
    return messageApi.open({
      type: 'error',
      maxCount: 3,
      content: 'Please upload an valid image',
      duration: 5,
      style: {
        textAlign : 'center',
      }})}};
  return (
    <>
        {contextHolder}
        <Spin spinning={loading} delay={500} tip={tipState} >
      <Form
        form={form}
        wrapperCol={{span: 24}}
        layout="horizontal"
        style={{
          width: '100%',
          padding: "20px",
        }}
        size="large"
        onFinish={onFinish}>
        <h2 style={{textAlign: 'center'}}>Create post</h2>
        <br/>
        <Form.Item name="title" rules ={[{required: true, message: 'Please enter a title'}]}>
          <Input placeholder='Title' />
        </Form.Item>
        <Form.Item name="content" rules ={[{required: true, message: 'Please enter a content'}]}>
          <TextArea rows={4}  placeholder="Description"/>
        </Form.Item>
        <Form.Item name='image' rules ={[{required: true, message: 'Please upload a image'}]} style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
        <Upload beforeUpload={(file)=> {if(file){resolve("success")}}} multiple={false} maxCount='1' name='image' accept="image/*" style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Button style={{width:'34vh'}} icon={<UploadOutlined />}>Click to Upload a image</Button>
        </Upload>
        </Form.Item>
        <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Button type='default' onClick={onAction} style={{width:'34vh', alignContent: 'center'}}>Post with AI image generator</Button>
        </div>
        <br/>
        <br/>
        <Form.Item>
          <Button htmlType='submit' style={{width:'100%', backgroundColor: 'black', color: 'white'}} >Create Post</Button>
        </Form.Item>
      </Form>
      </Spin>
    </>
  );
}
