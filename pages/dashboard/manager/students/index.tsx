import { Breadcrumb, Button, Form, message, Table } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import Dashboard from '../../../../components/Dashboard'

const url = 'http://cms.chtoma.com/api/students?page=1&limit=2'

export default function Student() {
  const onFinish = (values: any) => {
    const token = localStorage.getItem('token')
    console.log('Success:', values)

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
        message.error('Unknown Error')
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: '5%',
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

  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      area: 32,
      email: `London Park no. ${i}`,
      curriculum: 66,
      type: `developer`,
      time: `2020,`,
    })
  }

  const pagination = { current: 1, pageSize: 20 }

  return (
    <Dashboard>
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item href="/dashboard/manager">
          <a href="">CMS MANAGER SYSTEM</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item><a href="">Student</a></Breadcrumb.Item>
        <Breadcrumb.Item>Student List</Breadcrumb.Item>
      </Breadcrumb> */}

      <div className="site-layout-content">
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Button type="primary" htmlType="submit">
            + Add
          </Button>
        </Form>

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
