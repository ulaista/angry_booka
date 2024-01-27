import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchBooks } from "./seach-books";
import { useAppSelector } from "~/lib/hooks";
import { selectCart } from "~/lib/features/cart/cartSlice";
import { Badge } from "./badge";

export function Navbar({ disableSearchBar }: { disableSearchBar?: boolean }) {
  const router = useRouter();
  const cart = useAppSelector(selectCart);

  return (
    <div id="navbar" className="flex w-full items-center gap-12 px-8 text-lg font-medium uppercase transition-all [&>a:hover]:cursor-pointer [&>a:hover]:font-bold">
      <Image
        src={"/logo_white.png"}
        width={128}
        height={128}
        alt="logo"
        onClick={() => router.push("/")}
        className="hover:cursor-pointer"
      />
      <span className="grow" />
      <a onClick={() => router.push("/about-us")} className="hover:cursor-pointer">О нас</a>
      <a onClick={() => router.push("/library")} className="hover:cursor-pointer">Библиотека</a>
      <div className="relative">
        {!!Object.keys(cart).length && (
          <Badge className="absolute -right-4 -top-2 bg-black/75 font-semibold text-white hover:cursor-pointer">
            {Object.keys(cart).length}
          </Badge>
        )}
        <a onClick={() => router.push("/personal-cabinet")} className="hover:cursor-pointer">Личный Кабинет</a>
      </div>
      <span className="grow" />
      <div id="search-bar">
        <SearchBooks disableSearchBar={disableSearchBar} />
      </div>
    </div>
  );
}
