import { Card, Col, Divider, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCountries } from '../../service/countryService';
import './Countries.scss';
import CountryData from './CountryData';

const Countries = () => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
    async function bringcountries() {
        const res = await getCountries();
        setCountries(res);
        console.log(countries);
    }
    bringcountries();
},[]);
const [hovered, setHovered] = useState(null);

return (
    <>
    
    <Divider/>
  <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
    {countries.map((country) => (
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
          <Card.Meta 
          title={country.country}
        //   description={country.visitors}
          />
        </Card>
      </Col>
    ))}
  </Row>
  </>
);
};

export default Countries;