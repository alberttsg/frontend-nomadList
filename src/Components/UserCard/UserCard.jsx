import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { GlobalContext } from "../../context/UsersState";
import EditUser from "../../Components/EditUser/EditUser";
import { useNavigate } from 'react-router';
import './UserCard.scss';



const UserCard = () => {
  const { getUserInfo, user, deleteUser, logOut, reset, getUserById } = useContext(GlobalContext);
  const showEditModal = () => {
    getUserInfo();
  setIsModalVisible(true);
};
const [isModalVisible, setIsModalVisible] = useState(false);
    return (
 
      <div className='card-info-container'>
        {console.log(user)}
         <div className='left-avatar'><Avatar size={158}
            src={user.avatar}/>
            </div>
           <div className='right-info'>

            <div className='first-line'>
              <span>{user.username}</span>
              {/* <button>siguiendo</button>
              <button>enviar mensaje</button> */}
              <button onClick={() => {
              showEditModal();
              console.log("editando");
            } }>Editar perfil</button>

            </div>
            <div className='second-line'>
              <span>{}Publicaciones</span>
              <span>{user.followersCount}{' '}Seguidores</span>
              <span>{user.followedCount}{' '}Seguidos</span>

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