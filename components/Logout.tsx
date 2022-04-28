import React from 'react';
import { Form, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { API } from '../lib/api';

function Logout() {
  const onFinish = (values: any) => {
    const token = localStorage.getItem('token');
    console.log('Success:', values);
    API({
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
