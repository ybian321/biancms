import React from 'react'
import { Breadcrumb } from 'antd'

function BreadcrumbCMS() {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item key="overview" href="/dashboard">
          CMS MANAGER SYSTEM
        </Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}

export default BreadcrumbCMS
