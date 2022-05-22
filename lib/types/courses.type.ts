export interface Course {
   createdAt: Date;
   updatedAt: Date;
   id: number;
   cover: string;
   detail: string;
   duration: number;
   durationUnit: number;
   maxStudents: number;
   name: string;
   price: number;
   uid: string;
   star: number;
   startTime: Date;
   status: number;
   scheduleId: number;
   teacherId: number;
   type: CourseType[];
   teacherName: string;
}

export interface CourseDetail extends Course {
   teacher: CourseTeacher;
   schedule: Schedule;
   sales: Sales;
}

export interface Sales {
   id: number;
   batches: number;
   price: number;
   earnings: number;
   paidAmount: number;
   studentAmount: number;
   paidIds: number[];
}

export interface CourseType {
   id: number;
   name: string;
   courseId?: number;
}

export interface Schedule {
   id: number;
   status: number;
   current: number;
   classTime: string[];
   chapters: Chapter[];
}

export interface Chapter {
   name: string;
   id: number;
   content: string;
}

export interface CourseTeacher {
   createdAt: Date;
   updatedAt: Date;
   id: number;
   country: string;
   courseAmount: number;
   email: string;
   name: string;
   phone: string;
   profileId: number;
}
