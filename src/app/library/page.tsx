"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BookCover } from "~/components/ui/book-cover";
import { Navbar } from "~/components/ui/navbar";
import { SearchBooks } from "~/components/ui/seach-books";
import { SearchBookInput } from "~/components/ui/search-book-advanced";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function Page() {
  const query = api.books.getBooks.useQuery();
  const genres = api.books.getGenres.useQuery();
  const [activeGenres, setGenres] = React.useState<
    { name: string; id: string }[]
  >([]);
  const [inputSearchVal, setInputSearchVal] = React.useState("");

  return (
    <main className="flex min-h-screen justify-between text-white">
      <div className="min-h-full w-full bg-[url('/assets/pc_bg.jpg')] bg-contain">
        <Navbar disableSearchBar />
        
        <div className="container mt-8">
          <SearchBookInput
            inputValue={inputSearchVal}
            onInputChnage={(input) => setInputSearchVal(input)}
            genres={genres.data}
            activeGenres={activeGenres}
            onGenreClick={(selectedGenre) => {
              setGenres((genres) => {
                if (genres.find((genre) => genre.id == selectedGenre.id)) {
                  return genres.filter((genre) => genre.id != selectedGenre.id);
                }

                return [...genres, selectedGenre];
              });
            }}
          />
          <div className="mt-12 grid grid-cols-4 gap-4">
            {query.data
            ?.filter(({ authors, genres, description, title, }) => {
              if(!inputSearchVal.length) return true; 
              
              if(authors.find(({ author }) => author.name.includes(inputSearchVal))) return true;
              if(genres.find(({ genre }) => genre.name.includes(inputSearchVal))) return true;
              if(title.includes(inputSearchVal)) return true;
              if(description.includes(inputSearchVal)) return true;
              
              return false;
            })
            ?.map(
              ({ authors, genres, ...book }, i) =>
                !!genres.find(
                  ({ genre }) =>
                    !activeGenres.length ||
                    activeGenres.find(
                      (activeGenre) => activeGenre.id === genre.id,
                    ),
                ) && (
                  <BookCover
                    highlightInput={inputSearchVal}
                    key={i}
                    author={
                      authors.find((a) => a.bookId === book.id)?.author ?? {
                        name: "None",
                        id: "none",
                        dateOfBirth: new Date("0000"),
                      }
                    }
                    book={book}
                  />
                ),
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function CategoryList({
  groupName,
  groupActive,
  list,
  onClick,
}: {
  groupName: string;
  groupActive: boolean;
  list: Array<{ name: string; active: boolean }>;
  onClick(genre: string): void;
}) {
  return (
    <div className="flex flex-col gap-2 [&>*]:cursor-pointer [&>*]:uppercase [&>p]:font-medium [&>p]:text-white/50">
      <h3
        className={cn(
          "text-xl font-medium italic",
          groupActive ? "text-yellow-200" : "text-white",
        )}
      >
        {groupName}
      </h3>
      {list.map((item, i) => (
        <p
          key={i}
          className={cn(item.active && "!text-white")}
          onClick={() => onClick(item.name)}
        >
          {item.name}
        </p>
      ))}
    </div>
  );
}
