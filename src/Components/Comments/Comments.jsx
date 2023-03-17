import React, { useContext, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import { CommentsContext } from '../../context/comments/CommentsState';


const Comments = () => {
  const [form] = Form.useForm();
  const { getComments, comments, createComment } = useContext(CommentsContext)

  useEffect(() => {
    getComments();
    console.log(comments);
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    createComment(values);
    form.resetFields()
  }
  const comment = Object.values(comments);
  const printComments = comment.map((element)=>{
    console.log(element);
    return (
      <div key={element._id}>
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
        <Form.Item name='comments'>
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