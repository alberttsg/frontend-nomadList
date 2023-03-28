import { CheckCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Space,
  List,
  Modal,
  Row,
  Tooltip,
  Skeleton,
  Spin,
  Divider,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/UsersState";
import { getCountries, toggleVisited } from "../../service/countryService";
import CountryData from "./CountryData";

const Countries = () => {
  const { getUserInfo, user } = useContext(GlobalContext);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCountries().then((res) => {
      setCountries(res);
      setLoading(false);
    });
  }, []);

  const toggleVisit = (countryId) => {
    toggleVisited(countryId).then((res) => {
      setCountries((previousCountries) =>
        previousCountries.map((country) => {
          if (country._id === res._id) {
            return res;
          } else {
            return country;
          }
        })
      );
    });
    getUserInfo();
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            margin: "25px",
            width: "90%",
          }}
        >
          <Skeleton
            round={true}
            avatar
            paragraph={{
              rows: 10,
            }}
            active
          />
          <Divider />
          <Skeleton
            round={true}
            avatar
            paragraph={{
              rows: 10,
            }}
            active
          />
          <Divider />
          <Skeleton
            round={true}
            avatar
            paragraph={{
              rows: 10,
            }}
            active
          />
          <Divider />
          <Skeleton
            round={true}
            avatar
            paragraph={{
              rows: 10,
            }}
            active
          />
        </div>
      ) : (
        <Row
          gutter={[16, 16]}
          justify='space-evenly'
          style={{ padding: "10px", margin: 0 }}
        >
          {!loading &&
            countries?.map((country) => {
              return (
                <Col
                  key={country.country}
                  xs={{ span: 24 }}
                  lg={{ span: 8 }}
                  xl={{ span: 6 }}
                >
                  <Card
                    hoverable
                    cover={
                      <div
                        style={{
                          backgroundImage: `url(${country.image})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          aspectRatio: 1,
                          borderRadius: "5px",
                        }}
                        onMouseEnter={() => setHovered(country)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {hovered === country && (
                          <CountryData country={country} />
                        )}
                      </div>
                    }
                  >
                    <Card.Meta
                      key={country._id}
                      title={
                        <Space direction='horizontal' align='baseline'>
                          <span style={{ fontSize: "18px" }}>
                            {country.country}
                          </span>
                          {user?.visited?.some(
                            (user) => user._id === country._id
                          ) ? (
                            <CheckCircleTwoTone
                              twoToneColor='#52c41a'
                              style={{ fontSize: "22px" }}
                              onClick={() => toggleVisit(country._id)}
                            />
                          ) : (
                            <PlusCircleTwoTone
                              twoToneColor='lightgray'
                              style={{ fontSize: "22px" }}
                              onClick={() => toggleVisit(country._id)}
                            />
                          )}
                        </Space>
                      }
                      avatar={
                        <Avatar.Group
                          maxCount={1}
                          onMaxPopoverVisibleChange={() =>
                            setModalVisible(true)
                          }
                          maxPopoverTrigger='click'
                          size='small'
                          maxStyle={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                            cursor: "pointer",
                          }}
                        >
                          {country?.visitors.map((visitorAvatar, index) => (
                            <span key={visitorAvatar._id + index}>
                              <Tooltip
                                title={visitorAvatar.firstName}
                                placement='top'
                              >
                                <Avatar
                                  key={visitorAvatar._id + index}
                                  src={visitorAvatar.avatar || <UserOutlined />}
                                />
                              </Tooltip>
                            </span>
                          ))}
                        </Avatar.Group>
                      }
                    />
                  </Card>

                  <Modal
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                  >
                    <List
                      dataSource={country.visitors}
                      renderItem={(visitor) => (
                        <List.Item>
                          <List.Item.Meta
                            title={visitor.firstName}
                            avatar={
                              <Tooltip
                                title={visitor.firstName}
                                placement='top'
                              >
                                <Avatar
                                  src={visitor.avatar || <UserOutlined />}
                                />
                              </Tooltip>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Modal>
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default Countries;
