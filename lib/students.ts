export interface Student {
  data: Data
  code: number
  msg: string
}

export interface Data {
  total: number
  students: Student[]
  paginator: Paginator
}

export interface Student {
  createdAt: string
  updatedAt: string
  id: number
  email: string
  name: string
  country: string
  profileId: number
  type: Type
  courses: Course[]
}

export interface Type {
  id: number
  name: string
}

export interface Course {
  id: number
  courseId: number
  name: string
}

export interface Paginator {
  page: number
  limit: number
}
