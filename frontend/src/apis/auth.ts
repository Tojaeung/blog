import { AuthType } from 'interfaces/auth';
import { clientApi } from 'utils/axios';

export const getRefresh = async (): Promise<AuthType> => {
  const { data } = await clientApi.get('refresh');
  return data;
};

export const login = async (username: string, password: string): Promise<AuthType> => {
  const { data } = await clientApi.post('/login', { username, password });
  return data;
};
