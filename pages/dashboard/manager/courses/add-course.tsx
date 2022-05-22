import { Steps } from 'antd';
import { useState } from 'react';
import CreateCourseForm from '../../../../components/course/createCourseForm';

export default function AddCourseForm() {
   const { current, setCurrent } = useState();
   const onChange = (current: any) => {
      console.log('onChange:', current);
      setCurrent({ current });
   };

   return (
      <>
         <Steps type="navigation" current={current} onChange={onChange} style={{ marginBottom: '30px' }}>
            <Steps.Step title="Course Detail" />
            <Steps.Step title="Course Schedule" />
            <Steps.Step title="Success" />
         </Steps>

         <CreateCourseForm />
      </>
   );
}
