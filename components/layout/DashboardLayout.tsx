import React from 'react';
import { useState } from 'react';
import { Affix, Button, Col, Dropdown, Layout, Tabs } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import Logout from '../common/Logout';
import SmartSiderNav from './SmartSiderNav';
import SmartBreadcrumb from './SmartBreadcrumb';
import useLoginState from '../custom-hooks/useLoginState';
import Link from 'next/link';
import styled from 'styled-components';

const { Header, Footer, Sider, Content } = Layout;

const MessageContainer = styled.div`
   height: 380px;
   overflow-y: scroll;
   overflow-x: hidden;
`;

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
                     <Dropdown
                        overlayStyle={{
                           background: '#fff',
                           borderRadius: 4,
                           width: 400,
                           height: 500,
                           overflow: 'hidden'
                        }}
                        placement="bottomRight"
                        trigger={['click']}
                        overlay={
                           <>
                              <Tabs>
                                 <Tabs.TabPane>
                                    <MessageContainer></MessageContainer>
                                 </Tabs.TabPane>
                              </Tabs>

                              <Footer>
                                 <Col span={12}>
                                    <Button>Mark all as read</Button>
                                 </Col>
                                 <Col span={12}>
                                    <Button>
                                       <Link href={''}>View history</Link>
                                    </Button>
                                 </Col>
                              </Footer>
                           </>
                        }
                     >
                        <BellOutlined style={{ fontSize: 24, margin: '0 20px', color: 'white' }} />
                     </Dropdown>

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
