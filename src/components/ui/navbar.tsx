import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchBooks } from "./seach-books";

// export function Navbar({ disableSearchBar }: { disableSearchBar?: boolean }) {
  export function Navbar() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center gap-12 px-8 text-lg font-medium uppercase transition-all [&>a:hover]:cursor-pointer [&>a:hover]:font-bold">
      <Image
        src={"/logo_white.png"}
        width={128}
        height={128}
        alt="logo"
        onClick={() => router.push("/")}
        className="hover:cursor-pointer"
      />
      <span className="grow" />
      <a onClick={() => router.push("/about-us")}>О нас</a>
      <a onClick={() => router.push("/library")}>Библиотека</a>
      <a onClick={() => router.push("/personal-cabinet")}>Личный Кабинет</a>
      <span className="grow" />
      {/* <div id="search-bar">
        <SearchBooks disableSearchBar={disableSearchBar} />
      </div> */}
    </div>
  );
}
