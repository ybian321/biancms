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
