import { useEffect, useState } from 'react'
import axios from 'axios'
import { Input, message, PageHeader, Table } from 'antd'
import Dashboard from '../../../../components/Dashboard'
import { formatDistanceToNow } from 'date-fns'

export interface Student {
  data: Data
  code: number
  msg: string
}

export interface Data {
  total: number
  students: Student[]
  paginator: Paginator
}

export interface Student {
  createdAt: string
  updatedAt: string
  id: number
  email: string
  name: string
  country: string
  profileId: number
  type: Type
  courses: Course[]
}

export interface Type {
  id: number
  name: string
}

export interface Course {
  id: number
  courseId: number
  name: string
}

export interface Paginator {
  page: number
  limit: number
}

const url = 'http://cms.chtoma.com/api/students?page=1&limit=100'

export default function Student() {
  const { Search } = Input
  const onSearch = (value: any) => console.log(value)

  const [data, setData] = useState<Student[]>([])

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        console.log(response)
        setData(response.data.data.students)
      })
      .catch((error) => {
        console.log(error)
        message.error('Unknown Error')
      })
  }, [])

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: '5%',
      render: (_1: any, _2: any, index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Area',
      dataIndex: 'country',
      filters: [
        { text: 'China', value: 'china' },
        { text: 'New Zealand', value: 'newZealand' },
        { text: 'Canada', value: 'canada' },
        { text: 'Australia', value: 'australia' },
      ],
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Selected Curriculum',
      dataIndex: 'courses',
      width: '20%',
      render(value: Course[]) {
        return value.map((item) => item.name).join(',')
      },
    },
    {
      title: 'Student Type',
      dataIndex: 'type',
      filters: [
        { text: 'developer', value: 'developer' },
        { text: 'tester', value: 'tester' },
      ],
      width: '10%',
      render(value: Type) {
        return value.name
      },
    },
    {
      title: 'Join Time',
      dataIndex: 'createdAt',
      width: '10%',
      render(value: string) {
        return formatDistanceToNow(new Date(value))
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
    },
  ]

  const pagination = { defaultCurrent: 1, pageSize: 20 }

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
        <Search
          placeholder="Search Name"
          onSearch={onSearch}
          style={{ width: 200, marginBottom: 20 }}
        />

        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          scroll={{ x: '100vw' }}
        />
      </div>
    </Dashboard>
  )
}
