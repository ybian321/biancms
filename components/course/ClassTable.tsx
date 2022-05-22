import { Descriptions } from 'antd';

export default function ClassTable() {
   return (
      <Descriptions title="User Info" layout="vertical" bordered>
         <Descriptions.Item label="Sunday">18:00:00</Descriptions.Item>
         <Descriptions.Item label="Monday">18:00:00</Descriptions.Item>
      </Descriptions>
   );
}
