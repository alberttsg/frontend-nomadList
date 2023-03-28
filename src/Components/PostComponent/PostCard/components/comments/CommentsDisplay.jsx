import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../PostCard';
import { editComment, getCommentsByPostId } from '../../../../../service/postService';
import { DateComponent } from '../../../../DateComponent/DateComponent';
import { Space, List, Avatar, Row, Divider, Input, Tooltip, Button, Form } from 'antd';
import { GlobalContext } from '../../../../../context/UsersState';
import { deleteComment } from '../../../../../service/postService';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export function CommentsDisplay() {
  const { user } = useContext(GlobalContext);
  const { post } = useContext(PostContext);
  const [comments, setComments] = useState();
  const [edited, setEdited] = useState();
  const [isLoading, setLoading] = useState(false);

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

  const handleEdit = async (id, value) => {
    setLoading(true);
    await editComment(id, value);
    const res = await getCommentsByPostId(post?._id);
    setComments(res);
    setEdited();
    setLoading(false);
  };

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
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
              <DateComponent datePost={comment?.createdAt} datePost2={comment?.updatedAt} />
              {user?._id == comment?.author?._id &&
                <>
                  <Tooltip title='Edit comment' placement='top'>
                    <EditOutlined onClick={() => setEdited(comment._id)} />
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
                padding: '0 10px',
                width: '100%',
                fontSize: '12px',
                boxSizing: 'content-box',
                whiteSpace: 'pre-wrap',
                wordBreak: 'normal',
                marginBottom: '20px',
              }}>
              {comment?._id == edited ?
                <Form
                  onFinish={(value) => handleEdit(comment._id, value)}
                >
                  <Form.Item name='content' >
                    <Input.TextArea showCount maxLength={500} defaultValue={comment?.content} style={{ width: '180%' }} bordered={false} />
                  </Form.Item>
                  <Button type="primary" size='small' htmlType='submit'>Update</Button>
                </Form>
                :
                comment?.content
              }
            </Row>
          </div>
        }
      />
    </Space>
  )
}