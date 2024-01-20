import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Input } from "./input";
import React from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { BookCoverDialogContent } from "./book-cover";
import Image from "next/image";

export function SearchBooks() {
  const [input, setInput] = React.useState<string>();

  const query = api.books.findBooks.useQuery({
    nameOrAuthor: input ?? "ThisBookDoNotExist",
  });

  return (
    <>
      <Input onChange={(event) => setInput(event.currentTarget.value)} />
      <div className="absolute">
        <Card
          className={cn(
            "relative right-36 top-4 w-[350px] transition-all",
            (input?.length ?? 0) > 5 ? "opacity-100" : "opacity-0",
          )}
        >
          <CardHeader>
            <CardTitle>Книги по запросу {`"${input}"`}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {query?.data?.map(({ authors, ...book }) => (
              <Dialog key={book.id}>
                <DialogTrigger asChild>
                  <div className="flex items-center rounded-md bg-zinc-300 p-2 transition-all hover:cursor-pointer hover:bg-zinc-200">
                    <Image
                      src={book.img}
                      alt={book.title}
                      width={64}
                      height={64}
                      className="p-2"
                    />
                    <div className="flex max-w-fit flex-col justify-evenly">
                      <h4 className="truncate text-nowrap text-sm font-bold w-52">
                        {book.title}
                      </h4>
                      <p className="truncate text-sm font-normal w-52">
                        {book.description}
                      </p>
                      <p className="truncate text-sm font-normal w-52">
                        {authors.find(a => a.bookId === book.id)?.author.name}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <BookCoverDialogContent
                  author={authors.find((a) => a.bookId === book.id)!.author}
                  book={book}
                />
              </Dialog>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
