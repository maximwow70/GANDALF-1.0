import { ProcessStatus } from "./process-status";


export interface UserTaskReview {
  reviewerName: string;
  score: number | null;
  comment: string;
  status: ProcessStatus;
}
