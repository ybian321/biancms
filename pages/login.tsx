import React from 'react';
import Link from 'next/link';
import router from 'next/router';
import { Form, Input, Button, Checkbox, Radio, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginAuth } from '../lib/api/auth.api';

import { LoginFormValues } from '../lib/types/login.type';

export default function LoginPage() {
   const onFinish = (values: LoginFormValues) => {
      loginAuth(values)
         .then((response) => {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('role', response.data.data.role);
            router.push(`/dashboard/${response.data.data.role}`);
         })
         .catch(() => {
            message.error('Unknown Error');
         });
   };

   return (
      <>
         <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
         >
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>
               <b>Course Management Assistant</b>
            </h1>

            <Form.Item className="formItem" name="type" initialValue="student" rules={[{ required: true, message: 'Please pick an item!' }]}>
               <Radio.Group>
                  <Radio.Button value="student">Student</Radio.Button>
                  <Radio.Button value="teacher">Teacher</Radio.Button>
                  <Radio.Button value="manager">Manager</Radio.Button>
               </Radio.Group>
            </Form.Item>

            <Form.Item className="formItem" name={['email']} rules={[{ type: 'email', required: true, message: 'Please input email' }]}>
               <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>

            <Form.Item className="formItem" name="password" rules={[{ required: true, message: 'Please input password' }]}>
               <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} minLength={4} maxLength={16} />
            </Form.Item>

            <Form.Item className="formItem" name="remember" valuePropName="checked">
               <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item className="formItem">
               <Button type="primary" htmlType="submit" block>
                  Sign in
               </Button>
            </Form.Item>

            <Form.Item className="formItem">
               No account?{' '}
               <Link href="/">
                  <a>Sign up</a>
               </Link>
            </Form.Item>
         </Form>
      </>
   );
}
