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
  courses: Course[];
}

export interface Type {
  id: number;
  name: string;
}

export interface Course {
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
