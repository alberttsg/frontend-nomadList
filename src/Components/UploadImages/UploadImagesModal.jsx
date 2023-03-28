import React from 'react'
import axios from 'axios';
import { Button, Modal, Divider, Input, Spin, Space} from 'antd';
import { useState } from 'react';
import './UploadImages.scss';

export const UploadImagesModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iaImage, setIaImage] = useState([]);
  const [seeImg, setSeeImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.searchBar.value;
    const body = {prompt: value}
    setSeeImg(false)
    setLoading(true)

    const searchImag = async (body) => { 
      const res = await axios.post('https://flask-production-782a.up.railway.app/image', body)
      console.log(res.data)
      return res.data
    };
    searchImag(body).then((res) => {
      setIaImage(res)
      setLoading(false)
      setSeeImg(true)
    })

    };

  return (
    <>
    <Button type="primary"  onClick={showModal}>
    Generate your post image with AI
    </Button>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}  onCancel={handleCancel}>
      <form onSubmit={handleSubmit}>
      <Space.Compact style={{ width: '100%'}}>
        <Input type='text' name='searchBar' />
        <Button type="primary" htmlType='submit'>Submit</Button>
      </Space.Compact>
      </form>
        <Divider />
      {loading === true && <Spin />}
      {seeImg === true && iaImage.map((img) => {
        const key = img.url.split('/')[img.url.split('/').length - 1 ].split('.')[0]
       return <img key={key} src={img.url} alt='img' className='ia-img' />
      })}
      </Modal>
  </>
  )
}
