import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatProvider';
import { Modal, Input, Button, List, Avatar, ConfigProvider, Tooltip } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

export function ContactsFinder(props) {
  const { open, onOk, onCancel } = props;
  const { addContact, removeContact, searchResult, search } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);

  const searchUsers = async (input) => {
    if (!input) return;
    setIsLoading(true);
    await search(input);
    setIsLoading(false);
  };

  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel} closable={false}>
      <Input.Search
        loading={isLoading}
        disabled={isLoading}
        enterButton='Search'
        size='big'
        placeholder='Search contacts'
        onSearch={(input) => searchUsers(input)}
      />
      <ConfigProvider renderEmpty={() => <p>No results.</p>}>
        <List
          style={{ marginTop: '10px', maxHeight: '200px', overflowY: 'auto' }}
          split={true}
          itemLayout='vertical'
          dataSource={searchResult}
          loading={isLoading}
          bordered={true}
          renderItem={(item) => (
            <List.Item style={{ padding: '5px 0' }}>
              <Avatar src={item.avatar} size='small' style={{ marginLeft: '10px' }} />
              <span style={{ paddingLeft: '10px' }}>{item.displayName}</span>
              {item.added ?
                <Tooltip title='Delete contact' placement='left'>
                  <Button
                    size='small'
                    shape='circle'
                    icon={<MinusCircleOutlined />}
                    onClick={() => removeContact(item._id)}
                    style={{ position: 'absolute', right: '10px' }}
                  />
                </Tooltip>
                :
                <Tooltip title='Add contact' placement='left'>
                  <Button
                    size='small'
                    shape='circle'
                    icon={<PlusCircleOutlined />}
                    onClick={() => addContact(item._id)}
                    style={{ position: 'absolute', right: '10px' }}
                  />
                </Tooltip>
              }
            </List.Item>
          )}
        />
      </ConfigProvider>
    </Modal>
  )
}