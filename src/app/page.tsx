"use client";

// import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react";

import { BookCover } from "~/components/ui/book-cover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel";
import { Input } from "~/components/ui/input";
import { Navbar } from "~/components/ui/navbar";

const characterList = [
  {
    image: "/severus_transparent.png",
    quote: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
    porta non neque vehicula luctus. Fusce fringilla mauris et velit
    convallis, id lobortis leo volutpat. Ut pretium erat et ipsum
    condimentum, eu porttitor tellus bibendum. Duis sit amet sem
    augue. Maecenas aliquet scelerisque augue, at dapibus ligula
    congue non. `,
    quoteAuthor: '`-Северус Снегг, "Гарри Потный и Ордер Феникса"',
  },
  {
    image: "/toothless-dragon-toothless.gif",
    quote: `If you're good at something, never do it for free!`,
    quoteAuthor: "Jerma",
  },
  {
    image: "/markiplier.png",
    quote: `Sometimes you must reach beyond yourself to reach yourself within.. yourself. What I do is temporary but what I leave behind is forever. Life is hard,Should you be too?`,
    quoteAuthor: "Markiplier",
  },
];

export default function Home() {
  const router = useRouter();
  const top3Books = api.books.getTop3Books.useQuery();
  // noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();
  const [carouselApi, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <main className="flex min-h-screen flex-col justify-between bg-[url('/bg-main.png')] bg-cover bg-no-repeat text-white">
      <Navbar />

      <div className="flex justify-between">
        <div className="h-auto max-h-fit w-1/2 ">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {characterList.map(({ image }, i) => (
                <CarouselItem key={i}>
                  <Image
                    src={image}
                    width={1080}
                    height={1080}
                    alt={image}
                    className="h-[800px] object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious /> */}
            {/* <CarouselNext /> */}
          </Carousel>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-between px-32">
          <div>
            <h4 className="pb-8 text-center text-3xl font-semibold">
              ЦИТАТА НЕДЕЛИ
            </h4>

            <p className="pb-12">{characterList[current - 1]?.quote}</p>

            <p className="w-full text-end">
              {characterList[current - 1]?.quoteAuthor}
            </p>
          </div>

          <div>
            <h4 className="pb-8 text-center text-3xl font-semibold">
              ВЫБОР НАШИХ ЧИТАТЕЛЕЙ
            </h4>

            <div className="mb-12 flex gap-12">
              {top3Books.data?.map(({ authors, ...book }, i) => {
                return (
                  <BookCover
                    key={i}
                    book={book}
                    author={
                      authors.find((author) => author.bookId === book.id)
                        ?.author ?? {
                        name: "None",
                        id: "none",
                        dateOfBirth: new Date("0000"),
                      }
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
