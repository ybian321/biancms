import { useEffect, useState } from 'react'
import axios from 'axios'
import { Input, message, Table } from 'antd'
import Dashboard from '../../../../components/Dashboard'

const url = 'http://cms.chtoma.com/api/students?page=1&limit=100'

export default function Student() {
  const { Search } = Input
  const onSearch = (value: any) => console.log(value)

  const [data, setData] = useState([])

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
        localStorage.setItem(
          'data',
          JSON.stringify(response.data.data.students)
        )
      })
      .catch((error) => {
        console.log(error)
        message.error('Unknown Error')
      })
  }, [])

  const dataSource = data.map((data) => ({
    name: data.name,
    area: data.country,
    email: data.email,
    curriculum: data.courses[0].name,
    type: data.type.name,
    time: data.createdAt,
  }))

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
      dataIndex: 'area',
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
      dataIndex: 'curriculum',
      width: '20%',
    },
    {
      title: 'Student Type',
      dataIndex: 'type',
      filters: [
        { text: 'developer', value: 'developer' },
        { text: 'tester', value: 'tester' },
      ],
      width: '10%',
    },
    {
      title: 'Join Time',
      dataIndex: 'time',
      width: '10%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
    },
  ]

  const pagination = { defaultCurrent: 1, pageSize: 20 }

  return (
    <Dashboard>
      <div className="site-layout-content">
        <Search
          placeholder="Search Name"
          onSearch={onSearch}
          style={{ width: 200, marginBottom: 20 }}
        />
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          scroll={{ x: '100vw' }}
        />
      </div>
    </Dashboard>
  )
}
