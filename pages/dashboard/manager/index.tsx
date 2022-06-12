import { Card, Col, Progress, Row, Select } from 'antd';
import { DeploymentUnitOutlined, ReadOutlined, SolutionOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { OverviewProps } from '../../../lib/api/common.api';
import { getStatistics, getStatisticsOverview } from '../../../lib/api/statistics.api';
import { CourseClassTimeStatistic, CourseStatistics, Statistic, StatisticsOverviewResponse, StatisticsResponse } from '../../../lib/model/statistics';
import { StudentWithProfile } from '../../../lib/model/students.type';
import { Teacher, TeacherProfile } from '../../../lib/model/teachers.type';
import { Course, Schedule } from '../../../lib/model/courses.type';
import { Role } from '../../../lib/constant/role';
import { gutter } from '../../../lib/constant/config';
import { OverviewCol, OverviewIconCol } from '../../../components/common/styledAntdComponents';
import PieChart from '../../../components/overview/PieChart';
import LineChart from '../../../components/overview/LineChart';
import BarChart from '../../../components/overview/BarChart';
import HeatTable from '../../../components/overview/HeatTable';

type StudentStatistics = StatisticsResponse<StudentWithProfile>;

type TeacherStatistics = StatisticsResponse<Teacher & TeacherProfile>;

const Overview = ({ data, title, icon, style }: OverviewProps) => {
   const lastMonthAddedPercent = +parseFloat(String((data.lastMonthAdded / data.total) * 100)).toFixed(1);

   return (
      <Card style={{ borderRadius: 5, cursor: 'pointer', ...style }}>
         <Row>
            <OverviewIconCol span={6}>{icon}</OverviewIconCol>
            <OverviewCol span={18}>
               <h3>{title}</h3>
               <h2>{data.total}</h2>
               <Progress percent={100 - lastMonthAddedPercent} size="small" showInfo={false} strokeColor="white" trailColor="lightgreen" />
               <p>{`${lastMonthAddedPercent + '%'} Increase in 30 Days`}</p>
            </OverviewCol>
         </Row>
      </Card>
   );
};

/**
 * 使用地图时无法进行server side rendering, 子组件需要获取地图数据
 */
const DistributionWithNoSSR = dynamic(() => import('../../../components/overview/MapChart'), {
   ssr: false
});

export default function ManagerDashboard() {
   const [overview, setOverview] = useState<StatisticsOverviewResponse>();
   const [studentStatistics, setStudentStatistics] = useState<StudentStatistics>();
   const [teacherStatistics, setTeacherStatistics] = useState<TeacherStatistics>();
   const [courseStatistics, setCourseStatistics] = useState<CourseStatistics>();
   const [distributionRole, setDistributionRole] = useState<string>(Role.student);
   const [selectedType, setSelectedType] = useState<string>('studentType');

   useEffect(() => {
      getStatisticsOverview().then((res) => {
         const { data } = res.data;
         setOverview(data);
      });

      getStatistics<StudentWithProfile>(Role.student).then((res) => {
         const { data } = res.data;
         setStudentStatistics(data);
      });

      getStatistics<TeacherProfile & Teacher>(Role.teacher).then((res) => {
         const { data } = res.data;
         setTeacherStatistics(data);
      });

      getStatistics<Course & Schedule, CourseClassTimeStatistic>('course').then((res) => {
         const { data } = res.data;
         setCourseStatistics(data);
      });
   }, []);

   return (
      <>
         {overview && (
            <Row align="middle" gutter={[24, 16]}>
               <Col span={8}>
                  <Overview title="TOTAL STUDENTS" data={overview.student} icon={<SolutionOutlined />} style={{ background: '#1890ff' }} />
               </Col>

               <Col span={8}>
                  <Overview title="TOTAL TEACHERS" data={overview.teacher} icon={<DeploymentUnitOutlined />} style={{ background: '#673bb7' }} />
               </Col>

               <Col span={8}>
                  <Overview title="TOTAL COURSES" data={overview.course} icon={<ReadOutlined />} style={{ background: '#ffaa16' }} />
               </Col>
            </Row>
         )}

         <Row gutter={gutter} style={{ marginTop: 30 }}>
            <Col span={12}>
               <Card
                  title="Distribution"
                  extra={
                     <Select defaultValue="student" onSelect={setDistributionRole} bordered={false}>
                        <Select.Option value={Role.student}>Student</Select.Option>
                        <Select.Option value={Role.teacher}>Teacher</Select.Option>
                     </Select>
                  }
               >
                  <DistributionWithNoSSR
                     data={(distributionRole === Role.student ? studentStatistics?.country : teacherStatistics?.country) as Statistic[]}
                     title={distributionRole}
                  />
               </Card>
            </Col>

            <Col span={12}>
               <Card
                  title="Types"
                  extra={
                     <Select defaultValue={selectedType} bordered={false} onSelect={setSelectedType}>
                        <Select.Option value="studentType">Student Type</Select.Option>
                        <Select.Option value="courseType">Course Type</Select.Option>
                        <Select.Option value="gender">Gender</Select.Option>
                     </Select>
                  }
               >
                  {selectedType === 'studentType' ? (
                     <PieChart data={studentStatistics?.type as Statistic[]} title={selectedType} />
                  ) : selectedType === 'courseType' ? (
                     <PieChart data={courseStatistics?.type as Statistic[]} title={selectedType} />
                  ) : (
                     <Row gutter={16}>
                        <Col span={12}>
                           <PieChart
                              data={Object.entries(overview.student.gender).map(([name, amount]) => ({
                                 name,
                                 amount
                              }))}
                              title="student gender"
                           />
                        </Col>

                        <Col span={12}>
                           <PieChart
                              data={Object.entries(overview.teacher.gender).map(([name, amount]) => ({
                                 name,
                                 amount
                              }))}
                              title="teacher gender"
                           />
                        </Col>
                     </Row>
                  )}
               </Card>
            </Col>
         </Row>

         <Row gutter={gutter} style={{ marginTop: 15 }}>
            <Col span={12}>
               <Card title="Increment">
                  <LineChart
                     data={{
                        [Role.student]: studentStatistics?.createdAt as Statistic[],
                        [Role.teacher]: teacherStatistics?.ctime as Statistic[],
                        course: courseStatistics?.createdAt as Statistic[]
                     }}
                  />
               </Card>
            </Col>

            <Col span={12}>
               <Card title="Languages">
                  <BarChart
                     data={{
                        interest: studentStatistics?.interest as Statistic[],
                        teacher: teacherStatistics?.skills as Statistic[]
                     }}
                  />
               </Card>
            </Col>
         </Row>

         <Row gutter={gutter} style={{ marginTop: 15 }}>
            <Col span={24}>
               <Card title="Course Schedule">
                  <HeatTable data={courseStatistics?.classTime as CourseClassTimeStatistic[]} title="Course schedule per weekday" />
               </Card>
            </Col>
         </Row>
      </>
   );
}
