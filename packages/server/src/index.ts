import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { gql } from "graphql-tag";
import path = require("path");
import { resolvers } from "./graphql/resolvers";
import { client } from "./prisma.config";
import { JwtServices } from "@/services/jwt.services";
import { UserServices } from "@/services/user.services";
import { User } from "@prisma/client";

const jwtService = new JwtServices();
const userService = new UserServices();

export interface ServerContext {
  client: typeof client;
  user: User | null;
}

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./graphql/schemas/schemas.graphql"), {
    encoding: "utf-8",
  }),
);

async function startApolloServer() {
  const server = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers: resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      let user: User | null = null;
      if (
        req.headers.authorization &&
        req.headers.authorization!.startsWith("Bearer ")
      ) {
        const token = req.headers.authorization.split("Bearer ")[1];
        if (!token || token !== "") {
          const payload = await jwtService.verifyJwtToken(token);
          if (payload.email) {
            if (typeof payload.email === "string") {
              user = await userService.getUser(payload.email);
            }
          }
        }
      }
      return { user, client };
      /*
      const user = getUser(token);
      TODO optionally block the user
      info we could also check user roles/permissions here
      if (!user)
      INFO throwing a `GraphQLError` here allows us to specify an HTTP status code,
      INFO standard `Error`s will have a 500 status code by default
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
       */
    },
    listen: { port: 4000 },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

// INFO: START GRAPHQL SERVER (APOLLO)
startApolloServer();
