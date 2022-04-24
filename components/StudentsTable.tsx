import { Button, message, Modal, Popconfirm, Space, Table } from 'antd'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'

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

export default function StudentsTable() {
  const [data, setData] = useState<Student[]>([])
  const [modal1Visible, setModal1Visible] = useState(false)

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

  function confirm(e: any) {
    console.log(e)
    message.success('Click on Yes')
  }

  function cancel(e: any) {
    console.log(e)
    message.error('Click on No')
  }

  const handleCancel = () => {
    setModal1Visible(false)
  }

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
      sorter: (a: { name: string | any[] }, b: { name: string | any[] }) =>
        a.name.length - b.name.length,
      width: '15%',
    },
    {
      title: 'Area',
      dataIndex: 'country',
      filters: [
        { text: 'China', value: 'China' },
        { text: 'New Zealand', value: 'New Zealand' },
        { text: 'Canada', value: 'Canada' },
        { text: 'Australia', value: 'Australia' },
      ],
      onFilter: (value: any, record: { country: string | any[] }) =>
        record.country.indexOf(value) === 0,
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
      //todo onFilter
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
      render: () => (
        <Space size="middle">
          <Button type="primary" onClick={() => setModal1Visible(true)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const pagination = { defaultCurrent: 1, pageSize: 20 }

  return (
    <>
      <Modal
        title="Edit Student"
        style={{ top: 20 }}
        visible={modal1Visible}
        footer={[
          <Button key="submit" type="primary">
            Update
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

      <Table columns={columns} dataSource={data} pagination={pagination} />
    </>
  )
}
