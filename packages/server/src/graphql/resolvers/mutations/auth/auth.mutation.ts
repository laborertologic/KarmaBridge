import * as argon2 from "argon2";
import { client } from "@/prisma.config";
import { UserServices } from "@/services/user.services";
import { UserDao } from "@/dao/user.dao";
import { ARGON_SECRET, REFRESH_TOKEN_ROTATION } from "@/utils/keys";
import { JwtServices } from "@/services/jwt.services";
import { RESPONSE, AuthInfo } from "ktypes";

const userServices = new UserServices();
const jwtServices = new JwtServices();

// @ts-ignore
const loginMutation = async (
  _: any,
  args: any,
  context: typeof client,
): Promise<RESPONSE<AuthInfo>> => {
  const { email, password } = args;
  const user = await userServices.getUser(email);
  if (!user) {
    return {
      success: false,
      error: { code: 404, message: "User not found. Please try again." },
      code: 404,
    };
  }
  const pass = await argon2.verify(user.password, password, {
    secret: Buffer.from(ARGON_SECRET, "utf-8"),
  });
  /* info 1. incorrect Password */
  if (!pass) {
    return {
      success: false,
      error: { code: 401, message: "Invalid Credentials" },
      code: 401,
    };
  }
  /* info 2. not verified profile, if the user is not verified,
      allow option to send an verification link i suppose to their
      email address.
      todo: need to configure nodemailer first, for account verification
  */
  if (!user.verified) {
    return {
      success: false,
      error: { code: 401, message: "Please complete the verification first !" },
      code: 401,
    };
  } else {
    /* info 3. on valid password and verified profile, sign JWT and send in access and refresh token along with user details too. */
    const accessToken = await jwtServices.signAccessToken(user.email);
    const refreshToken = await jwtServices.signRefreshToken(user.email);
    return {
      success: true,
      code: 200,
      data: {
        accessToken,
        refreshToken,
        expiresIn: REFRESH_TOKEN_ROTATION,
      },
    };
  }
};

// @ts-ignore
const registerMutation = async (_, args: UserDao, context: typeof client) => {
  const { email, password } = args;
  const hashed = await argon2.hash(password, {
    secret: Buffer.from(`${ARGON_SECRET}`),
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

export { registerMutation, loginMutation };
