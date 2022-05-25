import { AddStudentRequest } from '../types/students.type';
import { axiosApi } from './base.api';

export function getStudents() {
   const result = axiosApi({
      url: '/students',
      method: 'get',
      params: {
         page: 1,
         limit: 20
      }
   });
   return result;
}

export function addStudent(props: AddStudentRequest) {
   const result = axiosApi({
      url: '/students',
      method: 'post',
      data: {
         name: props.name,
         email: props.email,
         country: props.country,
         type: props.type
      }
   });
   return result;
}

export function deleteStudentById(id: number) {
   const result = axiosApi({
      url: '/students/' + id,
      method: 'delete'
   });
   return result;
}

export function editStudentById(props: AddStudentRequest, id: number) {
   const result = axiosApi({
      url: '/students',
      method: 'put',
      data: {
         id: id,
         name: props.name,
         email: props.email,
         country: props.country,
         type: props.type
      }
   });
   return result;
}

export function searchStudentsByName(props: string) {
   const result = axiosApi({
      url: '/students',
      method: 'get',
      params: {
         query: props,
         page: 1,
         limit: 20
      }
   });
   return result;
}

export function getStudentDetail(id: string) {
   const result = axiosApi({
      url: '/students/' + id,
      method: 'get'
   });
   return result;
}
