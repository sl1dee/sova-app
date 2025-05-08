import type { IPerson } from '@shared/api/auth/auth.types.ts';

export interface IAuthState {
  isAuthenticated: boolean;
  user: IPerson | null;
}