import { AddCourseRequest, CourseRequest, ScheduleRequest, UpdateCourseRequest } from '../model/courses.type';
import { axiosApi } from './base.api';

export function getCourses(req: Partial<CourseRequest>) {
   const result = axiosApi({
      url: 'courses',
      method: 'get',
      params: req
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

export function getScheduleById(id: number) {
   const result = axiosApi({
      url: 'courses/schedule?scheduleId=' + id,
      method: 'get'
   });
   return result;
}
