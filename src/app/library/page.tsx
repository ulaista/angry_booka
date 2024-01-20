"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BookCover } from "~/components/ui/book-cover";
import { SearchBooks } from "~/components/ui/seach-books";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function Page() {
  const router = useRouter();
  const query = api.books.getBooks.useQuery();
  const genres = api.books.getGenres.useQuery();
  const [genre, setGenre] = React.useState(genres.data?.find((a) => a.id));

  return (
    <main className="flex min-h-screen justify-between text-white">
      <div className="min-h-full w-1/4 min-w-max bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600">
        <div className="flex flex-col items-center p-8 *:w-full *:text-start">
          <h2 className="text-3xl font-semibold">КНИГИ</h2>
          <p
            className={cn(
              "mb-4 font-medium hover:cursor-pointer",
              genre?.name == "all" ? "text-white" : "text-white/50",
            )}
            onClick={() =>
              setGenre({
                id: "all",
                name: "all",
              })
            }
          >
            СМОТРЕТЬ ВСЕ ТОВАРЫ
          </p>
          <div className="flex flex-col gap-8">
            <CategoryList
              groupName={"Легкое чтение"}
              groupActive
              list={
                genres.data?.map(({ name, id }) => ({
                  active: genre?.id === id,
                  name,
                })) ?? []
              }
              onClick={(genreName) =>
                setGenre(genres.data?.find((genre) => genre.name === genreName))
              }
            />
          </div>
        </div>
      </div>
      <div className="min-h-full w-3/4 min-w-max bg-gradient-to-r from-black via-slate-800 to-gray-700 ">
        <div className="flex w-full items-center gap-12 px-8 text-lg font-medium uppercase transition-all [&>a:hover]:cursor-pointer [&>a:hover]:font-bold">
          <a onClick={() => router.push("/about-us")}>О нас</a>
          <span className="grow" />
          <Image
            src={"/logo_white.png"}
            width={128}
            height={128}
            alt="logo"
            onClick={() => router.push("/")}
            className="hover:cursor-pointer"
          />
          <span className="grow" />
          <a>Отложенные</a>
          <a className="border-b-2 font-bold">Библиотека</a>
          <a onClick={() => router.push("/personal-cabinet")}>Личный Кабинет</a>
          <span className="grow" />
          <div id="search-bar">
            <SearchBooks />
          </div>
        </div>

        <div className="container mt-8">
          <h4 className="mb-8 text-4xl font-semibold">
            ДЕТЕКТИВЫ, ОТ КОТОРЫХ СТЫНЕТ КРОВЬ В ЖИЛАХ..
          </h4>
          <p className="max-w-xl font-semibold uppercase italic leading-8 text-white/70">
            ХОem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta
            non neque vehicula luctus. Fusce fringilla mauris et velit
            convallis, id lobortis leo volutpat. Ut pretium erat et ipsum
            condimentum, eu porttitor tellus bibendum. Duis sit amet sem augue.
            Maecenas aliquet scelerisque augue
          </p>

          <div className="mt-12 grid grid-cols-4 gap-4">
            {query.data?.map(
              ({ authors, genres, ...book }, i) =>
                !!genres.find((g) => g.genre.name === genre?.name || genre?.name === 'all') && (
                  <BookCover
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
