import React from 'react';
import { Form, Button, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { logoutAuth } from '../../lib/api/auth.api';
import router from 'next/router';

export default function Logout() {
   const onFinish = (values: any) => {
      logoutAuth().then((response) => {
         console.log(`[logout success]`);
         response ? router.push(`/login`) : message.error('logout fail');
      });
   };

   return (
      <Form onFinish={onFinish}>
         <Button htmlType="submit" icon={<LoginOutlined />}>
            Logout
         </Button>
      </Form>
   );
}
