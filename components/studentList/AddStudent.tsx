import React from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import { addStudent } from '../../lib/api/students.api';

export default function AddStudent() {
   const onFinish = (values: any) => {
      addStudent(values)
         .then(() => {
            message.info('add success');
         })
         .catch(() => {
            message.info('add fail');
         });
   };

   return (
      <Form onFinish={onFinish}>
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
