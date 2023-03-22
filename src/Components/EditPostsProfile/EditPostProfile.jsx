
import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { GlobalContext } from "../../context/UsersState";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { PostContext } from "../../context/PostContext/PostState";

const EditPostProfile = ({ visible, setVisible, selectedPost }) => {
    const {editPost, deletePost, getPostById} = useContext(PostContext);
    const {user} = useContext(GlobalContext);
    
    const [form] = Form.useForm();
    // const token = JSON.parse(localStorage.getItem("token"));

  
    
    useEffect(() => {
        if (selectedPost) {
            getPostById(selectedPost._id);
            form.setFieldsValue(selectedPost);
          }
        }, [selectedPost, form]);
        
    const onFinish = (values ) => {
        
        editPost(selectedPost._id, values);
        setVisible(false);
        message.success(' EDITADO CORRECTAMENTE ');
    };

    return (
        <Modal title='EDITAR POST' open={visible} onCancel={() => setVisible(false)} footer={[]}>
      <Form form={form} onFinish={onFinish} >
        <Form.Item  name='title'>
          <Input placeholder='Editar titulo' />
        </Form.Item>
        <Form.Item  name='content'>
            <TextArea 
            showCount
            maxLength={5000}
            style={{ height: 120, marginBottom: 24 }}
            placeholder="Editar contenido"
            />
        </Form.Item>
        <Form.Item >
          <div className="handle-user-actions">

          {/* <Button onClick={()=>handleDeleteUserClick()} style={{background: "#F23F42"}} type='primary' htmlType=''>
            Eliminar publicación
          </Button> */}
          <Button onClick={()=>setVisible(false)} style={{background: "gray"}} type='primary'>
            Cancelar
          </Button>
          <Button type='primary'htmlType="submit" >
            Hecho
          </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
    );
};

export default EditPostProfile;

