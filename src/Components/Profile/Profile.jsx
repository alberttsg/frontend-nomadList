import {
  DeleteTwoTone,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  PlusCircleTwoTone,
  ThunderboltFilled,
} from "@ant-design/icons";
import { Card, Avatar, Modal, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GlobalContext } from "../../context/UsersState";

import Post from '../Post/Post'
import UserCard from "../UserCard/UserCard";
import UsersPosts from "../UsersPosts/UsersPosts";
import "./Profile.scss";


export const Profile = () => {
  
  return (
    <div className='profile-container'>
      <UserCard/>
      <UsersPosts/>
    </div>
  );
};
