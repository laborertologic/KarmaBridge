import { User } from "@prisma/client";
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
      try {
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
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            return {
              success: false,
              code: 401,
              error: {
                code: 401,
                message: "Email already exists ! Please login!",
              },
            };
          }
        }
      }
      return {
        success: false,
        code: 401,
        error: {
          code: 401,
          message: "Something went wrong !",
        },
      };
    }
  }
}
