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

    const items = [
        { key: 'manager', path: '/dashboard/manager', title: 'Overview', icon: <DashboardOutlined /> },
        {
            key: 'student',
            title: 'Student',
            icon: <MailOutlined />,
            subNav: [{ key: 'students', path: '/dashboard/manager/students', title: 'Student List', icon: <TeamOutlined /> }]
        },
        {
            key: 'teacher',
            title: 'Teacher',
            icon: <DeploymentUnitOutlined />,
            subNav: [{ key: 'teachers', path: '/dashboard/manager/teachers', title: 'Teacher List', icon: <TeamOutlined /> }]
        },
        {
            key: 'courses',
            title: 'Courses',
            icon: <AppstoreOutlined />,
            subNav: [
                { key: 'all courses', path: '/dashboard/manager/courses', title: 'All Courses' },
                { key: 'edit course', path: '/dashboard/manager/courses/edit-course', title: 'Edit Course', icon: <EditOutlined /> }
            ]
        },
        { key: 'message', path: '/dashboard/manager/message', title: 'Message', icon: <DesktopOutlined /> }
    ];

    function setMenuItem(data: any) {
        return data.map((item: any) => {
            if (item.subNav) {
                return (
                    <SubMenu key={item.key} title={item.title} icon={item.icon}>
                        {setMenuItem(item.subNav)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link href={item.path}>{item.title}</Link>
                    </Menu.Item>
                );
            }
        });
    }

    return (
        <div>
            <Menu theme="dark" defaultSelectedKeys={[currenNav]} defaultOpenKeys={[currenNav]} mode="inline">
                {setMenuItem(items)}
            </Menu>
        </div>
    );
}

export default SiderNav;
