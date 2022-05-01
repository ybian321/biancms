import { Avatar, Card, Col, Divider, PageHeader, Row, Table, Tabs, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { AntDesignOutlined } from '@ant-design/icons';
import { Key, useEffect, useState } from 'react';
import { Course, Student } from '../../../../lib/types/students.type';
import { getStudentDetail } from '../../../../lib/api/students.api';
import Dashboard from '../../../../components/Dashboard';

export default function StudentDetail() {
  const [data, setData] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [info, setInfo] = useState<{ label: string; value: string | number }[]>([]);
  const [about, setAbout] = useState<{ label: string; value: string | number }[]>([]);

  useEffect(() => {
    (async () => {
      const currentUrl = window.location.href;
      const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      await getStudentDetail(id)
        .then((response) => {
          console.log(`[fetch detail success]`, response);
          setData(response.data.data);
          setCourses(response.data.data.courses);

          const info = [
            { label: 'Name', value: data.name },
            { label: 'Age', value: data.age },
            { label: 'Email', value: data.email },
            { label: 'Phone', value: data.phone }
          ];

          const about = [
            { label: 'Eduction', value: data.education },
            { label: 'Area', value: data.country },
            { label: 'Gender', value: data.gender === 1 ? 'Male' : 'Female' },
            { label: 'Member Period', value: data.memberStartAt + ' - ' + data.memberEndAt },
            { label: 'Type', value: data.type.name },
            { label: 'Create Time', value: data.createAt },
            { label: 'Update Time', value: data.updateAt }
          ];

          setInfo(info);
          setAbout(about);
        })
        .catch((error) => {
          console.log(`[unknown error]`, error);
        });
    })();
  }, []);

  const routes = [
    {
      path: '/dashboard/manager',
      breadcrumbName: 'CMS MANAGER SYSTEM'
    },
    {
      path: '',
      breadcrumbName: 'Overview'
    },
    {
      path: '/dashboard/manager/students',
      breadcrumbName: 'Student List'
    },
    {
      path: '',
      breadcrumbName: 'Detail'
    }
  ];

  const columns: ColumnType<Course>[] = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: '10%',
      render: (_1: any, _2: any, index: number) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render(value) {
        return value.map((item: { name: any }) => item.name).join(',');
      },
      width: '25%'
    },
    {
      title: 'Join Time',
      dataIndex: 'createdAt',
      width: '40%'
    }
  ];

  return (
    <Dashboard>
      <PageHeader breadcrumb={{ routes }} style={{ margin: '10px 0' }} />

      <div className="site-layout-content">
        <Row>
          <Col span={8}>
            <Card style={{ marginRight: '20px' }}>
              <Avatar
                src={data?.avatar}
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
                style={{ display: 'block', margin: 'auto' }}
              />
              <Divider />
              <Row>
                {info.map((item) => (
                  <Col span={12} key={item.label} style={{ textAlign: 'center' }}>
                    <b>{item.label}</b>
                    <p>{item.value}</p>
                  </Col>
                ))}
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <b>Address</b>
                  <p>{data?.address}</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={16}>
            <Card>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="About" key="1">
                  <h2>Information</h2>
                  <Row>
                    {about.map((item) => (
                      <Col span={24} key={item.label}>
                        <b style={{ marginRight: 16, minWidth: 150, display: 'inline-block' }}>{item.label}:</b>
                        <span>{item.value}</span>
                      </Col>
                    ))}
                  </Row>

                  <h2>Interesting</h2>
                  <Row>
                    <Col span={24}>
                      <div>
                        {/* {data?.interest.map((item: { label: Key | null | undefined; })=>(
                          <Tag key={item.label} color="magenta">{item}</Tag>
                        ))} */}
                      </div>
                    </Col>
                  </Row>

                  <h2 style={{ marginTop: '15px' }}>Description</h2>
                  <Row>
                    <Col span={24}>
                      <p>{data.description}</p>
                    </Col>
                  </Row>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Courses" key="2">
                  <Table columns={columns} dataSource={courses} pagination={false} />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </Dashboard>
  );
}
