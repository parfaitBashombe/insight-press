import { BaseService } from '../core/base-service';
import { UserResponse } from '../models';

export class UserService extends BaseService {
  async getUserById(id: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}
