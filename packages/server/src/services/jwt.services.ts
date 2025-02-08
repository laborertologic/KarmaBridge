import * as jose from "jose";
import { JWTPayload } from "jose";
import {
  ACCESS_TOKEN_EXPIRY,
  ISSUER,
  JWT_SECRET,
  REFRESH_TOKEN_ROTATION,
} from "@/utils/keys";
import * as crypto from "node:crypto";

let ALGO: string;
ALGO = "HS256";

interface VerifiedPayload extends JWTPayload {
  email: string | unknown;
}

export const privateKey = crypto.createSecretKey(JWT_SECRET, "utf-8");

export class JwtServices {
  async signAccessToken(email: string): Promise<string> {
    return await new jose.SignJWT({ email: email })
      .setProtectedHeader({ alg: ALGO })
      .setIssuedAt()
      .setIssuer(ISSUER)
      .setAudience(email)
      .setExpirationTime(ACCESS_TOKEN_EXPIRY)
      .sign(privateKey);
  }

  async signRefreshToken(email: string): Promise<string> {
    return await new jose.SignJWT({ email: email })
      .setProtectedHeader({ alg: ALGO })
      .setIssuedAt()
      .setIssuer(ISSUER)
      .setAudience(email)
      .setExpirationTime(REFRESH_TOKEN_ROTATION)
      .sign(privateKey);
  }

  async verifyJwtToken(token: string): Promise<VerifiedPayload> {
    const legit = await jose.jwtVerify(token, privateKey);
    return {
      token: legit.payload,
      email: legit.payload.email,
    };
  }
}
