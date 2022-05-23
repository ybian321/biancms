import { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Upload } from 'antd';
import { Teacher } from '../../lib/types/teachers.type';
import TextArea from 'antd/lib/input/TextArea';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const DescriptionTextArea = styled(Form.Item)`
   .ant-form-item-control {
      position: absolute;
      inset: 0;
      top: 37px;
      bottom: 30px;
   }
   .ant-form-item-control-input,
   .ant-form-item-control-input-content,
   text-area {
      height: 100%;
   }
`;

export default function CreateCourseForm() {
   const [teachers, setTeachers] = useState<Teacher[]>([]);

   const onFinish = (values: any) => {
      console.log('Success:', values);
   };

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
         <Row>
            <Col span={8}>
               <Form.Item label="Course Name" name="name" rules={[{ required: true }, { max: 100, min: 3 }]}>
                  <Input type="text" placeholder="course name" />
               </Form.Item>
            </Col>
            <Col span={16}>
               <Row>
                  <Col span={8}>
                     <Form.Item label="Teacher" name="teacherId" rules={[{ required: true }]} style={{ marginLeft: 5 }}>
                        <Select placeholder="Select teacher">
                           {/* {teachers.map(({ id, name }) => (
                              <Select.Option key={id} value={id}>
                                 {name}
                              </Select.Option>
                           ))} */}
                        </Select>
                     </Form.Item>
                  </Col>

                  <Col span={8}>
                     <Form.Item label="Type" name="type" rules={[{ required: true }]} style={{ marginLeft: 5 }}>
                        <Select mode="multiple">
                           {/* {courseTypes.map((type) => (
                              <Select.Option value={type.id} key={type.id}>
                                 {type.name}
                              </Select.Option>
                           ))} */}
                        </Select>
                     </Form.Item>
                  </Col>

                  <Col span={8}>
                     <Form.Item label="Course Code" name="uid" rules={[{ required: true }]} style={{ marginLeft: 5 }}>
                        <Input type="text" placeholder="course code" disabled />
                     </Form.Item>
                  </Col>
               </Row>
            </Col>
         </Row>

         <Row>
            <Col span={8}>
               <Form.Item label="Start Date" name="startTime">
                  <DatePicker
                     style={{ width: '100%' }}
                     // disabledDate={(current: Date) => {
                     //    const today = getTime(new Date());
                     //    const date = current.valueOf();

                     //    return date < today;
                     // }}
                  />
               </Form.Item>

               <Form.Item label="Price" name="price" rules={[{ required: true }]}>
                  <InputNumber
                     formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                     // @ts-ignore
                     parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                     min={0}
                     style={{ width: '100%' }}
                  />
               </Form.Item>

               <Form.Item label="Student Limit" name="maxStudents" rules={[{ required: true }]}>
                  <InputNumber min={1} max={10} style={{ width: '100%' }} />
               </Form.Item>

               <Form.Item
                  label="Duration"
                  name="duration"
                  // rules={[{ required: true }, { validator: validateDuration }]}
               >
                  {/* <NumberWithUnit
                     options={new Array(5)
                        .fill('')
                        .map((_, index) => ({ unit: index + 1, label: DurationUnit[index + 1] }))}
                     defaultUnit={DurationUnit.month}
                  /> */}
               </Form.Item>
            </Col>

            <Col span={8} style={{ position: 'relative', marginLeft: 5 }}>
               <DescriptionTextArea
                  label="Description"
                  name="detail"
                  rules={[
                     { required: true },
                     {
                        min: 100,
                        max: 1000,
                        message: 'Description length must between 100 - 1000 characters.'
                     }
                  ]}
               >
                  <TextArea placeholder="Course description" style={{ height: '100%' }} />
               </DescriptionTextArea>
            </Col>

            <Col span={8} style={{ marginLeft: 5 }}>
               <Dragger>
                  <p className="ant-upload-drag-icon">
                     <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                     Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
                  </p>
               </Dragger>
            </Col>
         </Row>

         <Button type="primary" htmlType="submit">
            Create Course
         </Button>
      </Form>
   );
}
