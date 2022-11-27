import { adminApi, clientApi } from 'utils/axios';
import { IGuestbook, INewGuestbook } from 'interfaces/guestbook';

// export const addGuestbook = async (newGuestbook: INewGuestbook): Promise<IGuestbook> => {
//   const { data } = await clientApi.post('/guestbook', newGuestbook);
//   return data;
// };
export const addGuestbook = async (newGuestbook: INewGuestbook): Promise<IGuestbook> => {
  const { data } = await clientApi.post('/guestbook', newGuestbook);
  return data;
};

export const fetchGuestbooks = async (): Promise<IGuestbook[]> => {
  const { data } = await clientApi.get('/guestbook');
  return data;
};

export const deleteGuestbook = async (guestbookId: number): Promise<number> => {
  const { data } = await adminApi.delete(`/guestbook/${guestbookId}`);
  return data;
};
