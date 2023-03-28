import { UserPosts } from './UserPosts';
import { Tabs, Row } from 'antd';
import { CommentOutlined, ThunderboltFilled } from "@ant-design/icons";

export function UserContent() {
  return (
    <Row style={{ width: '100%' }} justify='center' align='middle'>
      <Tabs
        style={{ width: '100%' }}
        tabBarGutter={10}
        items={[
          {
            key: '1',
            label: <h3><ThunderboltFilled style={{ color: "#F0C311" }} />POSTS</h3>,
            children: <UserPosts />,
            forceRender: true,
          },
          {
            key: '2',
            label: <h3><CommentOutlined />COMMENTS</h3>,
            forceRender: true,
          },
        ]}
      />
    </Row>
  )
}