import { useContext, useEffect, useState, createContext } from "react";
import { useParams, useNavigate } from "react-router";
import { GlobalContext } from "../../context/UsersState";
import { UserCard } from "./components/UserCard/UserCard";
import { UserContent } from "./components/UserContent/UserContent";
import { getUserById } from "../../service/userService";
import CountryUser from "./components/CountryUser/CountryUser";
import { Spin, Row, Divider, Skeleton } from "antd";

export const ProfileContext = createContext();

export const Profile = () => {
  const { user } = useContext(GlobalContext);
  const { userId } = useParams();
  const [userData, setUserData] = useState();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (!userId) return navigate("/profile/" + user._id);
      const response = await getUserById(userId);
      if (!response) return navigate("/home");
      setUserData(response);
      setLoading(false);
    }
    getData();
  }, [userId]);

  return (
    <ProfileContext.Provider value={{ userData, setUserData }}>
      <Skeleton style={{
        padding: '50px',
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: '100%'
      }}  paragraph={{
        rows: 20,
     
      }} size={'small'} avatar loading={isLoading}>
       
        <Row>

          <UserCard />
        </Row>

        <Row>
          <CountryUser />
        </Row>
       

        <Row>
          <UserContent />
        </Row>
      </Skeleton>
    </ProfileContext.Provider>
  );
};
