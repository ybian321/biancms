import React from 'react'
import { useState } from 'react'
import { Button, Dropdown, Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons'
import SiderNav from '../components/SiderNav'
import Logout from '../components/Logout'

const { Header, Footer, Sider, Content } = Layout

export default function Dashboard({ children }: React.PropsWithChildren<any>) {
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

          <Button style={{ border: 'none' }} icon={<BellOutlined />}></Button>
          {/* <Dropdown overlay={<Logout />} placement="bottomLeft">
            <Button shape="circle" icon={<UserOutlined />}></Button>
          </Dropdown> */}
        </Header>

        <Content style={{ padding: '0 50px' }}>{children}</Content>

        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}
