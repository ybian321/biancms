import React from 'react'
import { Breadcrumb } from 'antd'

function BreadcrumbCMS(props) {
  // const role = localStorage.getItem("cms");
  console.log('role')

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item key="overview" href="/dashboard"></Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}

export default BreadcrumbCMS
