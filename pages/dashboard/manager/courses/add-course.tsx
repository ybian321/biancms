import { Steps } from 'antd';
import { useState } from 'react';

export default function AddCourseForm() {
   const { current, setCurrent } = useState();
   const onChange = (current: any) => {
      console.log('onChange:', current);
      setCurrent({ current });
   };

   return (
      <Steps type="navigation" current={current} onChange={onChange} className="site-navigation-steps">
         <Steps.Step status="finish" title="Step 1" />
         <Steps.Step status="process" title="Step 2" />
         <Steps.Step status="wait" title="Step 3" />
      </Steps>
   );
}
