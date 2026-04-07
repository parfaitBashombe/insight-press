import BaseService from "@/database/system/base-service.js";
import { type user, type role } from "@/generated/prisma/client.js";
import { Signup } from "@/types/user.js";

type UserWithRole = user & { role: role };

class CreateUserService extends BaseService<Signup, UserWithRole> {
  protected async transaction(data: Signup): Promise<UserWithRole | null> {
    const salt = this.Password.salt();
    const password = this.Password.hash(data.password, salt);

    const readerRole = await this.database.role.findUnique({
      where: { name: "READER" },
    });

    if (!readerRole) {
      throw new Error(
        "Default READER role not found. Please run the database seeder.",
      );
    }

    const result = await this.database.user.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        password,
        salt,
        role_id: readerRole.role_id,
      },
      include: {
        role: true,
      },
    });

    if (!result) return null;
    return result;
  }
}

export default CreateUserService;
