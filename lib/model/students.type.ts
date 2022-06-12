import { BaseType } from './api.type';
import { Course, CourseType } from './courses.type';

export interface Data {
   total: number;
   students: Student[];
   paginator: Paginator;
}

export interface Student {
   createdAt: string;
   updatedAt: string;
   id: number;
   email: string;
   name: string;
   country: string;
   profileId: number;
   type: Type;
   courses: StudentCourse[];
}

export interface Type {
   id: number;
   name: string;
}

export interface StudentCourse {
   id: number;
   courseId: number;
   name: string;
}

export interface Paginator {
   page: number;
   limit: number;
}

export interface StudentProfile {
   id: number;
   name: string;
   country: string;
   email: string;
   address: string;
   phone: number;
   gender: number;
   education: string;
   age: number;
   interest: string[];
   avatar: string;
   memberStartAt: string;
   memberEndAt: string;
   description: string;
}

export interface AddStudentRequest {
   name: string;
   country: string;
   email: string;
   type: number;
}

export interface StudentWithProfile extends Student<Course>, StudentProfile {}

export interface Student<T = CourseType> {
   id: number;
   name: string;
   updateAt: string;
   country: string;
   ctime: string;
   email: string;
   courses: StudentCourse[];
   type: Type;
}
