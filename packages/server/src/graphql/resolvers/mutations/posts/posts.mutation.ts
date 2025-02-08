import { client } from "@/prisma.config";
import { ServerContext } from "@/index";

// @ts-ignore
const addPostMutation = async (_, args, context: ServerContext) => {
  const { title, subtitle, content } = args;
  return context.client.post.create({
    data: {
      title,
      subtitle,
      content,
      authorId: 2,
    },
  });
};

export { addPostMutation };
