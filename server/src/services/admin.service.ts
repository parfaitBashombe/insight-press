import { BaseService } from '../core/base-service';
import { user as TypeUser, Role } from '../models';

export class AdminService extends BaseService {
  /**
   * Promotes a normal Reader to an Author, and instantiates their Writer profile.
   */
  async promoteToWriter(userId: string): Promise<TypeUser> {
    // We use a transaction to guarantee both the role update and profile creation succeed together
    const [updatedUser] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { role: Role.AUTHOR },
      }),
      this.prisma.writer.upsert({
        where: { user_id: userId },
        update: {}, // if exists, do nothing
        create: { user_id: userId },
      })
    ]);

    return updatedUser;
  }

  /**
   * Updates the Admin's own profile data (e.g. department)
   */
  async updateAdminProfile(userId: string, data: any) {
    return this.prisma.admin.upsert({
      where: { user_id: userId },
      update: {
        department: data.department
      },
      create: {
        user_id: userId,
        department: data.department
      }
    });
  }

  /**
   * Fetches basic platform stats
   */
  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count();
    const totalPosts = await this.prisma.post.count();
    const totalWriters = await this.prisma.writer.count();
    
    return {
      totalUsers,
      totalPosts,
      totalWriters
    };
  }
}
