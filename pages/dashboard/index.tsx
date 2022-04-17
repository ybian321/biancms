import { Breadcrumb, Button, Layout } from 'antd'
import { useState } from 'react'
import SiderNav from '../../components/SiderNav'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import React from 'react'
import Manager from './manager'

const { Header, Footer, Sider, Content } = Layout

export default function Dashboard() {
  const [collapsed, setCollapse] = useState(false)

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
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Manager />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}
