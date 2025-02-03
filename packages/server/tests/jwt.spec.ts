import { describe, expect, test } from "@jest/globals";
import { JwtServices } from "../src/services/jwt.services";

const service = new JwtServices();
const email = "bravo@gmail.com";

describe("===JWT SPEC===", () => {
  test("====Sign JWT Token with supplied payload ====", async () => {
    expect(await service.signAccessToken(email)).toBeDefined();
  });

  test("====verify JWT Token ====", async () => {
    const token = await service.signAccessToken(email);
    console.log(await service.verifyJwtToken(token));
    expect(await service.verifyJwtToken(token)).toBeDefined();
  });
});
