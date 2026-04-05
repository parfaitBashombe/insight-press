import { prisma } from '../prisma';

export abstract class BaseService {
  protected prisma = prisma;
}
