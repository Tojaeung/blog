import { IAuth } from 'interfaces/auth';
import { clientApi } from 'utils/axios';

export const login = async (username: string, password: string): Promise<IAuth> => {
  const { data } = await clientApi.post('/login', { username, password });
  return data;
};

export const getRefresh = async (): Promise<IAuth> => {
  const { data } = await clientApi.get('/refresh');
  return data;
};
