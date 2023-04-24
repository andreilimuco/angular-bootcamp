import { User } from "./user.model";

export interface UserInformation {
  page: number;
  per_page: number;
  support: any;
  total: number;
  total_pages: number;
  data: User[];
}
