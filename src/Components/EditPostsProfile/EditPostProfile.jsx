
import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { GlobalContext } from "../../context/GlobalState";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const EditPostProfile = ({ post }) => {
  const { token } = useContext(GlobalContext);
  const config = { headers: { Authorization: token } };

  const editPost = async (id, post) => {
    const res = await axios.put(`https://backend-nomadsociety-development.up.railway.app/post/${id}/`, post, config);
    console.log(res.data);
    console.log(res.data, 'actualizado');
    return res.data;
  };
º
  const deletePost = async (id) => {
    const res = await axios.get(
      `https://backend-nomadsociety-development.up.railway.app/post/${id}`,
      config
    );
    return res.data;
  };

  const handleDeleteUserClick = (id) => {
    setVisible(false);
    Modal.confirm({
      title: "¿Estas seguro de borrar tu post?",
      content: " Esta acción no se puede deshacer! No podrás revertirlo!",
      okText: "SI",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletePost(id);
        message.success(' BORRASTE EL POST');
      },
      onCancel() {
        message.error('NO BORRASTE EL POST');
        console.log("Cancel");
        //  setVisible(true)
      },
    });
  }
  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue({
      title: post.title,
      content: post.content,
    });
    console.log('post values ', post.title, post.content)
  }, [post])

  const onFinish = (values) => {
    console.log('VALOREEEEES:', values);
    editPost(id, values);
    setVisible(false);
  };
  return (
    <Modal title='EDITAR POST' open={visible} onCancel={() => setVisible(false)} footer={[]}>
      <Form form={form} onFinish={onFinish} >
        <Form.Item name='title'>
          <Input placeholder='Editar titulo' />
        </Form.Item>
        <Form.Item name='content'>
          <TextArea
            showCount
            maxLength={200}
            style={{ height: 120, marginBottom: 24 }}
            placeholder="Editar contenido"
          />
        </Form.Item>
        <Form.Item >
          <div className="handle-user-actions">

            <Button onClick={() => handleDeleteUserClick(post._id)} style={{ background: "#F23F42" }} type='primary' htmlType=''>
              Eliminar publicación
            </Button>
            <Button onClick={() => setVisible(false)} style={{ background: "gray" }} type='primary'>
              Cancelar
            </Button>
            <Button type='primary' htmlType="submit" >
              Hecho
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPostProfile;