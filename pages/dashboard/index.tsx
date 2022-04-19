import { Button, Layout } from 'antd'
import { useState } from 'react'
import SiderNav from '../../components/SiderNav'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import React from 'react'
import Manager from './manager'
import BreadcrumbCMS from '../../components/BreadcrumbCMS'
import Logout from '../../components/Logout'

const { Header, Footer, Sider, Content } = Layout

export default function Dashboard() {
  const [collapsed, setCollapse] = useState(false)
  const [crumbs, setCrumbs] = useState(['Home', 'Category', 'Sub Category'])
  const selected = (crumb: any) => {
    console.log(crumb)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapse}>
        <div className="logo" />
        <SiderNav />
      </Sider>

      <Layout>
        <Header>
          <Button
            type="primary"
            onClick={() => setCollapse(!collapsed)}
            style={{ marginBottom: 16 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </Button>
          <Logout />
        </Header>

        <Content style={{ padding: '0 50px' }}>
          {/* <BreadcrumbCMS crumb={crumbs} selected={selected} /> */}
          <Manager />
        </Content>

        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}
