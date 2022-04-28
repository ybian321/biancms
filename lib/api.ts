import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import router from 'next/router';

const instance = axios.create({
  baseURL: 'http://cms.chtoma.com/api',
  headers: { 'Access-Control-Allow-Origin': '*' }
});

instance.interceptors.request.use(
  function (config: AxiosRequestConfig): AxiosRequestConfig {
    console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
  },
  function (error: AxiosError): Promise<AxiosError> {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse): Promise<object[]> {
    console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
  },
  function (error: AxiosError): Promise<AxiosError> {
    console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  }
);

export async function API(reqConfig: AxiosRequestConfig) {
  await instance(reqConfig)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      message.error('Unknown Error');
    });
  return;
}

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
