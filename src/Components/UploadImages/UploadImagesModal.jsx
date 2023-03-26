import React from 'react'
import { Button, Modal,} from 'antd';
import { Input, Select, Space } from 'antd';
import { useState } from 'react';

export const UploadImagesModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
    <Button type="primary"  onClick={showModal}>
    Generate your post image with AI
    </Button>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}  onCancel={handleCancel}>
     <Input defaultValue="Combine input and button" />
      <Button type="primary">Submit</Button>
    </Modal>
  </>
  )
}
