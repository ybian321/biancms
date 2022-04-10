import { Col, Layout, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import type { NextPage } from 'next'
import Login from '../components/Login'

const Home: NextPage = () => {
  return (
    <Layout>
      <Content className="site-layout-content">      
        <Login/>
      </Content>
   </Layout>
  )
}

export default Home
