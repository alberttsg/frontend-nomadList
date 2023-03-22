import UserCard from "../../Components/UserCard/UserCard";
import UsersPosts from "../../Components/UsersPosts/UsersPosts";
import "./Profile.scss";

export const Profile = () => {

  return (
    <div className='profile-container'>
      <UserCard />
      <UsersPosts />
    </div>
  );
};
