import jwtDecode, { JwtPayload } from 'jwt-decode';

export const decodeToken = (accessToken: string | null) => {
  if (!accessToken) return false;
  const decodedToken = jwtDecode<JwtPayload>(accessToken);

  if (decodedToken.exp === undefined) return false;
  if (decodedToken.exp * 1000 < new Date().getTime()) return false;
  else return true;
};
