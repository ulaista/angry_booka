"use client";

import { Badge } from "./badge";
import { Input } from "./input";

type Genre = { id: string; name: string };

export function SearchBookInput({
  genres,
  activeGenres,
  onGenreClick,
  inputValue,
  onInputChange,
}: {
  inputValue: string;
  genres?: Genre[];
  activeGenres?: Genre[];
  onGenreClick(genre: Genre): void;
  onInputChange(input: string): void;
}) {
  return (
    <div>
      <Input
        value={inputValue}
        placeholder="Поиск книг..."
        className="bg-white/80 text-black"
        onChange={(event) => onInputChange(event.target.value)}
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
