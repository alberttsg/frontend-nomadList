import React, { useContext, useEffect, useState } from 'react';
import CommentsForm from './CommentsForm';
import { deleteComments, getComments, updateComments } from './ServiceCommentCreate';
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GlobalContext } from '../../context/UsersState';
import { DateComponent } from '../DateComponent/DateComponent';
import { Modal, Input, Form, Button } from 'antd'

const CommentsPrint = (props) => {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [idToUpdate,setIdToUpdate] = useState('');
  const { user } = useContext(GlobalContext);

  const clickHandler = () => {
    setClick(!click)
    print()
  }

  const deletehandler = (commentId) => {
    const deleteComment = async () => {
      await deleteComments(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    }
    deleteComment();
  }

  const updateHandler = (id) => {
    setIdToUpdate(id);
    setVisibleForm(!visibleForm);
    setModalOpen(!modalOpen);
  }

  function onFinishEdit(e){
    const updateComment = async () => {
      await updateComments(idToUpdate,e);
    }
    updateComment()
    setVisibleForm(!visibleForm);
    setModalOpen(!modalOpen);
    print()
  }


    const print = async () => {
      const res = await getComments(postId);
      setComments(res);
    }
    
  return (
    <div>
      <CommentOutlined onClick={clickHandler} />
      <div>
        {click === true && comments && comments.map((comment) => {
          return (
            <div key={comment._id + 1}>
              <p>{comment.author.displayName}</p>
              <DateComponent datePost={comment.createdAt} />
              <p>{comment.content}</p>
              <div>
                {user.displayName === comment.author.displayName && <div>
                  <EditOutlined onClick={() => updateHandler(comment._id)} />
                  <DeleteOutlined onClick={() => deletehandler(comment._id)} />
                </div>}
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
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={(e)=>onFinishEdit(e)}
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

export default CommentsPrint
