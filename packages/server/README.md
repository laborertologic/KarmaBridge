# KarmaBridge Server

GraphQL side of things.

## Setup

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

## Ideas

User can either like or comment to a job/news feed post.
I need to know who liked the post and who commented on that post

job
id

Authentication and authorization
user(logged in)
id

comments
id
content

job_comments
job_id comment_id

## References

1. [Prisma Initial Migration](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/baseline-your-database-typescript-postgresql)
2. [Prisma Up and Down Migration](https://www.prisma.io/docs/orm/prisma-migrate/workflows/generating-down-migrations#about-down-migrations)
3. [Authentication with context value](https://www.apollographql.com/docs/apollo-server/security/authentication)