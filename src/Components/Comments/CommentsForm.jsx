import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import { createComment } from './ServiceCommentCreate';
import { GlobalContext } from '../../context/UsersState';


const CommentsForm = (props) => {
  const [form] = Form.useForm();
  const { user } = useContext(GlobalContext);
  const { postId, comments, setComments } = props;

  const onFinish = async (values) => {
    const content = values.content;
    const currentDate = new Date().toLocaleString("es-ES");;
    const newComment = {
      _id: '',
      author: user._id,
      post: postId,
      content: content,
      createdAt: currentDate,
    }
    createComment(newComment, postId);
    const update = [...comments, newComment];
    setComments(update)
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