import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

const NODE_ENV = process.env["NODE_ENV"] || "development";
const ARGON_SECRET = process.env["ARGON_SECRET"] || "some_secret";
const JWT_SECRET = process.env["JWT_SECRET"] || "randomsecretman!@###";
const REFRESH_TOKEN_ROTATION = Number(
  process.env["REFRESH_TOKEN_ROTATION"] || "300000",
);
const ACCESS_TOKEN_EXPIRY = Number(
  process.env["ACCESS_TOKEN_EXPIRY"] || 1000000,
);
const NAME = process.env["NAME"] || "KarmaBridge";
const ISSUER = process.env["ISSUER"] || "com.karmabridge.au";

export {
  NODE_ENV,
  ARGON_SECRET,
  REFRESH_TOKEN_ROTATION,
  ACCESS_TOKEN_EXPIRY,
  NAME,
  ISSUER,
  JWT_SECRET,
};
