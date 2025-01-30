import * as argon2 from "argon2";
import { client } from "@/prisma.config";
import * as process from "node:process";
import { UserServices } from "@/services/user.services";
import { UserDao } from "@/dao/user.dao";

const userServices = new UserServices();

// @ts-ignore
const loginMutation = async (_, args: any, context: typeof client) => {
  const { email, password } = args;
  const user = await userServices.getUser(email);
  if (!user) {
    return {
      success: false,
      error: { code: 404, message: "Email or password is incorrect." },
    };
  }
  const verified = await argon2.verify(user.password, password, {
    secret: Buffer.from("buffer", "utf-8"),
  });
  if (!user.verified) {
    return {
      success: false,
      error: { code: 400, message: "Unable to hash your password." },
    };
  } else {
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
    const data: UserDao = {
      firstName: "",
      lastName: "",
      email: email,
      password: hashed,
    };
    return await userServices.addUser(data);
  }
};

export { registerMutation };
