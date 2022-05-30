import { Button, Col, Form, Input, Row, Select, TimePicker } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { gutter, weekDays } from '../../lib/constant/config';
import { format } from 'date-fns';
import { ScheduleRequest } from '../../lib/model/courses.type';
import { updateSchedule } from '../../lib/api/course.api';

export interface AddChapterFormProps {
   courseId?: number;
   scheduleId?: number;
   onSuccess?: (res: boolean) => void;
   isAdd?: boolean;
}

const { Option } = Select;
const clsTime = 'classTime';
const cpts = 'chapters';

type ChapterFormValue = {
   [cpts]: {
      name: string;
      content: string;
   }[];
   [clsTime]: {
      weekday: string;
      time: Date;
   }[];
};

export default function CourseScheduleForm({ courseId, onSuccess, scheduleId, isAdd = true }: AddChapterFormProps) {
   const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
   const onFinish = (values: ChapterFormValue) => {
      //big question 2
      const { classTime: origin, chapters } = values;
      const classTime = origin.map(({ weekday, time }) => `${weekday} ${format(time, 'hh:mm:ss')}`);
      const req: ScheduleRequest = {
         chapters: chapters.map((item, index) => ({ ...item, order: index + 1 })),
         classTime,
         scheduleId,
         courseId
      };

      updateSchedule(req);
   };

   return (
      <Form name="schedule" onFinish={onFinish}>
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
                                 <Form.Item
                                    {...field}
                                    name={[field.name, 'weekday']}
                                    fieldKey={[field.fieldKey, 'weekday']}
                                    rules={[{ required: true }]}
                                 >
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
                                 <Form.Item>
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
         <Form.Item style={{ marginTop: 40 }}>
            <Button type="primary" htmlType="submit">
               Submit
            </Button>
         </Form.Item>
      </Form>
   );
}
