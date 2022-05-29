import { useState } from 'react';
import { Button, Result, Steps } from 'antd';
import CreateCourseForm from '../../../../components/course/CourseForm';
import UpdateCourseSchedule from '../../../../components/course/CourseSchedule';
import { useRouter } from 'next/router';
import { useUserRole } from '../../../../components/custom-hooks/useLoginState';

export default function AddCoursePage() {
   const router = useRouter();
   const userRole = useUserRole();

   const [step, setStep] = useState(0);
   const [availableNavigate, setAvailableNavigate] = useState<number[]>([0]);
   const [courseId, setCourseId] = useState(null);
   const [scheduleId, setScheduleId] = useState(null);
   const moveToNext = () => {
      setStep(step + 1);
      setAvailableNavigate([...availableNavigate, step + 1]);
   };

   const steps = [
      {
         title: 'Course Detail',
         content: (
            <CreateCourseForm
               onSuccess={(course: any) => {
                  setCourseId(course.id);
                  setScheduleId(course.scheduleId);
                  moveToNext();
               }}
            />
         )
      },
      {
         title: 'Course Schedule',
         content: <UpdateCourseSchedule courseId={courseId} scheduleId={scheduleId} onSuccess={moveToNext} />
      },
      {
         title: 'Success',
         content: (
            <Result
               status="success"
               title="Successfully Create Course!"
               extra={[
                  <Button
                     type="primary"
                     key="detail"
                     onClick={() => router.push(`/dashboard/${userRole}/courses/${courseId}`)} // !跳转后mirage状态丢失，新的的数据找不到，所以这里会报500
                  >
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
         <Steps
            type="navigation"
            current={step}
            onChange={(current) => {
               if (availableNavigate.includes(current)) {
                  setStep(current);
               }
            }}
         >
            {steps.map((item, index) => (
               <Steps.Step key={index} title={item.title} />
            ))}
         </Steps>

         <div className="steps-content">{steps[step].content}</div>
      </>
   );
}
