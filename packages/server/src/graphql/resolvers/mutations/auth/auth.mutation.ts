import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { client } from "@/prisma.config";
import * as process from "node:process";
import { UserServices } from "@/services/user.services";
import { UserDao } from "@/dao/user.dao";

const userServices = new UserServices();

// @ts-ignore
const loginMutation = async (_, args: any, context: typeof client) => {
  const { email, password } = args;
  try {
    const user = await context.user.findUnique({
      where: {
        email: email,
      },
    });
    return { success: true, code: 200, data: user };
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
  //TODO Who's going to get the user details ?
  const verified = await argon2.verify(digest, password, {
    secret: Buffer.from("buffer", "utf-8"),
  });
  if (!verified) {
    return {
      success: false,
      error: { code: 400, message: "Unable to hash your password." },
    };
  } else {
    try {
      const user = await context.user.create({
        data: {
          firstName: "",
          lastName: "",
          email: email,
          password: hashed,
        },
      });
      return { success: true, code: 200, data: user };
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
};
// @ts-ignore
const registerMutation = async (_, args: UserDao, context: typeof client) => {
  const { email, password } = args;
  const hashed = await argon2.hash(password, {
    secret: Buffer.from(`${process.env.AGRON_SECRET}`),
  });
  if (!hashed) {
    return {
      success: false,
      error: { code: 400, message: "Unable to hash your password." },
    };
  } else {
    try {
      const data: UserDao = {
        firstName: "",
        lastName: "",
        email: email,
        password: hashed,
      };
      const user = await userServices.addUser(data);
      return { success: true, code: 200, data: user };
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
};

export { registerMutation };
