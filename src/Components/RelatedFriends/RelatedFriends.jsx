import { UsergroupAddOutlined } from "@ant-design/icons";
import { Affix, Avatar, Card, Col, Collapse, List, Row, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../../context/UsersState";
import { recomendation } from "../../service/userService";
import './RelatedFriends.scss';

const RelatedFriends = () => {

    // return (
    //     <Affix
    //     offsetBottom={10}
    //     style={{ position: 'fixed', right: '20px', top: '83px', minWidth: '50px', borderRadius: '3rem',

    // }}
    //   >
    //        <Collapse
    //     expandIconPosition={'left'}
    //     bordered={true}
    //     collapsible='icon'
    //     style={{ background: 'rgb(23,119,255, 0.6)', }}
    //   >
    //     <Collapse.Panel header={  <UsergroupAddOutlined />}>

    //     </Collapse.Panel>
    //     </Collapse>
    //     </Affix>

        // <Button type="primary" style={{
        //     position: 'absolute',
        //     right: '20px',
        //     top: '82px',
        //     zIndex: 10,
        //     borderRadius: '3rem',
        //     background: 'rgb(23,119,255, 0.6)',
        //     border: '1px solid rgb(23,119,255',
        //     // padding: '1rem',
        //   }}>
        //     <UsergroupAddOutlined />
        //   </Button>
      //)

  const { user } = useContext(GlobalContext);
  const [relatedFriends, setRelatedFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    recomendation(user._id).then((data) => {
        console.log('dentro',data)
      setRelatedFriends(data);
      setLoading(false);
    });
  }, [user]);
  return (
<div className='relatedFriends' >
    <Affix
      style={{ position: 'fixed', right: '60px', top: '83px', minWidth: '100px' }}
    >
      <Card title='Sugerencias de amistad' style={{ textAlign: 'center', width: '400px', marginTop: '10', WebkitBoxShadow: '-15px -4px 43px 0px rgba(214,214,214,1)', MozBoxShadow: '-15px -4px 43px 0px rgba(214,214,214,1)', boxShadow: '-15px -4px 43px 0px rgba(214,214,214,1)' }}>
        <Row align='center' gutter={0} justify='center' wrap={false} style={{ width: '100%', height: '100%' }}>
          <Col flex='1 1 40%' style={{ overflowY: 'auto' }}>
            <Skeleton size='large' loading={loading} active>
              <List
                dataSource={relatedFriends}
                renderItem={(friend) =>
                  <ul className="list-friends-suggestions" style={{ borderBottom: '0.5px solid rgba(239,239,239)', cursor: 'pointer', display: 'flex', justifyContent: 'start', flexDirection: 'row', alignItems: 'start', padding: '5px', margin: '10px', height: '100%', width: '90%' }} key={friend?._id} onClick={() => {
                    navigate(`/profile/${friend?._id}`)
                  }}>
                    <Avatar style={{ border: '0.5px solid gray' }} size={50} src={friend?.avatar || 'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'} alt={friend?.firstName} />
                    <h4 style={{ textTransform: 'capitalize', cursor: 'pointer', padding: '10px', fontSize: '15px', color: 'rgb(89,138,168)' }}>{friend?.firstName}</h4>
                  </ul>
                }
              />
            </Skeleton>
          </Col>
        </Row>
      </Card>
    </Affix>
  </div>
  );

};

export default RelatedFriends;
