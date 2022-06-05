import { useEffect, useState } from 'react';
import { Button, Card, Divider, List, Spin } from 'antd';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Course } from '../../../../lib/model/courses.type';
import { getCourses } from '../../../../lib/api/course.api';
import BackToTop from '../../../../components/common/BackToTop';

export default function AllCoursesPage() {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<Course[]>([]);

   const loadMoreData = () => {
      if (loading) {
         return;
      }
      setLoading(true);
      getCourses().then((response) => {
         setData([...data, ...response.data.data.courses]);
         setLoading(false);
      });
   };

   useEffect(() => {
      (async () => {
         getCourses().then((response) => setData(response.data.data.courses));
         loadMoreData();
      })();
   }, []);

   function setCourseCard(source: any) {
      return (
         <Card style={{ marginBottom: '20px' }} key={source.id} hoverable cover={<img alt="placeholder" src="/placeholder.png" />}>
            <Meta title={source.name} style={{ marginBottom: '10px' }} />
            <div className="card-item">
               <span>{source.createdAt}</span>
               <b>
                  <HeartFilled style={{ color: 'red', marginRight: '5px' }} />
                  {source.star}
               </b>
            </div>
            <div className="card-item">
               <span>Duration:</span>
               <b>{source.duration} years</b>
            </div>
            <div className="card-item">
               <span>Teacher:</span>
               <b className="text-blue">{source.teacherName}</b>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '15px' }}>
               <span>
                  <UserOutlined style={{ color: 'rgb(24, 144, 255)', marginRight: '5px' }} />
                  Student Limit:
               </span>
               <b>{source.maxStudents}</b>
            </div>
            <Button type="primary" href={`/dashboard/manager/courses/${source.id}`}>
               Read More
            </Button>
         </Card>
      );
   }

   return (
      <>
         <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={
               <Divider plain>
                  <Spin />
               </Divider>
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
         >
            <List
               grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }}
               dataSource={data}
               renderItem={(item) => <List.Item>{setCourseCard(item)}</List.Item>}
            />
         </InfiniteScroll>

         <BackToTop />
      </>
   );
}
