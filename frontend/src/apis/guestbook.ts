import { adminApi, clientApi } from 'utils/axios';
import { IGuestbook, INewGuestbook } from 'interfaces/guestbook';

export const addGuestbook = async ({ author, content, isAdmin }: INewGuestbook): Promise<IGuestbook> => {
  const { data } = await clientApi.post('/guestbook', { author, content, isAdmin });
  return data;
};

export const getGuestbooks = async (): Promise<IGuestbook[]> => {
  const { data } = await clientApi.get('/guestbook');
  return data;
};

export const deleteGuestbook = async (guestbookId: number): Promise<number> => {
  const { data } = await adminApi.delete(`/guestbook/${guestbookId}`);
  return data;
};
