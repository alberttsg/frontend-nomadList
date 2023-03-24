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
