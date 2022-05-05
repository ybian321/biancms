import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://cms.chtoma.com/api'
});

instance.interceptors.request.use(
  function (config: AxiosRequestConfig): AxiosRequestConfig {
    console.info(`[request success]`);
    if (config.url != '/login') {
      const auth = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      config.headers = auth;
      console.log('header', config.headers);
    }
    return config;
  },
  function (error: AxiosError): Promise<AxiosError> {
    console.error(`[request error]`, error);
    return Promise.reject(error);
  }
);

export function axiosApi(reqConfig: AxiosRequestConfig) {
  const result = instance(reqConfig)
    .then((response) => {
      console.log(`[response success]`);
      return response;
    })
    .catch((error) => {
      console.log(`[response error]`, error.message);
      return error;
    });
  return result;
}
