import { useState } from 'react'
import { Button, Input, Modal, PageHeader } from 'antd'
import Dashboard from '../../../../components/Dashboard'
import StudentsTable from '../../../../components/StudentsTable'

export default function Student() {
  const { Search } = Input
  const onSearch = (value: any) => console.log(value)

  const [modal2Visible, setModal2Visible] = useState(false)

  const handleCancel = () => {
    setModal2Visible(false)
  }

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
      <PageHeader breadcrumb={{ routes }} style={{ margin: '16px 0' }} />

      <div className="site-layout-content">
        <Button type="primary" onClick={() => setModal2Visible(true)}>
          + Add
        </Button>

        <Modal
          title="Add Student"
          style={{ top: 20 }}
          visible={modal2Visible}
          footer={[
            <Button key="submit" type="primary">
              Add
            </Button>,
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>

        <Search
          placeholder="Search Name"
          onSearch={onSearch}
          style={{ width: 200, marginBottom: 20 }}
        />

        <StudentsTable />
      </div>
    </Dashboard>
  )
}
