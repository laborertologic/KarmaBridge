import { client } from "@/prisma.config";

// @ts-ignore
const addPostMutation = async (_, args, context: typeof client) => {
  const { title, subtitle, content } = args;
  return context.post.create({
    data: {
      title,
      subtitle,
      content,
      authorId: 2,
    },
  });
};

export { addPostMutation };
