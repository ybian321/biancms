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

  //test1
  const currentPath = useRouter().pathname;
  console.log(currentPath);

  const menuItems1 = [
    { label: '/dashboard/manager', value: 'Overview', icon: '' },
    { label: '/dashboard/manager/students', value: 'Student List', icon: '' }
  ];

  //test2
  const menuItems2 = {
    '/dashboard/manager': 'Overview',
    '/dashboard/manager/students': 'Student List'
  };

  return (
    <div>
      <Menu theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={[currenNav]} mode="inline">
        {menuItems1.map((menuItem) => (
          //test1
          // console.log(`[1]`, menuItem.label)
          // console.log(`[1]`, menuItem.value)
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link href={menuItem.label}>{menuItem.value}</Link>
          </Menu.Item>
        ))}

        {/* {menuItems2.map((menuItem)=>{
          //test2
          console.log(`[2]`, menuItem.value)
        })} */}

        {Object.entries(menuItems2).forEach(
          //test2
          ([key, value]) => console.log(key, value)
          // <Menu.Item key="1" icon={<DashboardOutlined />}>
          //   <Link href={key}>{value}</Link>
          // </Menu.Item>
        )}

        {/* <Menu.Item key="1" icon={<DashboardOutlined />}>
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
        </Menu.Item> */}
      </Menu>
    </div>
  );
}

export default SiderNav;
