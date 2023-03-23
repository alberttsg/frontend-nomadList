import { Button, Tooltip } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export function CollapseSiderButton(props) {
  const { handle, sider } = props;
  return (
    <Tooltip title={sider ? 'Expand menu' : 'Collapse menu'} placement='bottom'>
      <Button
        type='primary'
        onClick={handle}
      >
        {sider ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Tooltip>
  )
}