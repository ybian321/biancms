import React from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import { addStudent, editStudentById } from '../../lib/api/students.api';
import styled from 'styled-components';

const ModalFormSubmit = styled(Form.Item)`
   position: absolute;
   bottom: 0;
   right: 8em;
   margin-bottom: 10px;
`;

const { Option } = Select;

export default function StudentDetailForm(props: any) {
   console.log('🚀 ~ file: StudentDetailForm.tsx ~ line 16 ~ StudentDetailForm ~ props', props);
   const onFinish = (values: any) => {
      const studentId = props.student.id;

      props.student
         ? editStudentById(values, studentId)
              .then(() => {
                 message.info('edit success');
              })
              .catch(() => {
                 message.info('edit fail');
              })
         : addStudent(values)
              .then(() => {
                 message.info('add success');
              })
              .catch(() => {
                 message.info('add fail');
              });
   };

   return (
      <Form
         onFinish={onFinish}
         initialValues={{
            name: props.student?.name,
            email: props.student?.email,
            country: props.student?.country,
            type: props.student?.type.id
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

         <ModalFormSubmit shouldUpdate={true}>
            {() => (
               <Button type="primary" htmlType="submit">
                  {!!props.student ? 'Update' : 'Add'}
               </Button>
            )}
         </ModalFormSubmit>
      </Form>
   );
}
