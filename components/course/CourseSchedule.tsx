import { Button, Col, Form, Input, Row, Select, TimePicker } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { gutter, weekDays } from '../../lib/constant/config';

export interface AddChapterFormProps {
   courseId?: number;
   scheduleId?: number;
   onSuccess?: (res: boolean) => void;
   isAdd?: boolean;
}

export default function CourseScheduleForm({ courseId, onSuccess, scheduleId, isAdd = true }: AddChapterFormProps) {
   const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);

   return (
      <Form>
         <h2>Chapter Detail</h2>
         <Row gutter={gutter}>
            <Col span={12}>
               <Form.List name="names">
                  {(fields, { add, remove }) => (
                     <>
                        {fields.map((field) => (
                           <Row key={field.key} gutter={20}>
                              <Col span={8}>
                                 <Form.Item>
                                    <Input size="large" placeholder="Chapter Name" />
                                 </Form.Item>
                              </Col>
                              <Col span={12}>
                                 <Form.Item>
                                    <Input size="large" placeholder="Chapter content" />
                                 </Form.Item>
                              </Col>
                              <Col span={2}>
                                 {fields.length > 1 ? (
                                    <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                                 ) : null}
                              </Col>
                           </Row>
                        ))}
                        <Row>
                           <Col span={20}>
                              <Button type="dashed" size="large" onClick={() => add()} style={{ width: '100%' }}>
                                 + Add Chapter
                              </Button>
                           </Col>
                        </Row>
                     </>
                  )}
               </Form.List>
            </Col>

            <Col span={12}>
               <Form.List name="classTime">
                  {(fields, { add, remove }) => (
                     <>
                        {fields.map((field) => (
                           <Row key={field.key} gutter={20}>
                              <Col span={8}>
                                 <Form.Item>
                                    <Select
                                       size="large"
                                       onChange={(value: string) =>
                                          /**
                                           * !FIXME
                                           */
                                          setSelectedWeekdays([...selectedWeekdays, value])
                                       }
                                    >
                                       {weekDays.map((day) => (
                                          <Select.Option key={day} value={day} disabled={selectedWeekdays.includes(day)}>
                                             {day}
                                          </Select.Option>
                                       ))}
                                    </Select>
                                 </Form.Item>
                              </Col>
                              <Col span={12}>
                                 <Form.Item rules={[{ required: true }]}>
                                    <TimePicker size="large" style={{ width: '100%' }} />
                                 </Form.Item>
                              </Col>
                              <Col span={2}>
                                 {fields.length > 1 ? (
                                    <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                                 ) : null}
                              </Col>
                           </Row>
                        ))}
                        <Row>
                           <Col span={20}>
                              <Button type="dashed" size="large" onClick={() => add()} style={{ width: '100%' }}>
                                 + Add Class Time
                              </Button>
                           </Col>
                        </Row>
                     </>
                  )}
               </Form.List>
            </Col>
         </Row>
         <Form.Item>
            <Button type="primary" htmlType="submit">
               Submit
            </Button>
         </Form.Item>
      </Form>
   );
}
