import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const instance = axios.create({
   baseURL: 'http://cms.chtoma.com/api',
   withCredentials: true,
   responseType: 'json'
});

instance.interceptors.request.use(
   function (config: AxiosRequestConfig): AxiosRequestConfig {
      if (config.url != '/login') {
         const auth = { Authorization: `Bearer ${localStorage.getItem('token')}` };
         config.headers = auth;
      }
      return config;
   },
   function (error: AxiosError): Promise<AxiosError> {
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
