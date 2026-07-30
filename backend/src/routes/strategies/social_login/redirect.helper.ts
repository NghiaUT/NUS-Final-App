import type { Request, Response } from 'express';
import { generateToken } from '../../../utils/jwt.util.js';
import { generateDefaultAvatar } from '../../../utils/avatar.util.js';
import { constant } from '../../../config/constant/constant.js';

const issueTokenAndRedirect = (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect('/login-failed');
  }
  const tokens = generateToken({
    id: user.id,
    name: `${user.firstName || 'User'} ${user.lastName || ''}`.trim(),
    role: user.role,
    email: user.email,
    avatarUrl:
      user.avatarUrl ??
      generateDefaultAvatar(
        user.firstName || 'User',
        user.lastName || `${user.id}`
      ),
    firstName: user.firstName,
    lastName: user.lastName,
  });

  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.redirect(
    `${constant.CLIENT_URL}/oauth-callback?accessToken=${tokens.accessToken}`
  );
};

export default issueTokenAndRedirect;
