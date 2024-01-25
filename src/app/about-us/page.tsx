"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "~/components/ui/navbar";
import { cn } from "~/lib/utils";

export default function Page() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col justify-between bg-[url('/bg-main.png')] bg-cover bg-no-repeat text-white">
      <Navbar disableSearchBar/>

      <div className="flex">
        <div className="absolute h-[800px] w-full">
          <Image
            className="absolute top-64 -rotate-[70deg] -scale-y-100 transform"
            src={"/assets/arrow.png"}
            width={128}
            height={128}
            alt="arrow1"
          />
          <Image
            className="absolute left-[350px] top-48 -rotate-[90deg] transform"
            src={"/assets/arrow.png"}
            width={128}
            height={128}
            alt="arrow1"
          />
          <Image
            className="absolute left-[620px] top-56 -rotate-[90deg] transform"
            src={"/assets/arrow.png"}
            width={128}
            height={128}
            alt="arrow1"
          />
          <Image
            className="absolute left-[900px] top-72 -rotate-[-45deg] -scale-y-100 transform"
            src={"/assets/arrow.png"}
            width={128}
            height={128}
            alt="arrow1"
          />

          <p className="absolute left-[150px] top-[350px] -rotate-6 text-xl text-black">
            georgy.
          </p>
          <p className="absolute left-[350px] top-[310px] -rotate-3 text-xl text-black">
            nikita.
          </p>
          <p className="absolute left-[550px] top-[320px] -rotate-1 text-xl text-black">
            ula.
          </p>
          <p className="absolute left-[780px] top-[350px] rotate-6 text-xl text-black">
            andrey.
          </p>
          <TgCard
            className="left-12 top-28"
            name="Георгий Сальников."
            pos="backend разраб."
            tgUsername="SirGeorgy"
          />
          <TgCard
            className="left-[320px] top-12"
            name="Никита Фиськович."
            pos="raznorabochiy."
            tgUsername="Omniabene"
          />
          <TgCard
            className="left-[600px] top-24"
            name="Улукбек Истамов."
            pos="fullstack разраб."
            tgUsername="ula_ista"
          />
          <TgCard
            className="left-[1000px] top-96"
            name="Андрей Ризобоев."
            pos="frontend разраб."
            tgUsername="RizoBoy03"
          />
        </div>
        <Image
          src={"/assets/theboys.png"}
          alt="theboys"
          width={1080}
          height={1080}
          className="h-[800px] object-cover"
        />

        <div>
          <h4 className="mb-12 text-3xl">ПРОЕКТ ANGRYBOOKA:</h4>
          <p className="w-2/3">
            - «Наш проект - это онлайн-магазин книг, созданный четырьмя
            друзьями. Мы предлагаем разнообразие литературных произведений от
            классики до новинок. Здесь каждая книга - это возможность
            погрузиться в уникальные миры слова. Покупайте, читайте, делитесь
            отзывами и наслаждайтесь литературным путешествием с нами»
          </p>
          <p className="mt-4 w-2/3 text-end">-команда AbgryBooka</p>
        </div>
      </div>
    </main>
  );
}

function TgCard({
  className,
  name,
  pos,
  tgUsername,
}: {
  className: string;
  name: string;
  pos: string;
  tgUsername: string;
}) {
  return (
    <div
      className={cn("group absolute hover:cursor-pointer", className)}
      onClick={() => {
        window.open(`https://t.me/${tgUsername}`, "_blank")?.focus();
      }}
    >
      <h4 className="text-xl">{name}</h4>
      <h4 className="mb-4 text-xl">{pos}</h4>
      <div className="flex h-[50px] w-[220px] items-center rounded-xl border-4 border-gray-500 transition-all group-hover:border-gray-400">
        <Image
          className="ml-4 h-8 w-8 transition-all group-hover:animate-spin"
          src={"/assets/telegram.png"}
          width={128}
          height={128}
          alt="telegram"
        />
        <p className="w-[140px] text-center text-xl font-semibold text-gray-500">
          TELEGRAM
        </p>
      </div>
    </div>
  );
}
