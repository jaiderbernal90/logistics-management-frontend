import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string): { role: string } => {
    return jwtDecode(token);
};
