import bcrypt from 'bcryptjs';
import { BaseService } from '../core/base-service';
import { generateToken } from '../utils';
import { user as TypeUser, Role } from '../models';

export class AuthService extends BaseService {
  async register(data: any): Promise<{ user: Partial<TypeUser>; token: string }> {
    const { email, password, name } = data;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: Role.READER,
      },
    });

    const token = generateToken({ userId: user.id, role: user.role });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async login(data: any): Promise<{ user: Partial<TypeUser>; token: string }> {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken({ userId: user.id, role: user.role });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
