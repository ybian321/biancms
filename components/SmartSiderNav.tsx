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

interface SideNav {
   title: string;
   path: string;
   subNav?: SideNav[];
   icon: any;
}

function SiderNav() {
   const currentUrl = useRouter().asPath;
   const currenNav = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

   const items: SideNav[] = [
      { path: '/dashboard/manager', title: 'Overview', icon: <DashboardOutlined /> },
      {
         path: 'students',
         title: 'Student',
         icon: <MailOutlined />,
         subNav: [{ path: '/dashboard/manager/students', title: 'Student List', icon: <TeamOutlined /> }]
      },
      {
         path: 'teachers',
         title: 'Teacher',
         icon: <DeploymentUnitOutlined />,
         subNav: [{ path: '/dashboard/manager/teachers', title: 'Teacher List', icon: <TeamOutlined /> }]
      },
      {
         path: 'courses',
         title: 'Courses',
         icon: <AppstoreOutlined />,
         subNav: [
            { path: '/dashboard/manager/courses', title: 'All Courses', icon: <AppstoreOutlined /> },
            { path: '/dashboard/manager/courses/edit-course', title: 'Edit Course', icon: <EditOutlined /> }
         ]
      },
      { path: '/dashboard/manager/message', title: 'Message', icon: <DesktopOutlined /> }
   ];

   function setMenuItem(data: any) {
      return data.map((item: any) => {
         if (item.subNav) {
            return (
               <SubMenu key={item.path} title={item.title} icon={item.icon}>
                  {setMenuItem(item.subNav)}
               </SubMenu>
            );
         } else {
            return (
               <Menu.Item key={item.path} icon={item.icon}>
                  <Link href={item.path}>{item.title}</Link>
               </Menu.Item>
            );
         }
      });
   }

   return (
      <div>
         <Menu theme="dark" defaultSelectedKeys={[currentUrl]} defaultOpenKeys={[currenNav]} mode="inline">
            {setMenuItem(items)}
         </Menu>
      </div>
   );
}

export default SiderNav;
