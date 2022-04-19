import React from 'react'
import router from 'next/router'
import axios from 'axios'
import { Form, Button, message } from 'antd'

const url = 'http://cms.chtoma.com/api/logout'

function Logout() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYWNoZXJAYWRtaW4uY29tIiwicm9sZSI6InRlYWNoZXIiLCJpZCI6MSwiaWF0IjoxNjUwMzYwNjQwLCJleHAiOjE2NTgxMzY2NDB9.ESkE2alRsytXfu1R36VE9V0E1hNEXhFUqE8672D3TCg'

  const onFinish = (values: any) => {
    console.log('Success:', values)

    axios
      .post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
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
        <Button type="primary" htmlType="submit" block>
          Logout
        </Button>
      </Form>
    </>
  )
}

export default Logout
