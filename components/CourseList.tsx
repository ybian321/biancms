import { Button, Card, Divider, List, Skeleton } from 'antd';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { useEffect, useState } from 'react';
import { getCourses } from '../lib/api/course';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Course } from '../lib/types/courses.type';

function CourseList() {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<Course[]>([]);

   useEffect(() => {
      (async () => {
         getCourses().then((response) => setData(response.data.data.courses));
      })();
   }, []);

   const loadMoreData = () => {
      if (loading) {
         return;
      }
      setLoading(true);
      getCourses()
         .then((res) => res.json())
         .then((body) => {
            setData([...data, body.data.data.courses]);
            setLoading(false);
         })
         .catch(() => {
            setLoading(false);
         });
   };

   useEffect(() => {
      loadMoreData();
   }, []);

   function setCourseCard(source: any) {
      console.log(source);
      return source.map((item: any) => (
         <Card style={{ marginBottom: '20px' }} key={item.id} hoverable cover={<img alt="placeholder" src="placeholder.png" />}>
            <Meta title={item.name} style={{ marginBottom: '10px' }} />
            <div className="card-item">
               <span>{item.createdAt}</span>
               <b>
                  <HeartFilled style={{ color: 'red', marginRight: '5px' }} />
                  {item.star}
               </b>
            </div>
            <div className="card-item">
               <span>Duration:</span>
               <b>{item.duration} years</b>
            </div>
            <div className="card-item">
               <span>Teacher:</span>
               <b className="text-blue">{item.teacherName}</b>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '15px' }}>
               <span>
                  <UserOutlined style={{ color: 'rgb(24, 144, 255)', marginRight: '5px' }} />
                  Student Limit:
               </span>
               <b>{item.maxStudents}</b>
            </div>
            <Button type="primary">Read More</Button>
         </Card>
      ));
   }

   return (
      <>
         <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
         >
            <List grid={{ gutter: 16, column: 4 }} dataSource={data} renderItem={(item) => <List.Item>{setCourseCard(data)}</List.Item>} />
         </InfiniteScroll>
      </>
   );
}

export default CourseList;
