import { BaseService } from '../core/base-service';

export class WriterService extends BaseService {
  /**
   * Fetches the public profile of a writer, including their recent published posts.
   */
  async getWriterProfile(userId: string) {
    return this.prisma.writer.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });
  }

  /**
   * Updates the Writer's own profile biography
   */
  async updateBio(userId: string, bio: string) {
    return this.prisma.writer.upsert({
      where: { user_id: userId },
      update: { bio },
      create: { user_id: userId, bio }
    });
  }
}
