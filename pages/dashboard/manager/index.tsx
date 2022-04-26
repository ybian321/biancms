import { PageHeader } from 'antd';
import Dashboard from '../../../components/Dashboard';

export default function Manager() {
    const routes = [
        {
            path: '/dashboard/manager',
            breadcrumbName: 'CMS MANAGER SYSTEM'
        },
        {
            path: '',
            breadcrumbName: 'Overview'
        }
    ];

    return (
        <Dashboard>
            <PageHeader breadcrumb={{ routes }} style={{ margin: '16px 0' }} />
            <div className="site-layout-content">Manager Content</div>
        </Dashboard>
    );
}
