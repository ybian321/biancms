import React from 'react';
import { useState } from 'react';
import { Affix, BackTop, Button, Dropdown, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, BellOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import Logout from './Logout';
import SmartSiderNav from './SmartSiderNav';
import SmartBreadcrumb from './SmartBreadcrumb';
import useLoginState from './custom-hooks/useLoginState';

const { Header, Footer, Sider, Content } = Layout;

export default function DashboardLayout({ children }: React.PropsWithChildren<any>) {
   useLoginState();
   const [collapsed, setCollapse] = useState(false);

   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Affix offsetTop={0} style={{ backgroundColor: '#001529' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapse}>
               <div className="logo">CMS</div>
               <SmartSiderNav />
            </Sider>
         </Affix>

         <Layout>
            <Affix offsetTop={0}>
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
            </Affix>

            <Content style={{ padding: '0 20px' }}>
               <SmartBreadcrumb />

               <div className="site-layout-content">{children}</div>
            </Content>

            <Footer></Footer>
         </Layout>
      </Layout>
   );
}
