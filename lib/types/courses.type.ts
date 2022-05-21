export interface Course {
   id: number;
   name: string;
   uid: string;
   detail: string;
   startTime: string;
   classTime: string[];
   price: number;
   maxStudents: number;
   payStudents: number;
   star: number;
   status: number;
   duration: number;
   durationUnit: number;
   cover: string;
   teacher: string;
   typeId: number;
   ctime: string;
}

export interface CourseProfile {
   id: number;
   name: string;
   uid: string;
   detail: string;
   startTime: string;
   price: number;
   maxStudents: number;
   salesId: number;
   processId: number;
   star: number;
   status: number;
   duration: number;
   durationUnit: number;
   cover: string;
   teacher: string;
   typeName: string;
   ctime: string;
   sales: Sales;
   process: Process;
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

export interface Process {
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
