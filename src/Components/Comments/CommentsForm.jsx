import React, { useContext } from 'react'
import { Button, Form, Input } from 'antd';
import { createComment, getComments } from './ServiceCommentCreate';
import { GlobalContext } from '../../context/UsersState';

const CommentsForm = (props) => {
  const [form] = Form.useForm();
  const { user } = useContext(GlobalContext);
  const { postId } = props;

  const onFinish = async (values) => {
    const content = values.content;
    createComment(content, user, postId);
    form.resetFields();
  }

  return (
    <div>
      <Form
        layout='vertical'
        form={form}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item name='content'>
          <Input placeholder="Leave your comments" />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">Send</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CommentsForm