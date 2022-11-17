import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';
import { GuestbookType } from 'interfaces/guestbook';

export type IProps = {
  auth: AuthType | null;
  categories: CategoryType[];
  guestbooks: GuestbookType[];
};
