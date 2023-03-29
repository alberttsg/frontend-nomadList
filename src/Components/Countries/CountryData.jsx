import React from 'react';
import { Progress, Row, Col } from 'antd';
import './Countries.scss'

const CountryData = ({ country }) => {
  const getProgressColor = (percent) => {
    if (percent <= 30) { return '#FF4742' }
    else if (percent <= 70) { return '#FEC923' }
    else { return '#2DDD73' }
  };

  const getFormattedPercent = (percent) => percent.toFixed(1);

  const ProgressBar = ({ input }) => (
    <Progress
      trailColor='#BEBEBE'
      strokeWidth={20}
      strokeLinecap='round'
      percent={Math.round((input - 23) / (88 - 23) * 1000) / 10}
      strokeColor={getProgressColor(Math.round((input - 23) / (88 - 23) * 100))}
      format={getFormattedPercent}
      className='white-progress-text'
    />
  )

  return (
    <Col style={{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      aspectRatio: 1,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 1,
      padding: '15px',
      paddingTop: '50px',

     
    }}>
      <Row justify='space-between' wrap={false}>
        <Col style={{ flex: '1 0 auto' }}><span>⭐️ Overall</span></Col>
        <Col style={{ flex: '0 0 50%' }}>
          <ProgressBar input={country.quality_of_life_index} />
        </Col>
      </Row>
      <Row justify='space-between' wrap={false}>
        <Col style={{ flex: '1 0 auto' }}><span>👮 Security</span></Col>
        <Col style={{ flex: '0 0 50%' }}><ProgressBar input={country.safety_index} /></Col>
      </Row>
      <Row justify='space-between' wrap={false}>
        <Col style={{ flex: '1 0 auto' }}><span>💵 Cost </span></Col>
        <Col style={{ flex: '0 0 50%' }}><ProgressBar input={country.cost_of_living_index} /></Col>
      </Row>
      <Row justify='space-between' wrap={false}>
        <Col style={{ flex: '1 0 auto' }}><span>📡 Internet Price</span></Col>
        <Col style={{ flex: '0 0 50%' }}><ProgressBar input={country.internet_price} /></Col>
      </Row>
      <Row justify='space-between' wrap={false}>
        <Col style={{ flex: '1 0 auto' }}><span>🏥 Health </span></Col>
        <Col style={{ flex: '0 0 50%' }}><ProgressBar input={country.health_care_index} /></Col>
      </Row>
      <Row justify='space-between' wrap={false}>
        <Col style={{ flex: '1 0 auto' }}><span>🏭 Pollution:</span></Col>
        <Col style={{ flex: '0 0 50%' }}><ProgressBar input={country.pollution_index} /></Col>
      </Row>
    </Col>
  );
};

export default CountryData;
