import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Input } from "./input";
import React from "react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { BookCoverDialogContent } from "./book-cover";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function SearchBooks({ disableSearchBar }: { disableSearchBar?: boolean }) {
  const [input, setInput] = React.useState<string>();

  const query = api.books.findBooks.useQuery({
    nameOrAuthor: input ?? "ThisBookDoNotExist",
  });

  return (
    <div className="relative">
      {!disableSearchBar && <MagnifyingGlassIcon className="absolute w-6 h-6 right-2 stroke-black top-1.5" />}
      {!disableSearchBar && <Input onChange={(event) => setInput(event.currentTarget.value)} className="bg-white/80 text-black" />}
      <div className="absolute right-0 z-50 transition-all">
        <Card
          className={cn(
            "relative top-4 w-[350px] transition-all duration-200",
            input?.length ? "opacity-100" : "opacity-0",
          )}
        >
          <CardHeader>
            <CardTitle>Книги по запросу {`"${input}"`}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 transition-[height]">
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
                      <h4 className="w-52 truncate text-nowrap text-sm font-bold">
                        {book.title}
                      </h4>
                      <p className="w-52 truncate text-sm font-normal">
                        {book.description}
                      </p>
                      <p className="w-52 truncate text-sm font-normal">
                        {authors.find((a) => a.bookId === book.id)?.author.name}
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
    </div>
  );
}
