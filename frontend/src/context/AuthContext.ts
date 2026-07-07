import { createContext } from 'react';
import type { AuthContextValueType } from '../types/user.types';

export const AuthContext = createContext<AuthContextValueType | null>(null);
