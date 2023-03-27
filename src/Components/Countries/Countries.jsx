import { CheckCircleTwoTone, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, List, Modal, Row, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/UsersState';
import { getCountries } from '../../service/countryService';

import Visited from './components/Visited';
import './Countries.scss';
import CountryData from './CountryData';

const Countries = () => {
    // const { getUserInfo , user  } = useContext(GlobalContext);
    const user = JSON.parse(localStorage.getItem('user'));
    // const [visited, setVisited] = useState(user?.visited?.some(e => e._id == country?._id))
    const [countries, setCountries] = useState([]);

    useEffect(() => {
      
       console.log(user)
    async function bringcountries() {

        const res = await getCountries();
        setCountries(res);
        console.log(countries);
       
    }
    bringcountries();
},[]);
const [modalVisible, setModalVisible] = useState(false);
const [hovered, setHovered] = useState(null);
const hideModal = () => {
    setModalVisible(false);
  };
  const showModal = () => {
    setModalVisible(true);
  };
//   useEffect(()=>{
//     const visitedStatus = user?.visited?.some(e => e._id == country?._id);
//     setVisited(visitedStatus);
//   },[user])
return (
    <div className='div-container'>
    
    <Divider/>
  <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
    {countries.map((country) => {

        
        return (
      <Col key={country.country}>
        <Card
        style={
            {
                width: '350px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
            }
        }
          cover={
            <div
              style={{
                backgroundImage: `url(${country.image})`,
                height: '250px',
                width: '100%',
                borderRadius: '5px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                position: 'relative',
              }}
              onMouseEnter={() => setHovered(country)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === country && (
                <CountryData country={country}/>
              )}
            </div>
          }
          hoverable
        
        >
            <Modal open={modalVisible} onCancel={hideModal}>
  <List
    dataSource={country.visitors}
    renderItem={visitor => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Tooltip title={visitor.firstName} placement="top">
              <Avatar src={visitor.avatar || <UserOutlined />} />
            </Tooltip>
          }
          title={visitor.firstName}
        />
      </List.Item>
    )}
  />
</Modal>

          <Card.Meta key={country._id}
            title={
            <span style={
                {display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                >
                    {country.country }
                    { user?.visited?.some((v) => v._id === country._id) ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '26px'}}/>
          ) : (
            <Visited />
          )}
                

            </span>
            }
           
            avatar={<Avatar.Group
            maxCount={1}
            onMaxPopoverVisibleChange={showModal}
            maxPopoverTrigger="click"
            size="small"
            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
          >
            {country?.visitors.map((visitorAvatar, index) => (
                < span key={visitorAvatar._id + index} >
            <Tooltip title={visitorAvatar.firstName} placement="top">
            <Avatar key={visitorAvatar._id + index} src={ visitorAvatar.avatar || <UserOutlined/>}/>
            </Tooltip>
                </span >

))}
          </Avatar.Group>}
            
          />
        </Card>
      </Col>
    )})}
  </Row>
  </div>
);
};

export default Countries;