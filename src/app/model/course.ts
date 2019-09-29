export interface Course {
  id: string;
  seqNo: number;
  name: string;
  url: string;
  description: string;
  status: 'done' | 'progress' | 'todo' | 'suggested';
  entity: string;
  image: string;
  credential: string;
  date: Date;
}
