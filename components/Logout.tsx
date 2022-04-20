import React from 'react'
import router from 'next/router'
import axios from 'axios'
import { Form, Button, message } from 'antd'
import { LoginOutlined } from '@ant-design/icons'

const url = 'http://cms.chtoma.com/api/logout'

function Logout() {
  const onFinish = (values: any) => {
    const token = localStorage.getItem('token')
    console.log('Success:', values)

    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((response) => {
        console.log(response)
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
        message.error('Unknown Error')
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Button htmlType="submit" icon={<LoginOutlined />}>
          Logout
        </Button>
      </Form>
    </>
  )
}

export default Logout
