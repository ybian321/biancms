import { useEffect, useState } from 'react';
import moment from 'moment';
import { getTime } from 'date-fns';
import { useForm } from 'antd/lib/form/Form';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin, Upload } from 'antd';
import { CloseCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { addCourse, createCourseCode, getCourseTypes, updateCourse } from '../../lib/api/course.api';
import { getTeachers } from '../../lib/api/teacher.api';
import { AddCourseRequest, Course } from '../../lib/model/courses.type';
import { Teacher } from '../../lib/model/teachers.type';
import styled from 'styled-components';

export interface AddCourseFormProps {
   course?: Course;
   onSuccess?: (course: Course) => void;
}

export interface CourseType {
   id: number;
   name: string;
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
   .ant-upload.ant-upload-select-picture-card {
      width: 100%;
      margin: 0;
   }

   .ant-upload-picture-card-wrapper,
   .ant-form-item-control-input,
   .ant-form-item-control-input div {
      height: 100%;
   }
   .ant-upload-picture-card-wrapper img {
      object-fit: cover !important;
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

const DeleteIcon = styled(CloseCircleOutlined)`
   color: red;
   position: absolute;
   right: -10px;
   top: 1em;
   font-size: 24px;
   opacity: 0.5;
`;

export default function CourseDetailForm({ course, onSuccess }: AddCourseFormProps) {
   const [form] = useForm();
   const [data, setData] = useState();
   const [unit, setUnit] = useState<number>(2);
   const [genCode, setGenCode] = useState();
   const [isUploading, setIsUploading] = useState<boolean>(false);
   const [isTeacherSearching, setIsTeacherSearching] = useState<boolean>(false);
   const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
   const [teachers, setTeachers] = useState<Teacher[]>([]);
   const [fileList, setFileList] = useState<UploadFile[]>([]);

   const getCode = () => {
      createCourseCode().then((res) => {
         setGenCode(res.data.data);
         form.setFieldsValue({ uid: res.data.data });
      });
   };

   useEffect(() => {
      getCode();
      getCourseTypes().then((res) => {
         setCourseTypes(res.data.data);
      });

      if (onSuccess && !!data) {
         onSuccess(data);
      }
   }, [data]);

   useEffect(() => {
      if (!!course) {
         const values = {
            ...course,
            type: course.type.map((item) => item.id),
            teacherId: course.teacherName,
            startTime: moment(course.startTime),
            duration: course.duration,
            durationUnit: course.durationUnit
         };

         form.setFieldsValue(values);

         setFileList([{ name: 'Cover Image', url: course.cover, uid: '' }]);
      }
   }, [course]);

   const onFinish = (values: any) => {
      const req: AddCourseRequest = {
         detail: values.detail,
         duration: values.duration,
         durationUnit: unit,
         maxStudents: values.maxStudents,
         name: values.name,
         price: values.price,
         startTime: moment(values.startTime).format('YYYY-MM-DD'),
         teacherId: values.teacherId,
         type: values.type,
         uid: values.uid,
         cover: values.cover
      };

      course
         ? updateCourse({ ...req, id: course?.id }).then((response) => setData(response.data.data))
         : addCourse(req).then((response) => setData(response.data.data));
   };

   const selectAfter = (
      <Select value={unit} className="select-after" onChange={(newUnit) => setUnit(newUnit)}>
         <Select.Option value={1}>year</Select.Option>
         <Select.Option value={2}>month</Select.Option>
         <Select.Option value={3}>day</Select.Option>
         <Select.Option value={4}>week</Select.Option>
         <Select.Option value={5}>hour</Select.Option>
      </Select>
   );

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
      <Form layout="vertical" onFinish={onFinish} form={form}>
         <Row className="flex justify-between">
            <Col span={8} style={{ marginRight: 15 }}>
               <Form.Item label="Course Name" name="name" rules={[{ required: true }, { max: 100, min: 3 }]}>
                  <Input type="text" placeholder="course name" />
               </Form.Item>
            </Col>

            <Col span={5}>
               <Form.Item label="Teacher" name="teacherId">
                  <Select
                     placeholder="Select teacher"
                     notFoundContent={isTeacherSearching ? <Spin size="small" /> : null}
                     filterOption={false}
                     showSearch
                     onSearch={(query: string) => {
                        setIsTeacherSearching(true);
                        getTeachers(query).then((res) => {
                           const data = res.data.data;
                           if (!!data) {
                              setTeachers(data.teachers);
                           }
                           setIsTeacherSearching(false);
                        });
                     }}
                  >
                     {teachers.map(({ id, name }) => (
                        <Select.Option key={id} value={id}>
                           {name}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>
            </Col>

            <Col span={5}>
               <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                  <Select mode="multiple">
                     {courseTypes.map((type) => (
                        <Select.Option value={type.id} key={type.id}>
                           {type.name}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>
            </Col>

            <Col span={5}>
               <Form.Item label="Course Code" name="uid" rules={[{ required: true }]}>
                  <Input type="text" placeholder="course code" disabled />
               </Form.Item>
            </Col>
         </Row>

         <Row className="flex justify-between" style={{ marginTop: 30 }}>
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
               <DescriptionTextArea style={{ height: '100%' }} label="Description" name="detail" rules={[{ required: true }]}>
                  <TextArea placeholder="Course description" style={{ height: '100%' }} />
               </DescriptionTextArea>
            </Col>

            <Col span={8} style={{ paddingLeft: 20 }}>
               <UploadItem label="Cover" name="cover" style={{ height: '100%' }}>
                  <ImgCrop rotate aspect={16 / 9}>
                     <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={({ fileList: newFileList, file }) => {
                           const { status } = file;

                           if (file?.response) {
                              const { url } = file.response;
                              form.setFieldsValue({ cover: url });
                           }

                           setIsUploading(status === 'uploading');
                           setFileList(newFileList);
                        }}
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
                     </Upload>
                  </ImgCrop>
               </UploadItem>

               {isUploading && (
                  <DeleteIcon
                     onClick={() => {
                        setIsUploading(false);
                        setFileList([]);
                     }}
                  />
               )}
            </Col>
         </Row>
         <Form.Item style={{ marginTop: 40 }}>
            <Button type="primary" htmlType="submit">
               {course ? 'Update Course' : 'Create Course'}
            </Button>
         </Form.Item>
      </Form>
   );
}
