import BaseService from "@/database/system/base-service.js";
import { user } from "@/generated/prisma/client.js";
import { Signup } from "@/types/user.js";

class CreateUserService extends BaseService<Signup, user> {
  protected async transaction(data: Signup): Promise<user | null> {
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
    });

    if (!result) return null;
    return result;
  }
}

export default CreateUserService;
