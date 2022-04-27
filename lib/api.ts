import { message } from 'antd';
import axios from 'axios';
import router from 'next/router';

const instance = axios.create({
  baseURL: 'http://cms.chtoma.com/api'
});

export async function getLoginToken(url: string, params: object, config: object) {
  await instance
    .post(url, params, config)
    .then((response) => {
      localStorage.setItem('token', response.data.data.token);
      router.push(`/dashboard/${response.data.data.role}`);
    })
    .catch((error) => {
      console.log(error);
      message.error('Please select a login type.');
    });
  return;
}

export async function reqLogout(reqConfig: any) {
  await instance(reqConfig)
    .then((response) => {
      console.log(response);
      router.push('/');
    })
    .catch((error) => {
      console.log(error);
      message.error('Unknown Error');
    });
  return;
}

export async function api(reqConfig: any) {
  await instance(reqConfig)
    .then((response) => {
      console.log(response);
      message.success('This is a success message.');
    })
    .catch((error) => {
      console.log(error);
      message.error('Unknown Error');
    });
  return;
}
