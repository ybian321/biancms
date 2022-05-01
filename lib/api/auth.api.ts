import { AES } from 'crypto-js';
import { axiosApi } from './base.api';

export function loginAuth(props: any) {
  const result = axiosApi({
    url: '/login',
    method: 'post',
    data: {
      email: props.email,
      password: AES.encrypt(props.password, 'cms').toString(),
      role: props.type
    }
  });
  return result;
}

export function logoutAuth() {
  const result = axiosApi({
    url: '/logout',
    method: 'post'
  });
  return result;
}
