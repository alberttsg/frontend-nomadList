import { useContext, useState } from 'react';
import { PostContext } from '../../PostCard';
import { createComment } from '../../../../../service/postService';
import { Form, Spin, Button, Input, message } from 'antd';

export function CommentsInputForm() {
  const { post, setPostData } = useContext(PostContext);
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await createComment(values, post._id);

    if (!res) {
      setLoading(true);
      setLoading(false);
      form.resetFields();
      return message.warning({
        content: 'Your comment contains bad lenguage.Try again',
        style: { marginTop: '20vh' }
      })
    }

    form.resetFields();
    setPostData(res);
    setLoading(false);
  }

  return (
    <div>
      <Spin size="small" tip='Publishing' spinning={isLoading} >
        <Form
          layout='horizontal'
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name='content'
            rules={[{ required: true, message: 'Please put a message' }]}>
            <Input placeholder="Leave your comments" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Send</Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
}