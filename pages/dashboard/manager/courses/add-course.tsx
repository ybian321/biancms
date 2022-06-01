import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, message, Result, Steps } from 'antd';
import { useUserRole } from '../../../../components/custom-hooks/useLoginState';
import CourseDetailForm from '../../../../components/course/CourseDetailForm';
import CourseScheduleForm from '../../../../components/course/CourseScheduleForm';

export default function AddCoursePage() {
   const router = useRouter();
   const userRole = useUserRole();

   const [current, setCurrent] = useState(0);
   const [availableStep, setAvailableStep] = useState(0);
   const [courseId, setCourseId] = useState(null);
   const [scheduleId, setScheduleId] = useState(null);

   const next = () => {
      setCurrent(current + 1);
   };

   const prev = () => {
      setCurrent(current - 1);
   };

   const steps = [
      {
         title: 'Course Detail',
         content: (
            <CourseDetailForm
               onSuccess={(course: any) => {
                  setCourseId(course.id);
                  setScheduleId(course.scheduleId);
                  next();
               }}
            />
         )
      },
      {
         title: 'Course Schedule',
         content: <CourseScheduleForm courseId={courseId} scheduleId={scheduleId} onSuccess={() => next()} />
      },
      {
         title: 'Success',
         content: (
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
         )
      }
   ];

   return (
      <>
         <Steps type="navigation" current={current}>
            {steps.map((item, index) => (
               <Steps.Step key={index} title={item.title} />
            ))}
         </Steps>

         <div className="steps-content">{steps[current].content}</div>
      </>
   );
}
