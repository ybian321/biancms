import { Button, Col, Descriptions, Form, Input, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function UpdateCourseSchedule() {
   //todo
   return (
      <Form>
         <h2>Chapter Detail</h2>
         <Row>
            <Col span={11} style={{ marginRight: 50 }}>
               <Row className="flex justify-between">
                  <Col span={8}>
                     <Form.Item>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={15} style={{ paddingLeft: 15 }}>
                     <Form.Item>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={1} style={{ paddingLeft: 15 }}>
                     <MinusCircleOutlined />
                  </Col>
                  <Col span={23}>
                     <Button type="dashed" style={{ width: '100%' }}>
                        + Add Chapter
                     </Button>
                  </Col>
               </Row>
            </Col>

            <Col span={11}>
               <Row className="flex justify-between">
                  <Col span={8}>
                     <Form.Item>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={15} style={{ paddingLeft: 15 }}>
                     <Form.Item>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={1} style={{ paddingLeft: 15 }}>
                     <MinusCircleOutlined />
                  </Col>
                  <Col span={23}>
                     <Button type="dashed" style={{ width: '100%' }}>
                        + Add Class Time
                     </Button>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Form>
   );
}
