import { AuthType } from 'interfaces/auth';
import { GuestbookType } from 'interfaces/guestbook';

export type IProp = {
  setGuestbooks: React.Dispatch<React.SetStateAction<GuestbookType[]>>;
  auth: AuthType | null;
};
