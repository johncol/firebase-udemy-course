export type CourseField = 'seqNo' | 'name' | 'entity' | 'status';

export type CourseStatus = 'done' | 'progress' | 'todo' | 'suggested';

export const CourseStatuses = {
  DONE: 'done',
  PROGRESS: 'progress',
  TODO: 'todo',
  SUGGESTED: 'suggested',
}

export interface Course {
  id: string;
  seqNo: number;
  name: string;
  url: string;
  description: string;
  status: CourseStatus;
  entity: string;
  image: string;
  credential: string;
  date: Date;
}
