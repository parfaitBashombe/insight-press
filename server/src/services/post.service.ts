import { BaseService } from '../core/base-service';
import { post as TypePost } from '../models';

export class PostService extends BaseService {
  async getAllPosts(): Promise<TypePost[]> {
    return this.prisma.post.findMany({
      include: { author: { select: { id: true, name: true } }, category: true, tags: true },
      orderBy: { created_at: 'desc' }
    });
  }

  async getPostById(id: string): Promise<TypePost | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true } }, category: true, tags: true, comments: true }
    });
  }

  async createPost(authorId: string, data: any): Promise<TypePost> {
    // Generate a simple slug for demonstration
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    
    return this.prisma.post.create({
      data: {
        ...data,
        slug,
        author_id: authorId,
      },
    });
  }
}
