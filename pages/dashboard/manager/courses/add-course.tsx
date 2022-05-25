import { useState } from 'react';
import { Button, message, Steps } from 'antd';
import CreateCourseForm from '../../../../components/course/CreateCourseForm';

export default function AddCourseForm() {
   const [current, setCurrent] = useState(0);

   const steps = [
      {
         title: 'Course Detail',
         content: <CreateCourseForm />
      },
      {
         title: 'Course Schedule',
         content: 'Second-content'
      },
      {
         title: 'Success',
         content: 'Last-content'
      }
   ];

   const next = () => {
      setCurrent(current + 1);
   };

   const prev = () => {
      setCurrent(current - 1);
   };

   return (
      <>
         <Steps type="navigation" current={current}>
            {steps.map((item, index) => (
               <Steps.Step key={index} title={item.title} />
            ))}
         </Steps>

         <div className="steps-content">{steps[current].content}</div>

         <div className="steps-action">
            {current < steps.length - 1 && (
               <Button type="primary" onClick={() => next()}>
                  Next
               </Button>
            )}
            {current === steps.length - 1 && (
               <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
               </Button>
            )}
            {current > 0 && (
               <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Previous
               </Button>
            )}
         </div>
      </>
   );
}
