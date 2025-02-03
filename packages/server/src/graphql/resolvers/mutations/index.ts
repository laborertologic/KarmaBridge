import { loginMutation, registerMutation } from "@/graphql/resolvers/mutations/auth/auth.mutation";
import { addPostMutation } from "@/graphql/resolvers/mutations/posts/posts.mutation";

export const Mutations = {
  register: registerMutation,
  login: loginMutation,
  post: addPostMutation,
};
