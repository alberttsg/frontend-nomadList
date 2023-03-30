import { UserPosts } from './UserPosts';
import { UserLikedPosts } from './UserLikedPosts';
import { UserComments } from './UserComments';
import { UserFollowedPosts } from './UserFollowedPosts';
import { Tabs, Row } from 'antd';
import { CommentOutlined, ThunderboltFilled, HeartTwoTone, StarTwoTone } from '@ant-design/icons';

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
          // {
          //   key: '2',
          //   label: <div style={{ padding: ' 0 10px ' }}><h3 ><CommentOutlined style={{ color: 'rgb(152,2,154,0.8)' }} />COMMENTS</h3></div>,
          //   forceRender: true,
          //   children: <UserComments />
          // },
          {
            key: '3',
            label: <div style={{ padding: ' 0 10px ' }}><h3 ><HeartTwoTone twoToneColor={'#F70000'}
            />LIKED POSTS</h3></div>,
            forceRender: true,
            children: <UserLikedPosts />
          },
          {
            key: '4',
            label: <div style={{ padding: ' 0 10px ' }}><h3 ><StarTwoTone twoToneColor={'yellow'} style={{ fontSize: '20px' }} />FOLLOWED</h3></div>,
            forceRender: true,
            children: <UserFollowedPosts />
          },
        ]}
      />
    </Row>
  )
}