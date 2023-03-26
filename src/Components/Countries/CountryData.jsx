import React from 'react';
import { Progress, Row } from 'antd';
import './Countries.scss'

const CountryData = ({ country }) => {
    const getProgressColor = (percent) => {
        if (percent <= 30) {
          return '#FF4742';
      
        } else if (percent <= 70) {
          return '#FEC923';
        } else {
          return '#2DDD73';
        }
      };
    
      const getFormattedPercent = (percent) => {
        return percent.toFixed(1);
      };
    
      return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
           
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: '5px',
            // padding: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            height: '100%'
          }}>
            <div className='row-info-country'>
          <span>⭐️ Overall</span>
          <Progress 
          trailColor='#BEBEBE'
          strokeWidth={20}
          style={{width: '50%', borderRadius: '50%'}}
          strokeLinecap="round" 
            percent={Math.round((country.quality_of_life_index - 56) / (196 - 56) * 1000) / 10}
            strokeColor={getProgressColor(Math.round((country.quality_of_life_index - 56) / (196 - 56) * 100))}
            format={getFormattedPercent}
          />
          </div>
            <div className='row-info-country'>

          <span>👮 Security</span>
          <Progress
          trailColor='#BEBEBE'
          strokeWidth={20}
          style={{width: '50%'}}
          strokeLinecap='round'
            percent={Math.round((country.safety_index - 23) / (88 - 23) * 1000) / 10}
            strokeColor={getProgressColor(Math.round((country.safety_index - 23) / (88 - 23) * 100))}
            format={getFormattedPercent}
            />
            </div>
            <div className='row-info-country'>
          <span>💵 Cost </span>
          <Progress
          trailColor='#BEBEBE'
          strokeWidth={20}
          style={{width: '50%'}}
          strokeLinecap='round'
            percent={Math.round((country.cost_of_living_index - 22) / (122 - 22) * 1000) / 10}
            strokeColor={getProgressColor(Math.round((country.cost_of_living_index - 22) / (122 - 22) * 100))}
            format={getFormattedPercent}
          />
          </div>
        <div className='row-info-country'>
          <span>📡 Internet Price</span>
          <Progress
          trailColor='#BEBEBE'
          strokeWidth={20}
          style={{width: '50%'}}
          strokeLinecap='round'
            percent={Math.round((country.internet_price - 6) / (100 - 6) * 1000) / 10}
            strokeColor={getProgressColor(Math.round((country.internet_price - 6) / (100 - 6) * 100))}
            format={getFormattedPercent}
          />
          </div>
    <div className='row-info-country'>
          <span>🏥 Health </span>
          <Progress
          trailColor='#BEBEBE'
          strokeWidth={20}
          style={{width: '50%'}}
          strokeLinecap='round'
            percent={Math.round((country.health_care_index - 43) / (87 - 43) * 1000) / 10}
            strokeColor={getProgressColor(Math.round((country.health_care_index - 43) / (87 - 43) * 100))}
            format={getFormattedPercent}
          />
          </div>
    <div className='row-info-country'>
          <span>🏭 Pollution:</span>
          <Progress
          trailColor='#BEBEBE'
          strokeWidth={20}
          style={{width: '50%'}}
          strokeLinecap='round'
            percent={Math.round((country.pollution_index - 12) / (88 - 12) * 1000) / 10}
            strokeColor={getProgressColor(Math.round((country.pollution_index - 12) / (88 - 12) * 100))}
            format={getFormattedPercent}
          />
          </div>
        </div>
      );
};

export default CountryData;
