import { Cascader, Col, Input, Row, Select, Spin, Tabs } from 'antd';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import CourseDetailForm from '../../../../components/course/CourseDetailForm';
import CourseScheduleForm from '../../../../components/course/CourseScheduleForm';
import { getCourses } from '../../../../lib/api/course.api';
import { gutter } from '../../../../lib/constant/config';
import { Course } from '../../../../lib/model/courses.type';

const { Option } = Select;

export default function EditCoursePage() {
   const router = useRouter();

   const [isSearching, setIsSearching] = useState(false);
   const [searchBy, setSearchBy] = useState<'uid' | 'name' | 'type'>('uid');
   const [searchResult, setSearchResult] = useState<Course[]>([]);
   const [course, setCourse] = useState<Course>();

   const search = useCallback(
      debounce((value: string, cb?: (courses?: Course[]) => void) => {
         if (!value) {
            return;
         }

         setIsSearching(true);

         getCourses({ [searchBy]: value, userId: storage.userId })
            .then((res) => {
               const { data } = res;

               if (!!data) {
                  setSearchResult(data.courses);
                  if (!!cb) {
                     cb(data.courses);
                  }
               }
            })
            .finally(() => setIsSearching(false));
      }, 1000),
      [searchBy]
   );

   useEffect(() => {
      const { uid } = router.query;

      if (uid) {
         search(uid as string, (courses) => {
            setCourse(courses[0]);
         });
      }
   }, []);

   return (
      <>
         <Row gutter={gutter} style={{ marginBottom: 30 }}>
            <Col span={12}>
               <Input.Group compact style={{ display: 'flex' }}>
                  <Select defaultValue="uid" onChange={(value) => setSearchBy(value)}>
                     <Option value="uid">Code</Option>
                     <Option value="name">Name</Option>
                     <Option value="type">Category</Option>
                  </Select>
                  <Select
                     placeholder={`Search course by ${searchBy}`}
                     notFoundContent={isSearching ? <Spin size="small" /> : null}
                     filterOption={false}
                     showSearch
                     onSearch={(value) => search(value)}
                     style={{ flex: 1 }}
                     onSelect={(id: number) => {
                        const course = searchResult.find((item) => item.id === id);

                        setCourse(course);
                     }}
                  >
                     {searchResult.map(({ id, name, teacherName, uid }) => (
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
               <CourseDetailForm />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Course Schedule" key="2">
               <CourseScheduleForm />
            </Tabs.TabPane>
         </Tabs>
      </>
   );
}
