import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ProfileContext } from "../../Profile";
import { FollowButtonModal } from "../FollowButton/FollowButtonModal";
import { Avatar, Button, Modal, List, ConfigProvider } from "antd";
import { CaretDownFilled } from "@ant-design/icons";

export const FollowedModal = () => {
  const { userData } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} type='secondary'>
        <span style={{ display: "flex", alignItems: "center" }}>
          {userData?.followedCount} followed{" "}
          <CaretDownFilled style={{ color: "#1777FF" }} />
        </span>
      </Button>
      <Modal
        title='Followed'
        open={isOpen}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key='close' onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <ConfigProvider renderEmpty={() => <span>No data</span>}>
          <List
            split={true}
            dataSource={userData?.followed}
            renderItem={(followed) => (
              <div
                key={followed._id}
                style={{
                  display: "flex",
                  boxSizing: "border-box",
                  padding: "5px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #efefef",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    gap: "5px",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    navigate(`/profile/${followed._id}`);
                    setOpen(false);
                  }}
                >
                  <Avatar
                    size={50}
                    src={
                      followed.avatar ||
                      "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
                    }
                    alt={followed.firstName}
                  />
                  <Button
                    size='small'
                    type='secondary'
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#598aa8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      padding: "0 9px 2px 5px ",
                    }}
                  >
                    <span>{followed.firstName}</span>
                  </Button>
                </div>
                <FollowButtonModal userId={followed._id} />
              </div>
            )}
          />
        </ConfigProvider>
      </Modal>
    </>
  );
};
