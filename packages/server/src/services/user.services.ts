import { Prisma, User } from "@prisma/client";
import { client } from "@/prisma.config";
import { UserDao } from "@/dao/user.dao";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {} from 'karmabridge-types';

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

  async addUser(payload: UserDao): Promise<User | null> {
    {
      try {
        const user = client.user.create({
          data: payload,
        });
        return {
          success: true,
          error: { code: 200, message: "User registered !" },
        };
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            return {
              success: false,
              error: { code: 400, message: "Email already exists" },
            };
          }
        }
      }
    }
  }
}
