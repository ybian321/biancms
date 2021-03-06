import { axiosApi } from './base.api';

export function getTeachers(req: string) {
   const result = axiosApi({
      url: 'teachers',
      method: 'get',
      params: {
         query: req,
         page: 1,
         limit: 200
      }
   });
   return result;
}

export function getTeacherById(id: number) {
   const result = axiosApi({
      url: 'teachers' + id,
      method: 'get'
   });
   return result;
}
