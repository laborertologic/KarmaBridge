import { Prisma, User } from "@prisma/client";
import { client } from "@/prisma.config";
import { UserDao } from "@/dao/user.dao";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { RESPONSE } from "ktypes";

export class UserServices {
  async getUser(email: string): Promise<User | null> {
    const [user] = await Promise.all([
      client.user.findUnique({
        where: {
          email: email,
        },
      }),
    ]);
    return user;
  }

  async addUser(payload: UserDao): Promise<RESPONSE<UserDao>> {
    {
      const userExist = await this.getUser(payload.email);
      if (userExist) {
        return {
          success: false,
          code: 401,
          error: {
            code: 400,
            message: "Email already exists ! Please login again !",
          },
        };
      }
      const user = await client.user.create({
        data: payload,
      });
      if (!user) {
        return {
          success: false,
          code: 404,
          error: {
            code: 404,
            message: "Something went wrong ! Please try again !",
          },
        };
      }
      return {
        success: true,
        code: 200,
        data: user as UserDao,
      };
    }
  }
}
