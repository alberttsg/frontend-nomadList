import { UserPosts } from './UserPosts';
import { Tabs, Row } from 'antd';
import { CommentOutlined, ThunderboltFilled } from "@ant-design/icons";

export function UserContent() {
  return (
    <Row style={{ padding: '0 20px', width: '100%', overflowY: 'scrolls' }} justify='center' align='middle'>
      <Tabs
        style={{ width: '100%' }}
        items={[
          {
            key: '1',
            label: <h3><ThunderboltFilled style={{ color: "#F0C311" }} />POSTS</h3>,
            children: <UserPosts />,
          },
          {
            key: '2',
            label: <h3><CommentOutlined />COMMENTS</h3>,
          },
        ]}
      />
    </Row>
  )
}