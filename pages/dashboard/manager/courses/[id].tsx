import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Dashboard from '../../../../components/Dashboard';
import { getCourseDetail } from '../../../../lib/api/course.api';
import { Course } from '../../../../lib/types/courses.type';

function CourseDetail() {
   const [data, setData] = useState<Course[]>();

   useEffect(() => {
      (async () => {
         const currentUrl = window.location.href;
         const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
         const response = await getCourseDetail(id);
         const data = response.data.data;
         setData(data);
      })();
   }, []);

   return (
      <Dashboard>
         <div className="site-layout-content">
            <Row>
               <Col span={8}></Col>
               <Col span={16}></Col>
            </Row>
         </div>
      </Dashboard>
   );
}

export default CourseDetail;
