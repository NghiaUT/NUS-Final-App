import jwt from 'jsonwebtoken';
import { constant } from '../config/constant/constant.js';

type UserPayload = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
};

export const generateToken = (payload: UserPayload) => {
  const accessToken = jwt.sign({ ...payload }, constant.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d', // Short life
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

export const verifyAndCheckExpiration = (token: string, type: string) => {
  try {
    // Hàm verify sẽ tự động ném lỗi nếu token hết hạn hoặc sai chữ ký
    const payload: any = jwt.verify(
      token,
      type === 'refreshToken'
        ? constant.REFRESH_TOKEN_SCRET
        : constant.ACCESS_TOKEN_SECRET
    );
    return { valid: true, reason: '', payload };
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      // Vẫn có thể lấy payload cũ bằng jwt.decode nếu cần
      const expiredPayload: any = jwt.decode(token);
      return { valid: false, reason: 'Expired', payload: expiredPayload };
    }

    console.log(
      'Trạng thái: Token không hợp lệ (Sai chữ ký, sai định dạng...)'
    );
    return { valid: false, reason: 'Invalid' };
  }
};
