import React, { useState } from "react";
import { EditUserForm } from "./EditUserForm";
import { Button, Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";
import './EditUser.scss'

export const EditUser = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button type='primary' style={{border: '0.7px solid black',backgroundColor: '#5f8c8a', color: 'white'}} onClick={() => setOpen(true)}>
        <SettingFilled style={{display: 'flex', alignItems:'center', fontSize: '18px', color: 'white'}}/>
      </Button>

      <Modal
        title={<h3 style={{ textAlign: 'center' }}>EDIT USER</h3>}
        open={isOpen}
        onCancel={() => setOpen(false)}
        footer={
          <Button onClick={() => setOpen(false)} style={{ background: 'gray' }} type='primary'>
            Cancel
          </Button>
        }
        width={800}
      >
        <EditUserForm setModalOpen={setOpen} />
      </Modal>
    </>
  );
};
