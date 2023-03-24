import React, { useContext, useEffect, useState } from 'react';
import CommentsForm from './CommentsForm';
import { deleteComments, getComments, updateComments } from './ServiceCommentCreate';
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GlobalContext } from '../../context/UsersState';
import { DateComponent } from '../DateComponent/DateComponent';
import { Modal, Input, Form, Button, Avatar, Spin } from 'antd'
import './Comments.scss'

const CommentsprintComments = (props) => {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState('');
  const { user } = useContext(GlobalContext);
  const [currentCommentEdit, setCurrentCommentEdit] = useState('');
  const [loading, setLoading] = useState(false);

  const printComments = async () => {
    const res = await getComments(postId);
    setComments(res);
  }

  const clickHandler = () => {
    setClick(!click)
    printComments();
  }

  const deletehandler = (commentId) => {
    const deleteComment = async () => {
      await deleteComments(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    }
    deleteComment();
    setLoading(true);
  }

  const updateHandler = (id) => {
    setIdToUpdate(id);
    setCurrentCommentEdit((comments.filter(comment => comment._id === id))[0].content);
    setVisibleForm(!visibleForm);
    setModalOpen(!modalOpen);
  }

  function onFinishEdit(e) {
    const updateComment = async () => {
      await updateComments(idToUpdate, e);
    }
    setLoading(true);
    updateComment()
    setVisibleForm(!visibleForm);
    setModalOpen(!modalOpen);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [loading])


  useEffect(() => {
    printComments()
  }, [comments])

  return (
    <div>
      <CommentOutlined onClick={clickHandler} />

      <div>
        {click === true && comments.map((comment) => {
          return (
            <div key={comment._id + 1}>
              <div className='commentBubble'>
                <Avatar src={comment.author.avatar} size={50} />
                <div className='commentContainer'>
                  <div className='commentInfo'>
                    <h3>{comment.author.displayName}</h3>
                    <span>{comment.content}</span>
                  </div>
                  <div className='commentEdit'>
                    <DateComponent datePost={comment.createdAt} />
                    {user.displayName === comment.author.displayName &&
                      <div className='showHover'>
                        <div className='hide'>
                          <EditOutlined onClick={() => updateHandler(comment._id)} />
                          <DeleteOutlined onClick={() => deletehandler(comment._id)} />
                          {loading && <Spin size="small" tip='Loading' />}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {visibleForm && (
        <Modal open={modalOpen}
          title='Edit your comment'
          footer={[]}>
          <img src={user.avatar} style={{ width: 50, height: 50 }} />
          <p>{user.displayName}</p>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ content: currentCommentEdit }}
            autoComplete="off"
            onFinish={(e) => onFinishEdit(e)}
          >
            <Form.Item
              name="content"
              rules={[{ required: true, message: 'Type something' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit edit
              </Button>
            </Form.Item>
          </Form>
        </Modal>)}
      <div>
        <CommentsForm postId={postId} comments={comments} setComments={setComments} />
      </div>
    </div>
  )
}

export default CommentsprintComments
