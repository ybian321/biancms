import { Cascader, Input, Select, Tabs } from 'antd';

export default function EditCourseForm() {
   const options = [
      {
         value: 'zhejiang',
         label: 'Zhejiang',
         children: [
            {
               value: 'hangzhou',
               label: 'Hangzhou',
               children: [
                  {
                     value: 'xihu',
                     label: 'West Lake'
                  }
               ]
            }
         ]
      },
      {
         value: 'jiangsu',
         label: 'Jiangsu',
         children: [
            {
               value: 'nanjing',
               label: 'Nanjing',
               children: [
                  {
                     value: 'zhonghuamen',
                     label: 'Zhong Hua Men'
                  }
               ]
            }
         ]
      }
   ];

   return (
      <>
         <Input.Group compact style={{ marginBottom: 20 }}>
            <Select style={{ width: '8%' }} defaultValue="Home">
               <Select.Option value="Home">Home</Select.Option>
               <Select.Option value="Company">Company</Select.Option>
            </Select>
            <Cascader style={{ width: '40%' }} options={options} placeholder="Select Address" />
         </Input.Group>

         <Tabs type="card" defaultActiveKey="1" animated={true} size={'large'} style={{ marginBottom: 32 }}>
            <Tabs.TabPane tab="Course Detail" key="1">
               Course Detail
            </Tabs.TabPane>
            <Tabs.TabPane tab="Course Schedule" key="2">
               Course Schedule
            </Tabs.TabPane>
         </Tabs>
      </>
   );
}
