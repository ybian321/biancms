import React from 'react';
import { useState } from 'react';
import { Affix, Button, Col, Dropdown, Layout, Row, Tabs } from 'antd';
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

const TabNavContainer = styled.div`
   margin-bottom: 0;
   padding: 10px 20px 0 20px;
   .ant-tabs-nav-list {
      width: 100%;
      justify-content: space-around;
   }
`;

const TabPane = styled(Tabs.TabPane)`
   position: relative;
   .ant-list-item {
      padding: 10px 20px;
      cursor: pointer;
      &:hover {
         background: #1890ff45;
      }
   }
   .ant-list-item-meta-title {
      margin-bottom: 0;
   }
   .ant-list-item-action {
      margin: 0 0 0 48px;
   }
   .ant-list-item-meta-avatar {
      align-self: flex-end;
   }
   .ant-list-item-meta-description {
      margin: 5px 0;
      white-space: normal;
      display: -webkit-box;
      max-height: 3em;
      max-width: 100%;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
   }
   .ant-list-item-meta {
      margin-bottom: 0;
   }
`;

const DropdownFooter = styled(Row)`
   height: 50px;
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   border-radius: 0 0 4px 4px;
   border: 1px solid #f0f0f0;
   border-left: none;
   border-right: none;
   background: #fff;
   z-index: 9;
   .ant-col {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
         box-shadow: 1px 0 0 0 #f0f0f0;
      }
   }
   button {
      border: none;
   }
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

                  <div className="item-center">
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
                              <Tabs
                                 renderTabBar={(props, DefaultTabBar) => (
                                    <TabNavContainer>
                                       <DefaultTabBar {...props} />
                                    </TabNavContainer>
                                 )}
                                 animated
                              >
                                 <TabPane key={'notification'} tab={'notification'}>
                                    <MessageContainer></MessageContainer>
                                 </TabPane>
                                 <TabPane key={'message'} tab={'message'}>
                                    <MessageContainer></MessageContainer>
                                 </TabPane>
                              </Tabs>

                              <DropdownFooter>
                                 <Col span={12}>
                                    <Button>Mark all as read</Button>
                                 </Col>
                                 <Col span={12}>
                                    <Button>
                                       <Link href={''}>View history</Link>
                                    </Button>
                                 </Col>
                              </DropdownFooter>
                           </>
                        }
                     >
                        <BellOutlined style={{ fontSize: 24, marginRight: 20, color: 'white' }} />
                     </Dropdown>

                     <Dropdown overlay={<Logout />} placement="bottomLeft">
                        <Button shape="circle" icon={<UserOutlined />} />
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
