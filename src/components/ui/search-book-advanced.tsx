"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Badge } from "./badge";
import { Input } from "./input";

type Genre = { id: string; name: string };

export function SearchBookInput({
  genres,
  activeGenres,
  onGenreClick,
  inputValue,
  onInputChnage,
}: {
  inputValue: string;
  genres?: Genre[];
  activeGenres?: Genre[];
  onGenreClick(genre: Genre): void;
  onInputChnage(input: string): void;
}) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute right-2 top-1.5 h-6 w-6 stroke-black" />
      <Input
        id="search-input"
        value={inputValue}
        className="bg-white/80 text-black"
        onChange={(event) => onInputChnage(event.target.value)}
      />
      <div className="m-4 grid w-full auto-cols-max grid-flow-col justify-center gap-4">
        {genres?.map((genre) => (
          <Badge
            variant="secondary"
            key={genre.id}
            className="hover:cursor-pointer"
            onClick={() => onGenreClick(genre)}
          >
            {genre.name}{" "}
            {activeGenres?.find((activeGenre) => activeGenre.id === genre.id)
              ? "🎈"
              : ""}
          </Badge>
        ))}
      </div>
    </div>
  );
}
