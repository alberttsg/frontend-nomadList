import React from 'react';
import {
    Button,
    Form,
    Input,
    Upload,
    Col,
    message,
    Spin,
    Space,
    Divider,
    Image,
} from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './CreatePostAI.scss';
import axios from 'axios';
import { CaretLeftOutlined } from '@ant-design/icons';
import { ServiceCreatePostbyIa } from '../CreatePost/ServiceCreatePost';

const { TextArea } = Input;

export const CreatePostAI = ({ onAction }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form1] = Form.useForm();
    const [form5] = Form.useForm();
    const [iaImage, setIaImage] = useState([]);
    const [seeImg, setSeeImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const navigate = useNavigate();
    const onFinish = (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('image', selectedImage);
        console.log(Object.fromEntries(formData));
        ServiceCreatePostbyIa(formData).then((res) => {
            if (res === false) {
                messageApi.error('Bad language detected');
            } else {
                messageApi.success('Post created');
            }
        }).catch((err) => {
            console.log(err);
        });
          
    };
    const prueba = (values) => {
        const value = values.mySearch;
        const body = { prompt: value };
        setSeeImg(false);
        setLoading(true);

        const searchImag = async (body) => {
            const res = await axios.post(
                'https://flask-production-782a.up.railway.app/image',
                body
            );
            console.log(res.data);
            return res.data;
        };
        searchImag(body).then((res) => {
            console.log(res);
            setIaImage(res);
            setLoading(false);
            setSeeImg(true);
        });
    };

    const getSelectedImage = (e) => {
        const src = e.target.src;
        setSelectedImage(src);
    };
    const finishForm = (values) => {
       console.log(values)

    }

    return (
        <>
                                  <div>
                                      <Button type="link" onClick={onAction}>
                                      <CaretLeftOutlined />  Return
                                      </Button>
                                  </div>
                    <h2 style={{ textAlign: 'center' }}>Create post with AI</h2>
                    <br />
            {contextHolder}
            <Spin spinning={loading} delay={500}>
                    <Form form={form5} onFinish={prueba}>
                        <Form.Item name="mySearch">
                            <Space.Compact style={{ width: '100%' }}>
                                <Input type="text" name="searchBar" placeholder='Search an image' />
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Space.Compact>
                        </Form.Item>
                    <div className="ia-img-container">
                        {loading === true && <Spin />}
                        {seeImg === true &&
                            iaImage.map((img) => {
                                const key = img.url
                                    .split('/')
                                    [img.url.split('/').length - 1].split(
                                        '.'
                                    )[0];
                                return (
                                    <img
                                        key={key}
                                        src={img.url}
                                        alt="img"
                                        className="ia-img"
                                        onClick={getSelectedImage}
                                    />
                                );
                            })}
                    </div>
                    </Form>
                <Form
                    form={form1}
                    wrapperCol={{ span: 24 }}
                    layout="horizontal"
                    style={{
                      width: '100%',
                      padding: '20px',
                    }}
                    size="large"
                    onFinish={onFinish}>
                    <div>
                    </div>
                    <Form.Item
                        name="title"
                        rules={[
                            { required: true, message: 'Please enter a title' },
                        ]}>
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a content',
                            },
                        ]}>
                        <TextArea rows={4} placeholder="Description" />
                    </Form.Item>
                    <br />
                    <br />
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            style={{
                                width: '100%',
                                backgroundColor: 'black',
                                color: 'white',
                            }}>
                            Create Post
                        </Button>
                    </Form.Item>
                    <Divider />
                </Form>
            </Spin>
        </>
    );
};
