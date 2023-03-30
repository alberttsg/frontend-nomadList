import { CheckCircleTwoTone, PlusCircleTwoTone, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ToggleIconCountries = ({country, user, toggleVisit}) => {
const [toggleVisitStatus, setToggleVisitStatus] = useState();
const navigate = useNavigate();
const isVisited =() =>{
 
        const userVisited = user.visited
    const visited = userVisited.some(e => e._id === country._id);
    setToggleVisitStatus(visited);
    
}
useEffect(() => {
isVisited()
},[])
const handleClick = () => {
    toggleVisit(country._id)
    setToggleVisitStatus(!toggleVisitStatus)
}
    return (
   
        <Card.Meta
                   
        key={country._id}
        title={
          <Space direction='horizontal' align='baseline'>
            <span style={{ fontSize: "18px", marginLeft: '0px'}}>
              {country.country}
            </span>
            {toggleVisitStatus ? (
              <CheckCircleTwoTone
                twoToneColor='#52c41a'
                style={{ fontSize: "20px" ,}}
                onClick={ handleClick}
              />
            ) : (
              <PlusCircleTwoTone
                twoToneColor='lightgray'
                style={{ fontSize: "20px" }}
                onClick={handleClick}
              />
            )}
          </Space>
        }
        avatar={
          <Avatar.Group
            maxCount={2}
            size='small'
            maxStyle={{
              // gap: '100px',
              overflowX:'auto',
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              cursor: "pointer",
            }}
           
          > 
          <>
         
            {country?.visitors.map((visitorAvatar, index) => (
              <span
              
              key={visitorAvatar._id + index}
              >
                <Tooltip
                  title={visitorAvatar.firstName}
                  placement='top'
                  >
                  <Avatar
                  onClick={() => {
                    navigate(`/profile/${visitorAvatar._id}`);
                  }}
                    key={visitorAvatar._id + index}
                    src={visitorAvatar.avatar || <UserOutlined />}
                    />
                </Tooltip>
              </span>
            ))}
            </>
          </Avatar.Group>
        }
      />
    );
};

export default ToggleIconCountries;