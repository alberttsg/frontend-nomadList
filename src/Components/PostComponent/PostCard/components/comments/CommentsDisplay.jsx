import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../PostCard';
import { editComment, getCommentsByPostId } from '../../../../../service/postService';
import { DateComponent } from '../../../../DateComponent/DateComponent';
import { Space, List, Avatar, Row, Input, Tooltip, Button, Form, ConfigProvider } from 'antd';
import { GlobalContext } from '../../../../../context/UsersState';
import { deleteComment } from '../../../../../service/postService';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export function CommentsDisplay() {
  const { user } = useContext(GlobalContext);
  const { post } = useContext(PostContext);
  const [comments, setComments] = useState();
  const [edited, setEdited] = useState();
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await getCommentsByPostId(post?._id);
      setComments(res);
      setLoading(false);
    };
    getData();
  }, [post])

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteComment(id);
    const res = await getCommentsByPostId(post?._id);
    setComments(res);
    setLoading(false);
  };

  const handleOnEdit = async (id, value) => {
    setLoading(true);
    await editComment(id, value);
    const res = await getCommentsByPostId(post?._id);
    setComments(res);
    setEdited();
    setLoading(false);
  };

  const handleEditing = (comment) => {
    setEdited(comment._id);
    form.setFieldsValue(comment);
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <ConfigProvider renderEmpty={() => <span>No comments</span>}>
        <List
          itemLayout='vertical'
          style={{ maxHeight: '250px', overflowY: 'auto', overflowX: 'hidden' }}
          bordered={true}
          loading={isLoading}
          dataSource={comments}
          renderItem={(comment) =>
            <div style={{ border: '1px solid #efefef' }}>
              <Row
                align='middle'
                style={{
                  width: '100%',
                  margin: '10px',
                  fontSize: '12px',
                  fontStyle: 'bold',
                  gap: '10px',
                }}>
                <Avatar size={20} src={comment?.author?.avatar} />
                <span>{comment?.author?.displayName}</span>
                <DateComponent
                  datePost={comment?.createdAt}
                  datePost2={comment?.updatedAt}
                />
                {user?._id == comment?.author?._id &&
                  <>
                    <Tooltip title='Edit comment' placement='top'>
                      <EditOutlined onClick={() => handleEditing(comment)} />
                    </Tooltip>
                    <Tooltip title='Delete comment' placement='top'>
                      <DeleteOutlined onClick={() => handleDelete(comment._id)} />
                    </Tooltip>
                  </>
                }
              </Row>
              <Row
                align='middle'
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  padding: '0 10px',
                  marginBottom: '20px',
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'normal',
                }}>
                {comment?._id == edited ?
                  <Form
                    form={form}
                    onFinish={(value) => handleOnEdit(comment._id, value)}
                    style={{ width: '100%' }}>
                    <Form.Item name='content'>
                      <Input.TextArea
                        showCount
                        bordered={true}
                        autoSize={true}
                        maxLength={500}
                        style={{ width: '100%' }} />
                    </Form.Item>
                    <Button type="primary" size='small' htmlType='submit'>
                      Update
                    </Button>
                  </Form>
                  :
                  comment?.content
                }
              </Row>
            </div>
          }
        />
      </ConfigProvider>
    </Space>
  )
}