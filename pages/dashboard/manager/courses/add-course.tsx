import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, message, Result, Steps } from 'antd';
import { useUserRole } from '../../../../components/custom-hooks/useLoginState';
import CourseDetailForm from '../../../../components/course/CourseDetailForm';
import CourseScheduleForm from '../../../../components/course/CourseScheduleForm';

const { Step } = Steps;

export default function AddCoursePage() {
   const router = useRouter();
   const userRole = useUserRole();

   const [current, setCurrent] = useState(0);
   const [availableNavigate, setAvailableNavigate] = useState<number[]>([0]);
   const [courseId, setCourseId] = useState(null);
   const [scheduleId, setScheduleId] = useState(null);

   const next = () => {
      setCurrent(current + 1);
      setAvailableNavigate([...availableNavigate, current + 1]);
   };

   return (
      <>
         <Steps
            type="navigation"
            current={current}
            onChange={(current) => {
               if (availableNavigate.includes(current)) {
                  setCurrent(current);
               }
            }}
         >
            <Step title="Course Detail" />
            <Step title="Course Schedule" />
            <Step title="Success" />
         </Steps>

         <div style={{ display: current === 0 ? 'block' : 'none' }}>
            <CourseDetailForm
               onSuccess={(course: any) => {
                  setCourseId(course.id);
                  setScheduleId(course.scheduleId);
                  next();
                  message.info('New Course created.');
               }}
            />
         </div>

         <div style={{ display: current === 1 ? 'block' : 'none' }}>
            <CourseScheduleForm courseId={courseId} scheduleId={scheduleId} onSuccess={() => next()} />
         </div>

         <div style={{ display: current === 2 ? 'block' : 'none' }}>
            <Result
               status="success"
               title="Successfully Create Course!"
               extra={[
                  <Button type="primary" key="detail" onClick={() => router.push(`/dashboard/${userRole}/courses/${courseId}`)}>
                     Go Course
                  </Button>,
                  <Button
                     key="again"
                     onClick={() => {
                        router.reload();
                     }}
                  >
                     Create Again
                  </Button>
               ]}
            />
         </div>
      </>
   );
}
