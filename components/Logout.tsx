import React from 'react';
import { Form, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { reqLogout } from '../lib/api';

function Logout() {
  const onFinish = (values: any) => {
    const token = localStorage.getItem('token');
    console.log('Success:', values);
    reqLogout({
      url: '/logout',
      method: 'post',
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Button htmlType="submit" icon={<LoginOutlined />}>
        Logout
      </Button>
    </Form>
  );
}

export default Logout;
