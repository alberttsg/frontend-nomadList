import { CheckCircleTwoTone, DeleteTwoTone, EditOutlined, SettingFilled } from '@ant-design/icons';
import { Avatar, Button, Card, Modal } from 'antd';
import React, { useContext,useEffect, useState } from 'react';
import { GlobalContext } from "../../context/UsersState";
import EditUser from "../../Components/EditUser/EditUser";
import { useNavigate } from 'react-router';
import './UserCard.scss';
import FollowersModal from '../FollowersModal/FollowersModal';
import FollowedModal from '../FollowedModal/FollowedModal';



const UserCard = () => {
  const [visible, setVisible] = useState(false);
  const [visiblers, setVisiblers] = useState(false);

  const { getUserInfo, user, deleteUser, logOut, reset, getUserById } = useContext(GlobalContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showEditModal = () => {
    getUserInfo();
  setIsModalVisible(true);
};
const handleShowFollowers = async () => {
  console.log('kndakdhik')
    setVisible(true);
  
};
const handleShowFollowed = async () => {
 console.log('juujujujujujuujuu')
    setVisiblers(true);
  
};
    return (
 
      <div className='card-info-container'>
        {console.log(user)}
         <div className='left-avatar'><Avatar size={158}
            src={user.avatar}/>
            </div>
           <div className='right-info'>

            <div className='first-line'>
              <span>{user.username}{' '}<CheckCircleTwoTone  style={{fontSize: '12px'}} twoToneColor={'#3797F0'} /></span>
              {/* <button>siguiendo</button>
              <button>enviar mensaje</button> */}
              <Button type='primary' onClick={() => {
              showEditModal();
              console.log("editando");
            } }><SettingFilled />Editar Perfil</Button>

            </div>
            <div className='second-line'>
           
              <span onClick={handleShowFollowers}>{user.followersCount}{' '}seguidores</span>
              <FollowersModal visible={visible} onClose={() => setVisible(false)}/>
        
              <span onClick={handleShowFollowed}>{user.followedCount}{' '}seguidos</span>
              <FollowedModal visiblers={visiblers} onClosers={() => setVisiblers(false)}/>

            </div>
            <br />
            <div className='third-line'>
              <div ><b>Bio: </b> {user.bio}</div>
             
              <div> <b>Profesión:</b> {' ' +  user.profesion }</div>
             
              <div><b>Hobbie:</b> { ' ' + user.hobbie}</div>
           
            </div>

           </div>
          <EditUser  visible={isModalVisible} setVisible={setIsModalVisible}/>
       </div>
       
      
    );
};

export default UserCard;