import { Avatar, Button, Card, Col, Divider, List, Row, Select, Space, Spin, Typography } from 'antd';
import { MessageType } from 'antd/lib/message';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMessages } from '../../../lib/api/message.api';
import { Message, MessagesRequest } from '../../../lib/model/message';
import { AlertOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { flatten } from 'lodash';
import { format } from 'date-fns';
import Meta from 'antd/lib/card/Meta';

type DataSource = [string, Message[]][];

export default function MessagePage() {
   const [loading, setLoading] = useState(false);
   const [type, setType] = useState<MessageType>();
   const [source, setSource] = useState<{ [key: string]: Message[] }>({});
   const [data, setData] = useState<Message[]>([]);

   const req: MessagesRequest = {
      userId: 3,
      status: 1,
      type: 'notification',
      page: 1,
      limit: 50
   };

   const loadMoreData = () => {
      if (loading) {
         return;
      }
      setLoading(true);
      getMessages(req).then((response) => {
         setData([...data, ...response.data.data.messages]);
         setLoading(false);
      });
   };

   useEffect(() => {
      (async () => {
         getMessages(req).then((response) => {
            setData(response.data.data.messages);
         });
         loadMoreData();
      })();
   }, []);

   function setMessage(source: any) {
      return (
         <>
            <List.Item.Meta
               avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
               title={<p>{source.from.nickname}</p>}
               description={source.content}
            />
            <p>{source.createdAt}</p>
         </>
      );
   }

   function MessageList() {
      return (
         <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={
               <Divider plain>
                  <Spin />
               </Divider>
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
         >
            <List dataSource={data} renderItem={(item) => <List.Item>{setMessage(item)}</List.Item>} />
         </InfiniteScroll>
      );
   }

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
            {MessageList()}
         </div>
      </>
   );
}
