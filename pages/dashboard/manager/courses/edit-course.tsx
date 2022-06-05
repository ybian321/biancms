import { Col, Input, Row, Select, Spin, Tabs } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import CourseDetailForm from '../../../../components/course/CourseDetailForm';
import CourseScheduleForm from '../../../../components/course/CourseScheduleForm';
import { getCourse } from '../../../../lib/api/course.api';
import { gutter } from '../../../../lib/constant/config';
import { Course } from '../../../../lib/model/courses.type';

const { Option } = Select;

export default function EditCoursePage() {
   const [isSearching, setIsSearching] = useState(false);
   const [searchBy, setSearchBy] = useState<'uid' | 'name' | 'type'>('uid');
   const [searchResult, setSearchResult] = useState<Course[]>([]);
   const [course, setCourse] = useState<Course>();

   const search = useCallback(
      debounce((value: string) => {
         if (!value) {
            return;
         }

         setIsSearching(true);

         getCourse({ [searchBy]: value, userId: 3 })
            .then((res) => {
               const { data } = res;

               if (!!data) {
                  setSearchResult(data.data.courses);
                  setCourse(data.data.courses[0]);
               }
            })
            .finally(() => setIsSearching(false));
      }, 1000),
      [searchBy]
   );

   return (
      <>
         <Row gutter={gutter} style={{ marginBottom: 30 }}>
            <Col span={12}>
               <Input.Group compact style={{ display: 'flex' }}>
                  <Select defaultValue="uid" onChange={(value: any) => setSearchBy(value)}>
                     <Option value="uid">Code</Option>
                     <Option value="name">Name</Option>
                     <Option value="type">Category</Option>
                  </Select>

                  <Select
                     onSearch={(value) => search(value)}
                     showSearch
                     notFoundContent={isSearching ? <Spin size="small" /> : null}
                     placeholder={`Search course by ${searchBy}`}
                     style={{ flex: 1 }}
                     onSelect={(id: number) => {
                        const course = searchResult.find((item) => item.id === id);

                        setCourse(course);
                     }}
                  >
                     {searchResult?.map(({ id, name, teacherName, uid }) => (
                        <Select.Option key={id} value={id}>
                           {name} - {teacherName} - {uid}
                        </Select.Option>
                     ))}
                  </Select>
               </Input.Group>
            </Col>
         </Row>

         <Tabs type="card" defaultActiveKey="1" animated={true} size={'large'} style={{ marginBottom: 32 }}>
            <Tabs.TabPane tab="Course Detail" key="1">
               <CourseDetailForm course={course} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Course Schedule" key="2">
               <CourseScheduleForm courseId={course?.id} scheduleId={course?.scheduleId} />
            </Tabs.TabPane>
         </Tabs>
      </>
   );
}
