import { IAuth } from 'interfaces/auth';
import { clientApi } from 'utils/axios';

export const login = async (username: string, password: string): Promise<IAuth> => {
  const { data } = await clientApi.post('/login', { username, password });
  return data;
};

export const persistLogin = async (): Promise<IAuth | undefined> => {
  const { data } = await clientApi.get('/persist');
  return data;
};

export const reissueToken = async (): Promise<IAuth | undefined> => {
  const { data } = await clientApi.get('/reissue');
  return data;
};
