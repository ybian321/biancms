import { useEffect, useState } from 'react';
import { Avatar, Divider, List, Space, Spin } from 'antd';
import { AlertOutlined, MessageOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMessages } from '../../lib/api/message.api';
import { Message, MessagesRequest } from '../../lib/model/message';

export default function MessageList(props) {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<Message[]>([]);

   const req: MessagesRequest = {
      userId: 3,
      status: 1,
      type: props.type,
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
   }, [props.type]);

   function setMessage(source: any) {
      return (
         <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<p>{source.from.nickname}</p>}
            description={source.content}
         />
      );
   }

   return (
      <div id="msg-container" style={{ padding: '0 20px', overflowY: 'scroll', maxHeight: '75vh' }}>
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
            <List
               dataSource={data}
               renderItem={(item) => (
                  <List.Item
                     key={item.createdAt}
                     style={{ opacity: item.status ? 0.4 : 1 }}
                     // eslint-disable-next-line react/jsx-key
                     actions={[<Space>{item.createdAt}</Space>]}
                     extra={<Space>{item.type === 'notification' ? <AlertOutlined /> : <MessageOutlined />}</Space>}
                  >
                     {setMessage(item)}
                  </List.Item>
               )}
            />
         </InfiniteScroll>
      </div>
   );
}
