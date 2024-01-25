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
    quote: `Ум — не книга, которую можно раскрыть, когда заблагорассудится. Мысли не напечатаны внутри черепа, чтобы их мог изучить всякий любопытный. Мозг — сложный и многослойный орган — по крайней мере, у большинства людей... `,
    quoteAuthor: '-Северус Снегг, "Гарри Потный и Ордер Феникса"',
  },
  {
    image: "/toothless-dragon-toothless.gif",
    quote: `Позвольте мне объяснить: есть драконы, а есть драконы. Драконы на несколько тысячелетий старше драконов и намного крупнее `,
    quoteAuthor: '- Рик Риордан, "Перси Джексон и последний олимпиец"',
  },
  {
    image: "/76375-little-text-sticker-prince-child-the-drawing.png",
    quote: `– Вы красивые, но пустые, – продолжал Маленький принц. – Ради вас не захочется умереть. Конечно, случайный прохожий, поглядев на мою розу, скажет, что она точно такая же, как вы. Но мне она одна дороже всех вас. Ведь это её, а не вас я поливал каждый день. Её, а не вас накрывал стеклянным колпаком. Её загораживал ширмой, оберегая от ветра. Для неё убивал гусениц, только двух или трех оставил, чтобы вывелись бабочки. Я слушал, как она жаловалась и как хвастала, я прислушивался к ней, даже когда она умолкала. Она – моя.`,
    quoteAuthor: 'Антуан де Сент-Экзюпери,"Маленький принц"',
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
      <Navbar disableSearchBar />

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
              {top3Books.data?.map(({...book }, i) => {
                return (
                  <BookCover
                    key={i}
                    book={book}
                    author={book.authors[0]?.author ?? {
                      name: "None",
                      id: "none",
                      dateOfBirth: new Date("0000"),
                    }}
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
