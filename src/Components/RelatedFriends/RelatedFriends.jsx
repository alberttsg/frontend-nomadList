import { UsergroupAddOutlined } from '@ant-design/icons';
import { Affix, Button, Collapse } from 'antd';
import React from 'react';

const RelatedFriends = () => {
    return (
        <Affix
        offsetBottom={10}
        style={{ position: 'fixed', right: '20px', top: '83px', minWidth: '50px', borderRadius: '3rem',

    }}
      >
           <Collapse
        expandIconPosition={'left'}
        bordered={true}
        collapsible='icon'
        style={{ background: 'rgb(23,119,255, 0.6)', }}
      >
        <Collapse.Panel header={  <UsergroupAddOutlined />}>
        

        </Collapse.Panel>
        </Collapse>
        </Affix>
        
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
    );
};

export default RelatedFriends;