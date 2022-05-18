import { axiosApi } from './base.api';

export function getCourses() {
   const result = axiosApi({
      url: 'courses',
      method: 'get',
      params: {
         page: 1,
         limit: 20
      }
   });
   return result;
}

export function getCourseDetail(id: string) {
   const result = axiosApi({
      url: '/courses/detail',
      params: { id: id },
      method: 'get'
   });
   return result;
}
