import { Breadcrumb } from 'antd'
import Dashboard from '../../../components/Dashboard'

export default function Manager() {
  return (
    <Dashboard>
      <Breadcrumb>
        <Breadcrumb.Item href="/dashboard/manager">
          <a href="">CMS MANAGER SYSTEM</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">Manager Content</div>
    </Dashboard>
  )
}
