import axios from 'axios';
import { GuestbookType } from 'interfaces/guestbook';

export const createGuestbook = async (author: string, content: string, isAdmin: boolean): Promise<GuestbookType> => {
  console.log({ isAdmin });

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/guestbook`,
    { author, content, isAdmin },
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const getAllGuestbooks = async (): Promise<GuestbookType[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/guestbook`, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteGuestbook = async (guestbookId: number, accessToken: string): Promise<number> => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/guestbook/${guestbookId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return res.data;
};
