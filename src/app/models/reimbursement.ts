import { User } from './user';

export class Reimbursement {
  reimbId: number;
  amount: number;
  submitted: number;
  resolved: number;
  description: string;
  receipt: string | ArrayBuffer;
  author: User;
  resolver: User;
  statusId: number;
  typeId: number;
}
