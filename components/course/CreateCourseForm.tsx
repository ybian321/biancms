import { Col, DatePicker, Form, Input, InputNumber, Row, Select, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/lib/input/TextArea';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Course } from '../../lib/types/students.type';
import { useState } from 'react';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { getTime } from 'date-fns';

export interface AddCourseFormProps {
   course?: Course;
   onSuccess?: (course: Course) => void;
}

/**
 * reset antd style
 */
const DescriptionTextArea = styled(Form.Item)`
   .ant-form-item-control-input,
   .ant-form-item-control-input-content,
   text-area {
      height: 100%;
   }
`;

const UploadItem = styled(Form.Item)`
   .ant-form-item-control-input,
   .ant-form-item-control-input div {
      height: 100%;
   }
   .ant-upload-list-item-progress,
   .ant-tooltip {
     height: auto !important;
     .ant-tooltip-arrow {
       height: 13px;
     }
   }
   .ant-upload-list-picture-card-container {
     width: 100%;
   }
   .ant-upload-list-item-actions {
     .anticon-delete {
       color: red;
   }
`;

const UploadInner = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   background: rgb(240, 240, 240);
   width: 100%;
   .anticon {
      font-size: 44px;
      color: #1890ff;
   }
   p {
      font-size: 24px;
      color: #999;
   }
`;

export default function CreateCourseForm() {
   const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
   const [fileList, setFileList] = useState<UploadFile[]>([
      {
         uid: '-1',
         name: 'image.png',
         status: 'done',
         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
   ]);

   const onFinish = (values: any) => {
      console.log('Success:', values);
   };

   const selectAfter = (
      <Select defaultValue="month" className="select-after">
         <Select.Option value="year">year</Select.Option>
         <Select.Option value="month">month</Select.Option>
         <Select.Option value="day">day</Select.Option>
         <Select.Option value="week">week</Select.Option>
         <Select.Option value="hour">hour</Select.Option>
      </Select>
   );

   const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };

   const onPreview = async (file: UploadFile) => {
      let src = file.url as string;
      if (!src) {
         src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as RcFile);
            reader.onload = () => resolve(reader.result as string);
         });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
   };

   return (
      <Form layout="vertical" onFinish={onFinish}>
         <Row className="flex justify-between">
            <Col span={8} style={{ marginRight: 15 }}>
               <Form.Item label="Course Name" name="name" rules={[{ required: true }, { max: 100, min: 3 }]}>
                  <Input type="text" placeholder="course name" />
               </Form.Item>
            </Col>

            <Col span={5}>
               <Form.Item label="Teacher" name="teacherId" rules={[{ required: true }]}>
                  <Select placeholder="Select teacher">
                     {/* {teachers.map(({ id, name }) => (
                        <Select.Option key={id} value={id}>
                           {name}
                        </Select.Option>
                     ))} */}
                  </Select>
               </Form.Item>
            </Col>

            <Col span={5}>
               <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                  <Select mode="multiple">
                     {/* {courseTypes.map((type) => (
                        <Select.Option value={type.id} key={type.id}>
                           {type.name}
                        </Select.Option>
                     ))} */}
                  </Select>
               </Form.Item>
            </Col>

            <Col span={5}>
               <Form.Item label="Course Code" name="uid" rules={[{ required: true }]}>
                  <Input type="text" placeholder="course code" disabled />
               </Form.Item>
            </Col>
         </Row>

         <Row className="flex justify-between">
            <Col span={8}>
               <Form.Item label="Start Date" name="startTime">
                  <DatePicker
                     style={{ width: '100%' }}
                     // @ts-ignore
                     disabledDate={(current: Date) => {
                        const today = getTime(new Date());
                        const date = current.valueOf();

                        return date < today;
                     }}
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

               <Form.Item style={{ marginBottom: 0 }} label="Duration" name="duration" rules={[{ required: true }]}>
                  <InputNumber addonAfter={selectAfter} style={{ width: '100%' }} />
               </Form.Item>
            </Col>

            <Col span={8} style={{ paddingLeft: 20 }}>
               <DescriptionTextArea
                  style={{ height: '100%' }}
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

            <Col span={8} style={{ paddingLeft: 20 }}>
               <UploadItem label="Cover" name="cover" style={{ height: '100%' }}>
                  <ImgCrop rotate aspect={16 / 9}>
                     <Dragger
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        style={{ backgroundColor: 'rgb(240, 240, 240)' }}
                     >
                        {fileList.length >= 1 ? null : (
                           <UploadInner>
                              <InboxOutlined />
                              <p className="ant-upload-text" style={{ fontSize: 24, color: 'rgb(153, 153, 153)' }}>
                                 Click or drag file to this area to upload
                              </p>
                           </UploadInner>
                        )}
                     </Dragger>
                  </ImgCrop>
               </UploadItem>
            </Col>
         </Row>
      </Form>
   );
}
