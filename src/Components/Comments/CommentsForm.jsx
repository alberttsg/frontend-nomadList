import React, { useContext, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import { CommentsContext } from '../../context/comments/CommentsState';
import { GlobalContext } from '../../context/UsersState';


const CommentsForm = (props) => {
  const [form] = Form.useForm();
  const { createComment } = useContext(CommentsContext)
  const { user } = useContext(GlobalContext);
  const { postId } = props;

  const onFinish = async (values) => {
    const inputComment = values.content;
    console.log(inputComment);
    createComment(inputComment, user, postId);
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
          <Button type="primary" style={{ left: 160 }} htmlType="submit">Send</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CommentsForm