import axios from 'axios';
import { PagePostType } from 'interfaces/post';

export const searchKeyword = async (keyword: string, page: number): Promise<PagePostType> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search?keyword=${keyword}&page=${page}`, {
    withCredentials: true,
  });
  return res.data;
};
