import { Avatar, Col, List, Row, Select, Space, Spin, Typography } from 'antd';
import { MessageType } from 'antd/lib/message';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMessages } from '../../../lib/api/message.api';
import { Message } from '../../../lib/model/message';
import { AlertOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { flatten } from 'lodash';

export default function MessagePage() {
   const [type, setType] = useState<MessageType>();
   // const { paginator, setPaginator, data, hasMore } = getMessages(req)
   const [source, setSource] = useState<{ [key: string]: Message[] }>({});

   return (
      <>
         <Row align="middle">
            <Col span={8}>
               <Typography.Title level={2}>Recent Messages</Typography.Title>
            </Col>

            <Col span={8} offset={8} style={{ textAlign: 'right' }}>
               <Select
                  defaultValue={null}
                  onSelect={(value: any) => {
                     setType(value);
                     setPaginator({ ...paginator, page: 1 });
                     setSource({});
                  }}
                  style={{ minWidth: 100 }}
               >
                  <Select.Option value={null}>All</Select.Option>
                  <Select.Option value="notification">Notification</Select.Option>
                  <Select.Option value="message">Message</Select.Option>
               </Select>
            </Col>
         </Row>

         <div id="msg-container" style={{ padding: '0 20px', overflowY: 'scroll', maxHeight: '75vh' }}>
            <InfiniteScroll
               loader={
                  <div style={{ textAlign: 'center' }}>
                     <Spin />
                  </div>
               }
               dataLength={flatten(Object.values(source)).length}
               endMessage={<div style={{ textAlign: 'center' }}>No more</div>}
               scrollableTarget="msg-container"
            >
               <List
                  itemLayout="vertical"
                  // dataSource={dataSource}
                  renderItem={([date, values]: [string, Message[]], index) => (
                     <>
                        <Space size="large">
                           <Typography.Title level={4}>{date}</Typography.Title>
                        </Space>
                        {values.map((item) => (
                           <List.Item
                              key={item.createdAt}
                              style={{ opacity: item.status ? 0.4 : 1 }}
                              // actions={[<Space>{item.createdAt}</Space>]}
                              extra={<Space>{item.type === 'notification' ? <AlertOutlined /> : <MessageOutlined />}</Space>}
                              onClick={() => {
                                 if (item.status === 1) {
                                    return;
                                 }
                              }}
                           >
                              <List.Item.Meta avatar={<Avatar icon={<UserOutlined />} />} title={item.from.nickname} description={item.content} />
                           </List.Item>
                        ))}
                     </>
                  )}
               ></List>
            </InfiniteScroll>
         </div>
      </>
   );
}
