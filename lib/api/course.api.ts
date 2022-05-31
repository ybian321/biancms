import { IResponse } from '../model/api.type';
import { AddCourseRequest, AddCourseResponse, ScheduleRequest, UpdateCourseRequest, UpdateCourseResponse } from '../model/courses.type';
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
      url: '/courses/detail?id=' + id,
      method: 'get'
   });
   return result;
}

export function addCourse(req: AddCourseRequest) {
   const result = axiosApi({
      url: 'courses',
      method: 'post',
      data: req
   });
   return result;
}

export function updateSchedule(req: ScheduleRequest) {
   const result = axiosApi({
      url: 'courses/schedule',
      method: 'put',
      data: req
   });
   return result;
}

export function updateCourse(req: UpdateCourseRequest) {
   const result = axiosApi({
      url: 'courses',
      method: 'put',
      params: req
   });
   return result;
}

export function getCourseTypes() {
   const result = axiosApi({
      url: 'courses/type',
      method: 'get'
   });
   return result;
}

export function createCourseCode() {
   const result = axiosApi({
      url: 'courses/code',
      method: 'get'
   });
   return result;
}
