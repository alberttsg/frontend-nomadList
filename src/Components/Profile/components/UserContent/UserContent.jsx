import { UserPosts } from './UserPosts';
import { UserLikedPosts } from './UserLikedPosts';
import { Tabs, Row } from 'antd';
import { CommentOutlined, ThunderboltFilled, HeartTwoTone } from '@ant-design/icons';

export function UserContent() {
  return (
    <Row style={{ width: '100%' }} justify='center' align='middle'>
      <Tabs
        style={{ width: '90%' }}
        tabBarGutter={10}
        items={[
          {
            key: '1',
            label: <div><h3><ThunderboltFilled style={{ color: '#F0C311' }} />POSTS</h3></div>,
            forceRender: true,
            children: <UserPosts />,
          },
          {
            key: '2',
            label: <div style={{ padding: ' 0 10px ' }}><h3 ><CommentOutlined style={{ color: 'rgb(152,2,154,0.8)' }} />COMMENTS</h3></div>,
            forceRender: true,
          },
          {
            key: '3',
            label: <div style={{ padding: ' 0 10px ' }}><h3 ><HeartTwoTone twoToneColor={'#F70000'}
            />LIKED POSTS</h3></div>,
            forceRender: true,
            children: <UserLikedPosts />
          },
        ]}
      />
    </Row>
  )
}