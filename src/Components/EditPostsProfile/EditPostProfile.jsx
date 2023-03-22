
import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { GlobalContext } from "../../context/UsersState";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { PostContext } from "../../context/PostContext/PostState";

const EditPostProfile = ({ visible, setVisible, selectedPostId , content, title}) => {
    const {editPost, deletePost, getPostById} = useContext(PostContext);
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
        form.setFieldsValue({
            title: title,
            content: content
        });
        console.log('titulooooooooooo',title)
    // useEffect(() => {
    //     if (selectedPostId) {
    //         console.log(selectedPostId)
    //        const post = getPostById(selectedPostId);
    //         form.setFieldsValue({
    //           title,
    //           content 
    //         });
    //       }
    //     }, [selectedPostId, form]);
    const onFinish = (values, id  ) => {
      console.log('VALOREEEEES:', values, 'id:', id);
      editPost(id, values);
      setVisible(false);
    };
    return (
        <Modal title='EDITAR POST' open={visible} onCancel={() => setVisible(false)} footer={[]}>
      <Form form={form} onFinish={onFinish} >
        <Form.Item  name='title'>
          <Input placeholder='Editar titulo' />
        </Form.Item>
        <Form.Item  name='content'>
            <TextArea 
            value={content}
            showCount
            maxLength={200}
            style={{ height: 120, marginBottom: 24 }}
            placeholder="Editar contenido"
            />
        </Form.Item>
        <Form.Item >
          <div className="handle-user-actions">

          <Button onClick={()=>handleDeleteUserClick(post._id)} style={{background: "#F23F42"}} type='primary' htmlType=''>
            Eliminar publicación
          </Button>
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

