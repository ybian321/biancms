import { PageHeader } from 'antd'
import Dashboard from '../../../../components/Dashboard'
import StudentsTable from '../../../../components/StudentsTable'

export default function Student() {
  const routes = [
    {
      path: '/dashboard/manager',
      breadcrumbName: 'CMS MANAGER SYSTEM',
    },
    {
      path: '',
      breadcrumbName: 'Overview',
    },
    {
      path: '/dashboard/manager/students',
      breadcrumbName: 'Student List',
    },
  ]

  return (
    <Dashboard>
      <PageHeader breadcrumb={{ routes }} style={{ margin: '10px 0' }} />

      <div className="site-layout-content">
        <StudentsTable />
      </div>
    </Dashboard>
  )
}
