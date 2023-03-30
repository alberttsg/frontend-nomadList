import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../PostCard';
import { Button, Modal, Tooltip, Form, Input, Row, Upload, Card, Divider } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { editPost, deletePost} from '../../../../service/postService';

export function EditPostButton() {
  const { post, setPostData } = useContext(PostContext);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(post)
  }, [editing])

  async function handleSubmit(inputs){
    const id = post._id;
    const editedPost = await editPost(id,inputs);
    setPostData(editedPost);
    setEditing(false);
    setOpen(false);
  }

  async function handleDelete(){
    const id = post._id;
    console.log('borro')
    deletePost(id);
    setPostData({
      author:'NomadUser',
      title:'This post has been deleted',
      likes: [],
      comments: [],
    })
  }

  return (
    <>
      <Tooltip title={!open && 'Edit post'} placement='left'>
        <Button
          type='primary'
          size='small'
          onClick={() => setOpen(!open)}
          style={{ position: 'absolute', right: '10px', top: '10px' }}
        >
        <EllipsisOutlined />
        </Button>
      </Tooltip>
      <Modal
        style={{ maxWidth: '100%' }}
        footer={null}
        open={open}
        onCancel={() => setEditing(false)}>
        <div onClick={() => {setEditing(!editing),setOpen(!open)}} style={{width:'100%', display:'flex', justifyContent:'center'}}>Edit</div>
        <Divider/>
        <div onClick={() => {setDeleting(!deleting),setOpen(!open)}}style={{color:'red', width:'100%', display:'flex', justifyContent:'center'}}>Delete</div>
      </Modal>
      <Modal
        style={{ maxWidth: '100%' }}
        title='Edit post'
        closable='true'
        footer={null}
        open={editing}
        onCancel={() => setEditing(false)}>
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Form.Item label='Title' name='title'>
            <Input />
          </Form.Item>
          <Form.Item label='Content' name='content'>
            <Input.TextArea autoSize={{ minRows: 3 }} />
          </Form.Item>
          <Row justify='end' style={{ gap: '10px' }}>
            <Button type='primary' onClick={() => setEditing(false)}>Cancel</Button>
            <Button type='primary' htmlType='submit'>Submit</Button>
          </Row>
        </Form>
      </Modal>
      <Modal
        style={{ maxWidth: '100%'}}
        title='Delete Posts'
        closable
        footer={null}
        open={deleting}
        onCancel={() => setDeleting(false)}>
        <div style={{color:'red'}}>¿Are you sure you want to delete this post?</div>
        <Divider/>
        <div onClick={() => setDeleting(!deleting)} style={{width:'100%', display:'flex', justifyContent:'center'}}>Cancel</div>
        <Divider/>
        <div onClick={() => {handleDelete(),setDeleting(!deleting)}}style={{color:'red', width:'100%', display:'flex', justifyContent:'center'}}>Delete</div>
      </Modal>
    </>
  )
}