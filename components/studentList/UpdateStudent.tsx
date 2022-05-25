import React from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import { editStudentById } from '../../lib/api/students.api';

const url = 'http://cms.chtoma.com/api/students';
const { Option } = Select;

export default function UpdateStudent(props: any) {
   const onFinish = (values: any) => {
      const studentId = props.record.id;

      editStudentById(values, studentId)
         .then(() => {
            message.info('edit success');
         })
         .catch(() => {
            message.info('edit fail');
         });
   };

   return (
      <Form
         onFinish={onFinish}
         initialValues={{
            name: props.record?.name,
            email: props.record?.email,
            country: props.record?.country,
            type: props.record?.type.id
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

         <Form.Item name="type" label="Student Type" rules={[{ required: true }]}>
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
