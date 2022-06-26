import { MessagesRequest } from '../model/message';
import { axiosApi } from './base.api';

export function getMessages(req: MessagesRequest) {
   const result = axiosApi({
      url: '/message',
      method: 'get',
      params: req
   });
   return result;
}

export function getMessageStatistic(userId?: number) {
   const result = axiosApi({
      url: '/message/statistics',
      method: 'get'
   });
   return result;
}

export function messageEvent() {
   return new EventSource(`http://cms.chtoma.com/api/message/subscribe?userId=3`, {
      withCredentials: true
   });
}

export function markAsRead(ids) {
   const result = axiosApi({
      url: '/message',
      method: 'put',
      params: {
         id: ids
      },
      data: {
         status: 1
      }
   });
   return result;
}
