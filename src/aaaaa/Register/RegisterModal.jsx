import { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { Modal, Button } from 'antd';

export const RegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => { setIsModalOpen(true) };
  const handleOk = () => { setIsModalOpen(false) };
  const handleCancel = () => { setIsModalOpen(false) };

  return (
    <>
      <Button type='link' onClick={showModal}>
        Register
      </Button>
      <Modal
        title='Register'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <RegisterForm />
      </Modal>
    </>
  )
}
