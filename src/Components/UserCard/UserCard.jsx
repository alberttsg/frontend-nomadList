import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Modal } from 'antd';
import React, { useState } from 'react';
import { GlobalContext } from "../../context/UsersState";
import EditUser from "../../Components/EditUser/EditUser";
import { useNavigate } from 'react-router';
import './UserCard.scss';



const UserCard = () => {

    return (
 
      <div className='card-info-container'>
         <div className='left-avatar'><Avatar size={138}
            src={'https://img.freepik.com/vector-premium/lindo-retrato-hombres-pelo-largo-rubio-avatar-aislado-fondo-blanco_555467-2696.jpg?w=2000'}/>
            </div>
           <div className='right-info'>

            <div className='first-line'>
              <span>nombre</span>
              <button>siguiendo</button>
              <button>enviar mensaje</button>
            </div>
            <div className='second-line'>
              <span>publicaciones</span>
              <span>Seguidores</span>
              <span>seguidos</span>

            </div>
            <div className='third-line'>
              <span >Bio: </span>
              <span>oficio, beneificio edad</span>
            </div>

           </div>

       </div>
       
      
    );
};

export default UserCard;