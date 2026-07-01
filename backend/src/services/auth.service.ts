import bcrypt from 'bcrypt';
import prisma from '../config/prisma/prisma.init.js';
import { ApiError } from '../utils/apiError.js';
import { sendWelcomeEmail } from './email.service.js';
import { generateToken } from '../utils/jwt.utils.js';

const SALT = 10;

export class AuthService {
  static async signup(userData: any) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      throw new ApiError(400, 'Email already exists!');
    }

    // Hashing the password.
    const hashedPassword = await bcrypt.hash(userData.password, SALT);

    // Store the user to DB and send Email.
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    // sendWelcomeEmail(newUser.email, newUser.first_name ?? 'User').catch(
    //   console.error
    // );

    return { user: { id: newUser.id, email: newUser.email } };
  }

  static async login(userData: any) {
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      throw new ApiError(400, 'Wrong email or password!');
    }

    const isAuth = await bcrypt.compare(userData.password, user.password);

    if (!isAuth) {
      throw new ApiError(400, 'Wrong email or password!');
    }

    // Return tokens when login
    const tokens = generateToken({
      id: user.id,
      name: `${user.first_name || 'User'} ${user.last_name || ''}`.trim(),
      role: 'user',
      email: user.email,
      avatar_url: user.avatar_url ?? 'undefined',
    });

    return { user: { id: user.id, email: user.email }, tokens };
  }
}
