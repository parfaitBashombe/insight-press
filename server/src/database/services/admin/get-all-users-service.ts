import BaseService from "@/database/system/base-service.js";
import { Prisma } from "@/generated/prisma/client.js";
import { GetAllUsersFilters, PaginatedUsers } from "@/types/user.js";

class GetAllUsersService extends BaseService<
  GetAllUsersFilters,
  PaginatedUsers
> {
  protected async transaction(
    filters: GetAllUsersFilters,
  ): Promise<PaginatedUsers> {
    const { page, pageSize, search, status, roleId } = filters;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: Prisma.userWhereInput = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { fullname: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status !== undefined) {
      where.status = status;
    }

    if (roleId) {
      where.role_id = roleId;
    }

    const [users, total] = await Promise.all([
      this.database.user.findMany({
        where,
        skip,
        take,
        include: {
          role: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.database.user.count({ where }),
    ]);

    const data = users.map((u) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...userWithoutSensitiveData } = u;
      return userWithoutSensitiveData;
    });

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}

export default GetAllUsersService;
