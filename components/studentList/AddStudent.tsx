import React from 'react';
import axios from 'axios';
import { Form, Button, message, Input, Select } from 'antd';

const url = 'http://cms.chtoma.com/api/students';

function AddStudent() {
  const onFinish = (values: any) => {
    const token = localStorage.getItem('token');
    console.log('Success:', values);

    axios
      .post(
        url,
        {
          name: values.name,
          email: values.email,
          country: values.country,
          type: values.type
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response) => {
        console.log(response);
        message.success('This is a success message.');
      })
      .catch((error) => {
        console.log(error);
        message.error('Unknown Error');
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input type="text" placeholder="student name" />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ type: 'email' }, { required: true }]}>
        <Input type="email" placeholder="email" />
      </Form.Item>

      <Form.Item name="country" label="Area" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="China">China</Select.Option>
          <Select.Option value="Canada">Canada</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="type" label="Student Type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value={1}>tester</Select.Option>
          <Select.Option value={2}>developer</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form>
  );
}

export default AddStudent;
