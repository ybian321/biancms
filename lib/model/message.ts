import { Paginator } from './api.type';

export interface Message {
   createdAt: string;
   id: number;
   content: string;
   status: number;
   from: Omit<User, 'email'>;
   type: MessageType;
}

export type MessageType = 'notification' | 'message';

export interface User {
   id: number;
   email: string;
   role: string;
   nickname: string;
}

export interface MessagesRequest extends Paginator {
   userId: number;
   status?: number; // 0: unread 1: read;
   type: MessageType;
}
