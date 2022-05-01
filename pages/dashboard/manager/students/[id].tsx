import { Avatar, Card, Col, Divider, PageHeader, Row, Table, Tabs, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { AntDesignOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Student } from '../../../../lib/types/students.type';
import { getStudents } from '../../../../lib/api/students.api';
import Dashboard from '../../../../components/Dashboard';

export default function StudentDetail() {
  const [data, setData] = useState<Student[]>([]);

  useEffect(() => {
    getStudents()
      .then((response) => {
        console.log(`[fetch success]`, response);
        setData(response.data.data.students);
      })
      .catch((error) => {
        console.log(`[unknown error]`, error);
      });
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

  function callback(key: any) {
    console.log(key);
  }

  const columns: ColumnType<Student>[] = [
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
      title: 'Student Type',
      dataIndex: 'type',
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
          <Col flex={1}>
            <Card style={{ marginRight: '20px' }}>
              <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} icon={<AntDesignOutlined />} />
              <Divider />
              <Row>
                <Col span={12}>
                  <p>Card content</p>
                </Col>
                <Col span={12}>
                  <p>Card content</p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <p>Card content</p>
                </Col>
                <Col span={12}>
                  <p>Card content</p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <p>Card content</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col flex={4}>
            <Card>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <Tabs.TabPane tab="About" key="1">
                  <h2>Information</h2>
                  <Row>
                    <Col span={6}>
                      <p>Card content</p>
                    </Col>
                    <Col span={18}>
                      <p>Card content</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p>Card content</p>
                    </Col>
                    <Col span={18}>
                      <p>Card content</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p>Card content</p>
                    </Col>
                    <Col span={18}>
                      <p>Card content</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p>Card content</p>
                    </Col>
                    <Col span={18}>
                      <p>Card content</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p>Card content</p>
                    </Col>
                    <Col span={18}>
                      <p>Card content</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p>Card content</p>
                    </Col>
                    <Col span={18}>
                      <p>Card content</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <p>Card content</p>
                    </Col>
                    <Col span={18}>
                      <p>Card content</p>
                    </Col>
                  </Row>

                  <h2>Interesting</h2>
                  <Row>
                    <Col span={24}>
                      <div>
                        <Tag color="magenta">magenta</Tag>
                        <Tag color="red">red</Tag>
                        <Tag color="volcano">volcano</Tag>
                        <Tag color="orange">orange</Tag>
                        <Tag color="gold">gold</Tag>
                        <Tag color="lime">lime</Tag>
                        <Tag color="green">green</Tag>
                        <Tag color="cyan">cyan</Tag>
                        <Tag color="blue">blue</Tag>
                        <Tag color="geekblue">geekblue</Tag>
                        <Tag color="purple">purple</Tag>
                      </div>
                    </Col>
                  </Row>

                  <h2 style={{ marginTop: '15px' }}>Description</h2>
                  <Row>
                    <Col span={24}>
                      <p>Card content</p>
                    </Col>
                  </Row>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Courses" key="2">
                  <Table columns={columns} dataSource={data} />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </Dashboard>
  );
}
