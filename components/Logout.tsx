import React from 'react';
import { Form, Button, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { logoutAuth } from '../lib/api/auth.api';
import router from 'next/router';

export default function Logout() {
   const onFinish = (values: any) => {
      console.log('Success:', values);

      logoutAuth()
         .then((response) => {
            console.log(`[logout success]`);
            response ? router.push(`/login`) : message.error('logout fail');
         })
         .catch((error) => {
            console.log(`[logout error]`, error.message);
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
