import React from 'react';
import axios from 'axios';
import { Form, Button, message, Input, Select } from 'antd';

const url = 'http://cms.chtoma.com/api/students';

function UpdateStudent(id: any) {
  const onFinish = (values: any) => {
    const token = localStorage.getItem('token');
    console.log('Success:', values);

    axios
      .put(
        url,
        {
          id: id.id.id,
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
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        name: id?.name,
        email: id?.email,
        country: id?.country,
        typeId: id?.type
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="student name" />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input placeholder="email" />
      </Form.Item>

      <Form.Item name="country" label="Area" rules={[{ required: true }]}>
        <Select>
          <Option value="China">China</Option>
          <Option value="Canada">Canada</Option>
        </Select>
      </Form.Item>

      <Form.Item name="Student" label="Student Type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value={1}>tester</Select.Option>
          <Select.Option value={2}>developer</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateStudent;
