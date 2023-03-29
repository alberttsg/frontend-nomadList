import { GlobalOutlined } from "@ant-design/icons";
import {
  Avatar,
  Descriptions,
  Divider,
  Modal,
  Progress,


} from "antd";
import Meta from "antd/es/card/Meta";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/UsersState";
import CountryData from "../../../Countries/CountryData";
import { ProfileContext } from "../../Profile";

const CountryUser = () => {
  const { userData, setUserData } = useContext(ProfileContext);
  const { getUserInfo } = useContext(GlobalContext);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const mostrarModal = (country) => {
    setSelectedCountry(country);
  };
  const getProgressColor = (percent) => {
    if (percent <= 30) {
      return "#FF4742";
    } else if (percent <= 70) {
      return "#FEC923";
    } else {
      return "#2DDD73";
    }
  };

  const getFormattedPercent = (percent) => {
    return percent.toFixed(1);
  };
  const styles = {
    border: '1.3px solid black',
    boxShadow: `0 0 0 3px #fff, 0 0 0 2px #ccc}`,
    margin: "18px",
  };

  return (
    <>
      <Divider plain />
      <Descriptions  title={<><GlobalOutlined /> <span style={{padding: '5px'}}>Countries Visited</span></> } style={{textAlign: 'center', width: '100%'}}/>
      <div style={{ boxSizing: 'border-box', margin: "20px", display: "flex",overflowX: "auto" }}>
      
         {userData?.visited?.map((country) => (
          <div
            key={country._id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              margin: "10px",
            }}
            onClick={() => mostrarModal(country)}
          >
            <Avatar
              style={
               styles
              }
              size={90}
              src={country.image}
            />
            <h3 className='avatar-name'>{country.country}</h3>
            {/* <Divider plain={'true'}/> */}
            
          </div>
        ))}
        
      </div>
      {selectedCountry && (
        <Modal
          open={!!selectedCountry}
          onCancel={() => setSelectedCountry(null)}
          onOk={() => setSelectedCountry(null)}
          width='50%'
          height='70%'
          footer={null}
          title={selectedCountry.country}
        >
           
            
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${selectedCountry.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "40px",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.7)",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "90%",
                height: "100%",
              }}
            >
              <div className='row-info-country'>
                <span 
                style={{fontSize: "20px", fontWeight: "bold", color: "white"}}
                >⭐️ Life Quality</span>
                <Progress
                  trailColor='#BEBEBE'
                  strokeWidth={20}
                  style={{ width: "50%", borderRadius: "50%" }}
                  strokeLinecap='round'
                  percent={
                    Math.round(
                      ((selectedCountry.quality_of_life_index - 56) /
                        (196 - 56)) *
                        1000
                    ) / 10
                  }
                  strokeColor={getProgressColor(
                    Math.round(
                      ((selectedCountry.quality_of_life_index - 56) /
                        (196 - 56)) *
                        100
                    )
                  )}
                  format={getFormattedPercent}
                />
              </div>
              <div className='row-info-country'>
                <span style={{fontSize: "20px", fontWeight: "bold", color: "white"}}>👮 Security</span>
                <Progress
                  trailColor='#BEBEBE'
                  strokeWidth={20}
                  style={{ width: "50%" }}
                  strokeLinecap='round'
                  percent={
                    Math.round(
                      ((selectedCountry.safety_index - 23) / (88 - 23)) * 1000
                    ) / 10
                  }
                  strokeColor={getProgressColor(
                    Math.round(
                      ((selectedCountry.safety_index - 23) / (88 - 23)) * 100
                    )
                  )}
                  format={getFormattedPercent}
                />
              </div>
              <div className='row-info-country'>
                <span style={{fontSize: "20px", fontWeight: "bold", color: "white"}}>💵 Cost </span>
                <Progress
                  trailColor='#BEBEBE'
                  strokeWidth={20}
                  style={{ width: "50%" }}
                  strokeLinecap='round'
                  percent={
                    Math.round(
                      ((selectedCountry.cost_of_living_index - 22) /
                        (122 - 22)) *
                        1000
                    ) / 10
                  }
                  strokeColor={getProgressColor(
                    Math.round(
                      ((selectedCountry.cost_of_living_index - 22) /
                        (122 - 22)) *
                        100
                    )
                  )}
                  format={getFormattedPercent}
                />
              </div>
              <div className='row-info-country'>
                <span style={{fontSize: "20px", fontWeight: "bold", color: "white"}}>📡 Internet Price</span>
                <Progress
                  trailColor='#BEBEBE'
                  strokeWidth={20}
                  style={{ width: "50%" }}
                  strokeLinecap='round'
                  percent={
                    Math.round(
                      ((selectedCountry.internet_price - 6) / (100 - 6)) * 1000
                    ) / 10
                  }
                  strokeColor={getProgressColor(
                    Math.round(
                      ((selectedCountry.internet_price - 6) / (100 - 6)) * 100
                    )
                  )}
                  format={getFormattedPercent}
                />
              </div>
              <div className='row-info-country'>
                <span style={{fontSize: "20px", fontWeight: "bold", color: "white"}}>🏥 Health </span>
                <Progress
                  trailColor='#BEBEBE'
                  strokeWidth={20}
                  style={{ width: "50%" }}
                  strokeLinecap='round'
                  percent={
                    Math.round(
                      ((selectedCountry.health_care_index - 43) / (87 - 43)) *
                        1000
                    ) / 10
                  }
                  strokeColor={getProgressColor(
                    Math.round(
                      ((selectedCountry.health_care_index - 43) / (87 - 43)) *
                        100
                    )
                  )}
                  format={getFormattedPercent}
                />
              </div>
              <div className='row-info-country'>
                <span style={{fontSize: "20px", fontWeight: "bold", color: "white" }}>🏭 Pollution:</span>
                <Progress
                  trailColor='#BEBEBE'
                  strokeWidth={20}
                  style={{ width: "50%" }}
                  strokeLinecap='round'
                  percent={
                    Math.round(
                      ((selectedCountry.pollution_index - 12) / (88 - 12)) *
                        1000
                    ) / 10
                  }
                  strokeColor={getProgressColor(
                    Math.round(
                      ((selectedCountry.pollution_index - 12) / (88 - 12)) * 100
                    )
                  )}
                  format={getFormattedPercent}
                />
              </div>
            </div>
            {/* <p style={{fontSize: '22px'}}>{selectedCountry.country}</p> */}
          </div>
        </Modal>
      )}
    </>
  );
};

export default CountryUser;

{
  /* <div style={{ padding: "5px", display: "flex", overflowX: "scroll" }}>
  {user.visited.map((country) => (
    <div
      key={country._id}
      style={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
      }}
      onClick={() => mostrarModal(country)}
    >
      <Avatar size={100} src={country.image} />
      <p className='avatar-name'>{country.country}</p>
    </div>
  ))}
</div>; */
}
