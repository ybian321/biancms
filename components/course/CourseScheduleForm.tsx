import { Button, Col, Form, Input, Row, Select, TimePicker } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { gutter, weekDays } from '../../lib/constant/config';
import { ScheduleRequest } from '../../lib/model/courses.type';
import { getScheduleById, updateSchedule } from '../../lib/api/course.api';
import moment from 'moment';

export interface AddChapterFormProps {
   courseId?: number;
   scheduleId?: number;
   onSuccess?: (res: boolean) => void;
   isAdd?: boolean;
}

const classTime = 'classTime';
const chapters = 'chapters';

type ChapterFormValue = {
   [chapters]: {
      name: string;
      content: string;
   }[];
   [classTime]: {
      weekday: string;
      time: Date;
   }[];
};

export default function CourseScheduleForm({ courseId, onSuccess, scheduleId }: any) {
   const [form] = Form.useForm();
   const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);

   const initialChapters = [{ name: '', content: '' }];
   const initialClassTime = [{ weekday: '', time: '' }];
   const initialScheduleValue = {
      chapters: initialChapters,
      classTime: initialClassTime
   };

   const onFinish = (values: ChapterFormValue) => {
      const formattedChapters = values.chapters.map((item, index) => ({
         ...item,
         order: index + 1
      }));

      const formattedClassTime = values.classTime.map((item) => `${item.weekday} ${moment(item.time).format('hh:mm:ss')}`);

      const req: ScheduleRequest = {
         chapters: formattedChapters,
         classTime: formattedClassTime,
         scheduleId: scheduleId,
         courseId: courseId
      };

      updateSchedule(req).then(() => onSuccess());
   };

   useEffect(() => {
      if (scheduleId) {
         getScheduleById(scheduleId).then((res) => {
            if (res.data.data) {
               const chapters = res.data.data.chapters.length ? res.data.data.chapters : initialChapters;
               const classTime = res.data.data.classTime
                  ? res.data.data.classTime.map((item: { split: (arg0: string) => [any, any] }) => {
                       const [weekday, time] = item.split(' ');
                       return { weekday, time: moment(time, 'hh-mm-ss') };
                    })
                  : initialClassTime;
               form.setFieldsValue({ chapters, classTime });
               setSelectedWeekdays(classTime.map((item: { weekday: any }) => item.weekday));
            }
         });
      } else {
         form.setFieldsValue(initialScheduleValue);
      }
   }, [scheduleId]);

   return (
      <Form form={form} name="schedule" onFinish={onFinish}>
         <h2>Chapter Detail</h2>
         <Row gutter={gutter}>
            <Col span={12}>
               <Form.List name="chapters">
                  {(fields, { add, remove }) => (
                     <>
                        {fields.map((field) => (
                           <Row key={field.key} gutter={20}>
                              <Col span={8}>
                                 <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.key, 'name']} rules={[{ required: true }]}>
                                    <Input size="large" placeholder="Chapter Name" />
                                 </Form.Item>
                              </Col>
                              <Col span={12}>
                                 <Form.Item {...field} name={[field.name, 'content']} fieldKey={[field.key, 'content']} rules={[{ required: true }]}>
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
                                 <Form.Item {...field} name={[field.name, 'weekday']} fieldKey={[field.key, 'weekday']} rules={[{ required: true }]}>
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
                                 <Form.Item {...field} name={[field.name, 'time']} fieldKey={[field.key, 'time']} rules={[{ required: true }]}>
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
