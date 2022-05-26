import { Descriptions } from 'antd';

export default function ClassTable() {
   //todo
   return (
      <Descriptions layout="vertical" bordered style={{ marginBottom: '10px' }}>
         <Descriptions.Item label="Sunday">18:00:00</Descriptions.Item>
         <Descriptions.Item label="Monday">18:00:00</Descriptions.Item>
      </Descriptions>
   );
}
