import { useEffect, useState } from 'react';
import { Card, Col, Collapse, Row, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import styled from 'styled-components';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import { getCourseDetail } from '../../../../lib/api/course.api';
import { CourseDetail } from '../../../../lib/types/courses.type';

const H2 = styled.h2`
   color: #7356f1;
   fontweight: '500';
   fontsize: '1.5em';
`;

const H3 = styled.h3`
   fontweight: '500';
   fontsize: '1.17em';
`;

const StyledRow = styled(Row)`
   width: calc(100% + 48px);
   margin: 0 0 0 -24px !important;
`;

const StyledCol = styled(Col)`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   position: relative;
   border: 1px solid #f0f0f0;
   border-left: none;
   border-bottom: none;
   :last-child {
      border-right: none;
   }
   p {
      margin-bottom: 0;
   }
   b {
      color: #7356f1;
      font-size: 24px;
   }
`;

export default function CourseDetailPage() {
   const [course, setCourse] = useState();
   const [sales, setSales] = useState<{ label: string; value: string | number }[]>([]);

   const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
   `;

   useEffect(() => {
      const currentUrl = window.location.href;
      const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

      getCourseDetail(id).then((response) => {
         const sales = response.data.data.sales;
         const info = [
            { label: 'Price', value: sales.price },
            { label: 'Batches', value: sales.batches },
            { label: 'Students', value: sales.studentAmount },
            { label: 'Earings', value: sales.earnings }
         ];

         setCourse(response.data.data);
         setSales(info);
      });
   }, []);

   return (
      <Row>
         <Col span={6}>
            <Card className="course-detail" key={course.id} cover={<img alt="placeholder" src="/placeholder.png" />}>
               <Meta title={course.name} style={{ marginBottom: '10px' }} />
               <div className="card-item">
                  <span>{course.createdAt}</span>
                  <b>
                     <HeartFilled style={{ color: 'red', marginRight: '5px' }} />
                     {course.star}
                  </b>
               </div>
               <div className="card-item">
                  <span>Duration:</span>
                  <b>{course.duration} years</b>
               </div>
               <div className="card-item">
                  <span>Teacher:</span>
                  <b className="text-blue">{course.teacherName}</b>
               </div>
               <div className="flex justify-between" style={{ marginBottom: '15px' }}>
                  <span>
                     <UserOutlined style={{ color: 'rgb(24, 144, 255)', marginRight: '5px' }} />
                     Student Limit:
                  </span>
                  <b>{course.maxStudents}</b>
               </div>

               <StyledRow>
                  {sales.map((item: any, index: any) => (
                     <StyledCol span="6" key={index}>
                        <b>{item.value}</b>
                        <p>{item.label}</p>
                     </StyledCol>
                  ))}
               </StyledRow>
            </Card>
         </Col>

         <Col span={1}></Col>

         <Col span={17}>
            <Card>
               <H2>Course Detail</H2>
               <H3>Create Time</H3>
               <p>{course.createdAt}</p>
               <H3>Start Time</H3>
               <p>{course.startTime}</p>
               <H3>Status</H3>
               <H3>Course Code</H3>
               <p>{course.uid}</p>

               <H3>Class Time</H3>

               <H3>Category</H3>
               <Row>
                  {/* {course?.type.map((item) => (
                           <Tag color={'geekblue'} key={item.id}>
                              {item.name}
                           </Tag>
                        ))} */}
               </Row>

               <H3>Description</H3>
               <p>{course.detail}</p>

               <H3>Chapter</H3>
               <Collapse defaultActiveKey={['1']}>
                  <Collapse.Panel header="This is panel header 1" key="1">
                     <div>{text}</div>
                  </Collapse.Panel>
                  <Collapse.Panel header="This is panel header 2" key="2">
                     <div>{text}</div>
                  </Collapse.Panel>
                  <Collapse.Panel header="This is panel header 3" key="3">
                     <div>{text}</div>
                  </Collapse.Panel>
               </Collapse>
            </Card>
         </Col>
      </Row>
   );
}
