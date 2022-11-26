import { CategoryType } from 'interfaces/category';
import { GuestbookType } from 'interfaces/guestbook';

export type IProps = {
  categories: CategoryType[];
  guestbooks: GuestbookType[];
};
