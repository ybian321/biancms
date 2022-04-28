import React from 'react';
import Link from 'next/link';
import { AES } from 'crypto-js';
import { Form, Input, Button, Checkbox, Radio, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { API } from '../lib/api';
import router from 'next/router';

function Login() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    API({
      url: '/login',
      method: 'post',
      data: {
        email: values.email,
        password: AES.encrypt(values.password, 'cms').toString(),
        role: values.type
      }
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        router.push(`/dashboard/${response.data.role}`);
      })
      .catch((error) => {
        console.log(error);
        message.error('Please select a correct type.');
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

export default Login;
