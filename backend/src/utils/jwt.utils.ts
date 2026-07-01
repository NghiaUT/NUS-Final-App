import jwt from 'jsonwebtoken';
import { constant } from '../config/constant/constant.js';

type UserPayload = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const generateToken = (payload: UserPayload) => {
  const accessToken = jwt.sign({ ...payload }, constant.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m', // Short life
  });

  const refreshToken = jwt.sign(
    { id: payload.id },
    constant.REFRESH_TOKEN_SCRET,
    {
      expiresIn: '7d', // Long life
    }
  );

  return { accessToken, refreshToken };
};
