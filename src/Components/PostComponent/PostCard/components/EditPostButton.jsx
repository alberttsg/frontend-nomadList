import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../PostCard';
import { Button, Modal, Tooltip, Form, Input, Row, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';

export function EditPostButton() {
  const { post, setPostData } = useContext(PostContext);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(post)
  }, [editing])

  const handleSubmit = (inputs) => {
    console.log(inputs);
  }

  return (
    <>
      <Tooltip title={!editing && 'Edit post'} placement='left'>
        <Button
          type='primary'
          onClick={() => setEditing(!editing)}
          style={{ position: 'absolute', right: '10px', top: '10px', padding: '0 10px' }}
        >
          <EditOutlined />
        </Button>
      </Tooltip>
      <Modal
        style={{ maxWidth: '100%' }}
        title='Edit post'
        closable
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
          <Row justify='space-between'>
            <Button icon={<DeleteOutlined />}>Delete post image</Button>
            <Form.Item name='imagePost'>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Form.Item>
          </Row>
          <Row justify='end' style={{ gap: '10px' }}>
            <Button type='primary' onClick={() => setEditing(false)}>Cancel</Button>
            <Button type='primary' htmlType='submit'>Submit</Button>
          </Row>
        </Form>
      </Modal>
    </>
  )
}