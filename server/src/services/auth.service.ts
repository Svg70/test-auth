import jwt, { Jwt, JwtPayload, VerifyCallback } from 'jsonwebtoken';
import { Request } from 'express';
import { ACCESS_TOKEN_SECRET } from '../constants';

const authService = () => {
  const issue = (payload: any) => jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: 10800 });
  const verify = (token: string, cb: VerifyCallback<string | Jwt | JwtPayload>) => jwt.verify(token, ACCESS_TOKEN_SECRET, {}, cb);

  const getTokenPayload = (token: string) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }

  const getUserId = (req: Request) => {
    if (req) {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
          throw new Error('No token found');
        }
  
        //@ts-ignore
        const { userId } = getTokenPayload(token);

        return userId;
      }
    }
  
    throw new Error('Not authenticated');
  }

  return {
    issue,
    verify,
    getUserId
  };
};

export default authService;