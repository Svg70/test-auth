import jwt, { Jwt, JwtPayload, VerifyCallback } from 'jsonwebtoken';
import { Request } from 'express';
import { ACCESS_TOKEN_SECRET } from '../constants';

const authService = () => {
  const verify = (token: string, cb: VerifyCallback<string | Jwt | JwtPayload>) => jwt.verify(token, ACCESS_TOKEN_SECRET, {}, cb);

  const getTokenPayload = (token: string): string | JwtPayload => {
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

        const payload = getTokenPayload(token);

        if (typeof payload === 'string') {
          return;
        } else {
          return payload.userId;
        }
      }
    }
  
    throw new Error('Not authenticated');
  }

  return {
    verify,
    getUserId
  };
};

export default authService;