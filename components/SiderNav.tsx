import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import {
  AppstoreOutlined,
  DashboardOutlined,
  TeamOutlined,
  DesktopOutlined,
  MailOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
} from '@ant-design/icons'

function SiderNav() {
  return (
    <div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Overview
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Student">
          <Menu.Item key="2" icon={<TeamOutlined />}>
            Student List
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<DeploymentUnitOutlined />} title="Teacher">
          <Menu.Item key="3" icon={<TeamOutlined />}>
            Teacher List
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Course">
          <Menu.Item key="4">All Course</Menu.Item>
          <Menu.Item key="5">Add Course</Menu.Item>
          <Menu.Item key="6" icon={<EditOutlined />}>
            Edit Course
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="7" icon={<DesktopOutlined />}>
          Message
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default SiderNav
