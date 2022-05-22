import { Button, Col, Form, Input, Row } from 'antd';

export default function CreateCourseForm() {
   const onFinish = (values: any) => {
      console.log('Success:', values);
   };

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
         <Row>
            <Col span={8}>
               <Form.Item label="Course Name" name="name" rules={[{ required: true }, { max: 100, min: 3 }]}>
                  <Input type="text" placeholder="course name" />
               </Form.Item>

               <Button type="primary" htmlType="submit">
                  Create Course
               </Button>
            </Col>
         </Row>
      </Form>
   );
}
