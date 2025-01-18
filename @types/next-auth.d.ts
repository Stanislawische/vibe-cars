// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { UserRoleDB } from '@prisma/client';
import { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      user: any;
      id: string;
      role: UserRoleDB;
      name: string;
      image: string;
    };
  }

  interface User extends DefaultUser {
    id: number;
    role: UserRoleDB;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRoleDB;
  }
}
