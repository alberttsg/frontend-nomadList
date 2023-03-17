import React from 'react';
import { List, ConfigProvider } from 'antd';
import './MessageBoard.scss';

export function MessageBoard(props) {
  const { events } = props;
  return (
    <ConfigProvider renderEmpty={() => <span>No messages</span>}>
      <List
        split={false}
        bordered={false}
        itemLayout='vertical'
        dataSource={events}
        renderItem={(event, index) => (
          <List.Item>
            <div key={index} className={event.type}>{event.value}</div>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}