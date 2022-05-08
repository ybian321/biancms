import React from 'react';
import { useState } from 'react';
import { Button, Dropdown, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import Logout from '../components/Logout';
import SmartSiderNav from './SmartSiderNav';
import SmartBreadcrumb from './SmartBreadcrumb';

const { Header, Footer, Sider, Content } = Layout;

export default function Dashboard({ children }: React.PropsWithChildren<any>) {
  const [collapsed, setCollapse] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapse}>
        <div className="logo">CMS</div>
        <SmartSiderNav />
      </Sider>

      <Layout>
        <Header className="flex-container">
          <Button type="link" size="large" style={{ color: 'white' }} onClick={() => setCollapse(!collapsed)}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>

          <div>
            <Button type="link" size="large" style={{ margin: '0 20px', color: 'white' }} icon={<BellOutlined />}></Button>
            <Dropdown overlay={<Logout />} placement="bottomLeft">
              <Button shape="circle" icon={<UserOutlined />}></Button>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ padding: '0 20px' }}>
          <SmartBreadcrumb />
          {children}
        </Content>

        <Footer></Footer>
      </Layout>
    </Layout>
  );
}
