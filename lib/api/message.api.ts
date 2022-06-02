import { MessagesRequest } from '../model/message';
import { axiosApi } from './base.api';

export function getMessages(req: MessagesRequest) {
   const result = axiosApi({
      url: '/message',
      method: 'get'
   });
   return result;
}
