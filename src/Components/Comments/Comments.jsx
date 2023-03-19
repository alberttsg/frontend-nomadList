import React, { useContext, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import { CommentsContext } from '../../context/comments/CommentsState';
import { GlobalContext } from '../../context/UsersState';


const Comments = () => {
  const [form] = Form.useForm();
  const { getComments, comments, createComment} = useContext(CommentsContext)
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    getComments();
    console.log(user);
  }, []);

  const onFinish = async (values) => {
    const inputComment = values.comment;
    console.log(inputComment);
    createComment(inputComment, user);
    form.resetFields();
  }

  const comment = Object.values(comments);

  const printComments = comment.map((element) => {
    console.log(element)
    return (
      <div key={element._id}>
        <div>{element.author}</div>
        <div>{element.content}</div>
      </div>
    )
  })

  return (
    <div>
      <div>
        {printComments}
      </div>
      <Form
        layout='vertical'
        form={form}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item name='comment'>
          <Input placeholder="Leave your comments" />
        </Form.Item>
        <Form.Item >
          <Button type="primary" style={{ left: 500 }} htmlType="submit">Send</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Comments