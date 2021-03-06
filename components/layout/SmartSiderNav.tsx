import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
   DashboardOutlined,
   TeamOutlined,
   SolutionOutlined,
   DeploymentUnitOutlined,
   EditOutlined,
   ReadOutlined,
   MessageOutlined,
   ProjectOutlined,
   FileAddOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SideNav {
   title: string;
   path: string;
   subNav?: SideNav[];
   icon: any;
}

export default function SiderNav() {
   const currentUrl = useRouter().pathname;
   const currenNav = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

   const items: SideNav[] = [
      { path: '/dashboard/manager', title: 'Overview', icon: DashboardOutlined },
      {
         path: 'students',
         title: 'Student',
         icon: SolutionOutlined,
         subNav: [{ path: '/dashboard/manager/students', title: 'Student List', icon: TeamOutlined }]
      },
      {
         path: 'teachers',
         title: 'Teacher',
         icon: DeploymentUnitOutlined,
         subNav: [{ path: '/dashboard/manager/teachers', title: 'Teacher List', icon: TeamOutlined }]
      },
      {
         path: 'courses',
         title: 'Courses',
         icon: ReadOutlined,
         subNav: [
            { path: '/dashboard/manager/courses', title: 'All Courses', icon: ProjectOutlined },
            { path: '/dashboard/manager/courses/add-course', title: 'Add Course', icon: FileAddOutlined },
            { path: '/dashboard/manager/courses/edit-course', title: 'Edit Course', icon: EditOutlined }
         ]
      },
      { path: '/dashboard/manager/message', title: 'Message', icon: MessageOutlined }
   ];

   function setMenuItem(data: SideNav[]) {
      return data.map((item) => {
         if (item.subNav) {
            return (
               <SubMenu key={item.path} title={item.title} icon={<item.icon />}>
                  {setMenuItem(item.subNav)}
               </SubMenu>
            );
         } else {
            return (
               <Menu.Item key={item.path} icon={<item.icon />}>
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
