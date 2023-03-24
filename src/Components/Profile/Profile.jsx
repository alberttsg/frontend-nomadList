import { Divider } from "antd";
import UserCard from "../UserCard/UserCard";
import UsersPosts from "../UsersPosts/UsersPosts";
import "./Profile.scss";

export const Profile = () => {
  
  return (
    <div className='profile-container'>
      <UserCard/>
      <Divider plain/>
      <UsersPosts/>
    </div>
  );
};
