import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
  AppstoreOutlined,
  DashboardOutlined,
  TeamOutlined,
  DesktopOutlined,
  MailOutlined,
  DeploymentUnitOutlined,
  EditOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SiderNav() {
  const currentUrl = useRouter().asPath;
  const currenNav = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

  return (
    <div>
      <Menu theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={[currenNav]} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link href="/dashboard/manager">Overview</Link>
        </Menu.Item>

        <SubMenu key="students" icon={<MailOutlined />} title="Student">
          <Menu.Item key="2" icon={<TeamOutlined />}>
            <Link href="/dashboard/manager/students">Student List</Link>
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
  );
}

export default SiderNav;
