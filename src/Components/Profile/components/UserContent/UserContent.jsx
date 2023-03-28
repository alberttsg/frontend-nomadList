import { UserPosts } from './UserPosts';
import { Tabs, Row } from 'antd';
import { CommentOutlined, ThunderboltFilled } from "@ant-design/icons";

export function UserContent() {
  return (
    <Row style={{ width: '100%' }} justify='center' align='middle'>
      <Tabs
        style={{ width: '90%' }}
        tabBarGutter={10}
        items={[
          {
            key: '1',
            label:<div><h3><ThunderboltFilled style={{ color: "#F0C311" }} />POSTS</h3></div>,
            children: <UserPosts />,
            forceRender: true,
          },
          {
            key: '2',
            label: <div style={{ padding: ' 0 10px ' }}><h3 ><CommentOutlined style={{ color: "rgb(152,2,154,0.8)"}}  />COMMENTS</h3></div>,
            forceRender: true,
          },
        ]}
      />

    </Row>
  )
}