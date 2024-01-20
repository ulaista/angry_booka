import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const booksRouter = createTRPCRouter({
  getBooks: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.book.findMany({
      include: {
        authors: {
          include: {
            author: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });
  }),

  findBooks: publicProcedure
    .input(
      z.object({
        nameOrAuthor: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: input.nameOrAuthor,
              },
            },
            {
              authors: {
                every: {
                  author: {
                    name: {
                      contains: input.nameOrAuthor,
                    },
                  },
                },
              },
            },
          ],
        },
        include: {
          authors: {
            include: {
              author: true
            }
          }
        }
      });
    }),

  getGenres: publicProcedure.query(async ({ ctx }) => ctx.db.genre.findMany()),

  getTop3Books: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.book.findMany({
      take: 3,
      orderBy: {
        publication_date: "desc",
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
      },
    });
  }),

  //   create: protectedProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       // simulate a slow db call
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       return ctx.db.post.create({
  //         data: {
  //           name: input.name,
  //           createdBy: { connect: { id: ctx.session.user.id } },
  //         },
  //       });
  //     }),

  //   getLatest: protectedProcedure.query(({ ctx }) => {
  //     return ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //       where: { createdBy: { id: ctx.session.user.id } },
  //     });
  //   }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
