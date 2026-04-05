import { user, Role } from '../../generated/prisma/client/index.js';

export type { user };
export { Role };

// Omit password from User type
export type UserResponse = Omit<user, 'password'>;
