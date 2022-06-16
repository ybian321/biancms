import { useState } from 'react';
import { Col, Row, Select, Typography } from 'antd';
import MessageList from '../../../components/message/MessageList';

export default function MessagePage() {
   const [type, setType] = useState();

   return (
      <>
         <Row align="middle">
            <Col span={8}>
               <Typography.Title level={2}>Recent Messages</Typography.Title>
            </Col>

            <Col span={8} offset={8} style={{ textAlign: 'right' }}>
               <Select
                  defaultValue={null}
                  onSelect={(value: any) => {
                     setType(value);
                  }}
                  style={{ minWidth: 100 }}
               >
                  <Select.Option value={null}>All</Select.Option>
                  <Select.Option value="notification">Notification</Select.Option>
                  <Select.Option value="message">Message</Select.Option>
               </Select>
            </Col>
         </Row>

         <MessageList type={type} />
      </>
   );
}
