"use client";

import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartBookCover } from "~/components/ui/book-cover";
import { Navbar } from "~/components/ui/navbar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { selectCart } from "~/lib/features/cart/cartSlice";
import { useAppSelector } from "~/lib/hooks";

export default function Page() {
  const books = useAppSelector(selectCart);

  return (
    <main className="flex min-h-screen flex-col justify-between bg-[url('/assets/pc_bg.jpg')] bg-cover bg-no-repeat text-white">
      <div className="min-h-screen backdrop-blur-xl">
        <Navbar />

        <div className="flex">
          <div className="flex w-1/2 flex-col items-center justify-center" id="reader-ticket">
            <h4 className="mb-8 text-4xl">МОЙ ЧИТАТЕЛЬСКИЙ БИЛЕТ</h4>
            <div className="flex flex-col gap-8 bg-gradient-to-r from-zinc-950 to-zinc-600 p-8 px-8">
              <div className="flex">
                <div className="relative">
                  <div className="absolute left-4 top-1 z-0 h-52 w-32 rounded-lg bg-black blur-md" />

                  <Image
                    src={"/assets/don.jpg"}
                    width={128}
                    height={194}
                    alt="Don"
                    className="relative mr-8"
                  />
                </div>
                <div className="ml-8 flex flex-col *:flex *:gap-2">
                  <div>
                    <p className="font-bold">ИМЯ:</p>
                    <p>Дон</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">ФАМИЛИЯ:</p>
                    <p>Корлеоне</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">ОТЧЕСТВО:</p>
                    <p>xxx</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">ПОЧТА:</p>
                    <p>kittylover@bk.ru</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">ПЛАТЕЖНАЯ СИСТЕМА:</p>
                    <p>Пересыл посыльным</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">СТРАНА ПРОЖИВАНИЯ:</p>
                    <p>Италия</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">ЛЮБИМЫЕ ЖАНРЫ:</p>
                    <p>Драма, криминал</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex gap-4">
                  <p>ДЕЙСТВИТЕЛЕН ПО</p>
                  <p className="border-b-2">19.09.2024</p>
                </div>
                <p className="border-b-2">Подпись</p>
              </div>
            </div>

            <h4 className="mb-8 mt-12 text-4xl">БАЛАНС: 6,000,740,209 руб.</h4>
            <CrumpledPaperIcon className="mb-8 h-32 w-32" />

            <p className="my-2 w-2/3 text-start">РЕДАКТИРОВАТЬ ПРОФИЛЬ</p>
            <p className="my-2 w-2/3 text-start">УДАЛИТЬ АККАУНТ</p>
            <p className="my-2 w-2/3 text-start">FAQ</p>
            <p className="my-2 w-2/3 text-start font-bold italic">
              ЗАПРОС О СОТРУДНИЧЕСТВЕ
            </p>
          </div>
          <div className="flex w-1/2 justify-center">
            <div className="flex w-2/3 flex-col items-center bg-gradient-to-b from-zinc-500 via-zinc-800 to-black">
              <h4 className="mt-16 text-3xl">МОЯ КОРЗИНА:</h4>
              {Object.keys(books).length == 0 ? (
                <>
                  <span className="grow" />
                  <h4 className="mx-12 text-center text-2xl text-white/40">
                    ВАША КОРЗИНА ПОКА ЧТО ПУСТА, ПЕРЕЙДИТЕ ВО ВЛКАДКУ{" "}
                    {`"БИБЛИОТЕКА"`}, ЧТОБЫ ОФОРМИТЬ ЗАКАЗ
                  </h4>
                </>
              ) : (
                <ScrollArea className="mt-4 max-h-[580px] w-full">
                  <div className="grid w-full grid-cols-2 gap-4">
                    {Object.values(books).map((book, i) => {
                      return (
                        <div key={i} className="w-full">
                          <CartBookCover {...book} />
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
              <span className="grow" />
              <h4 className="text-3xl">
                ИТОГ: {' '}
                {Object.values(books).reduce((a, b) => a + b.book.price, 0)}{" "}
                руб.
              </h4>
              <h4 className="mb-12 text-3xl">ПЕРЕЙТИ К ОФОРМЛЕНИЮ</h4>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
