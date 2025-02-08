import { client } from "@/prisma.config";
import { ServerContext } from "@/index";

// @ts-ignore
const allPostsQuery = async (_, __, context: ServerContext) => {
  return context.client.post.findMany();
};

// @ts-ignore
const postQuery = async (_, args: any, context: ServerContext) => {
  return context.client.post.findUnique({ where: { id: args.id } });
};

export { allPostsQuery, postQuery };
