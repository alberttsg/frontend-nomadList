import { CheckCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, List, message, Modal, Row, Tooltip } from 'antd';
import { useToken } from 'antd/es/theme/internal';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/UsersState';
import { getCountries, toggleVisited} from '../../service/countryService';
import './Countries.scss';
import CountryData from './CountryData';

const Countries = () => {
    const { getUserInfo , user  } = useContext(GlobalContext);
    // const user = JSON.parse(localStorage.getItem('user'));
    // const [visited, setVisited] = useState(user?.visited?.some(e => e._id == country?._id))
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(user)
      getCountries().then(res => {
         setCountries(res)
        setLoading(false)
      }
      );

},[]);
const [modalVisible, setModalVisible] = useState(false);
const [hovered, setHovered] = useState(null);
const hideModal = () => {
    setModalVisible(false);
  };
  const showModal = () => {
    setModalVisible(true);
  };
const toggleVisit = (countryId) => {
  console.log('go to checked')
  console.log(countryId)
  console.log(user._id)
  const token = JSON.parse(localStorage.getItem('token'));
  console.log(token)

  toggleVisited(countryId).then(res => {
    console.log(res)
    setCountries(previousCountries =>{
      const updatedCountries = previousCountries.map(country => {
        if (country._id === res._id) {
          return res;
        } else {
          return country;
        }
      });
      return updatedCountries;
    })   
    getUserInfo()  
})
}
return (
    <div className='div-container'>
    
    <Divider/>
  <Row  style={{ marginBottom: '20px' }}>
    {loading === false && countries?.map((country) => { 
        return (
      <Col key={country.country}>
        <Card
        style={
            {
                maxWidth: '90%',
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
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '26px'}} onClick={ ()=>toggleVisit(country._id)}/>
          ) : (
            <PlusCircleTwoTone twoToneColor="lightgray" style={{fontSize: '26px'}} onClick={ ()=>toggleVisit(country._id)}/>
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