"use client";

import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { add, remove, selectCart } from "~/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "./alert-dialog";
import type { Book, Author } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const highlight = (str: string, input?: string) => {
  if (!input) return str;

  const regex = new RegExp(`(${input})`, "gi");
  const parts = str.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === input.toLowerCase() ? (
      <span key={i} className="bg-yellow-200 text-black">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export function BookCover({
  book,
  author,
  highlightInput,
}: {
  book: Book;
  author: Author;
  highlightInput?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group flex flex-col items-center" id="book-cover">
          <div className="relative shadow-md">
            <div className="absolute -left-8 top-4 z-0 h-52 w-32 rounded-lg bg-black blur-md" />
            <Image
              src={book.img}
              width={128}
              height={128}
              alt="book1"
              className="relative z-10"
            />
          </div>
          <p className="relative mt-2 w-full max-w-40 truncate text-start font-semibold">
            {highlight(book.title, highlightInput)}
          </p>
          <p className="relative w-full max-w-40 truncate text-start font-semibold text-gray-500 transition-all group-hover:text-white/90">
            {highlight(author.name, highlightInput)},
          </p>
          <p className="relative w-full max-w-40 truncate text-start font-semibold text-gray-500 transition-all group-hover:text-white/90">
            {new Date(book.publication_date).getFullYear()}
          </p>

          <p className="absolute z-20 -ml-4 -mt-4 w-full max-w-40 truncate text-start font-semibold text-gray-300 transition-all group-hover:opacity-30">
            <p className="w-min rounded-xl bg-black/70 px-2 py-1">
              {book.price} RUB
            </p>
          </p>
        </div>
      </DialogTrigger>
      <BookCoverDialogContent
        author={author}
        book={book}
        highlightInput={highlightInput}
      />
    </Dialog>
  );
}

export function BookCoverDialogContent({
  book,
  author,
  highlightInput,
}: {
  book: Book;
  author: Author;
  highlightInput?: string;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const books = useAppSelector(selectCart);

  return (
    <DialogContent className="border-gray-600 bg-zinc-900 text-white sm:max-w-[525px]">
      <DialogHeader className="flex flex-row gap-4">
        <div id="book-cover" className="w-full">
          <Image
            src={book.img}
            width={128}
            height={128}
            alt="book1"
            className="mb-4 min-w-32"
          />
          <p className="text-sm text-white/70">
            {highlight(author.name, highlightInput)}
          </p>
          <p className="text-sm text-white/70">
            {new Date(book.publication_date).getFullYear()}
          </p>
        </div>
        <div className="space-y-5">
          <DialogTitle>{highlight(book.title, highlightInput)}</DialogTitle>
          <DialogDescription>
            {highlight(book.description, highlightInput)}
          </DialogDescription>
        </div>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="submit"
            variant={"secondary"}
            onClick={() => {
              toast.success(
                "Покупка выполнена Дон Карло! Книга прилетит вам по птичей почте",
              );
            }}
          >
            Купить ({book.price} RUB)
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type="submit"
            variant={"secondary"}
            onClick={() => {
              toast(`"${book.title}" добавлена в корзину!`, {
                cancel: {
                  label: "Отменить",
                  onClick() {
                    dispatch(remove(book));
                  },
                },
                action: {
                  label: "Перейти в корзину",
                  onClick() {
                    router.push("/personal-cabinet");
                  },
                },
                className: "flex flex-col",
                classNames: {
                  cancelButton:
                    "w-full text-center !text-white font-bold !bg-red-500 py-4",
                  actionButton: "w-full text-center py-4 font-bold",
                },
              });
              dispatch(add({ book, author }));
            }}
          >
            Добавить в корзину (
            {Object.values(books).reduce((a, b) => a + b.book.price, 0)} RUB)
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export function CartBookCover({
  author,
  book,
}: {
  book: Book;
  author: Author;
}) {
  const dispatch = useAppDispatch();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex flex-col items-center">
          <div className="relative shadow-md">
            <div className="absolute -left-8 top-4 z-0 h-52 w-32 rounded-lg bg-black blur-md" />
            <Image
              src={book.img}
              width={128}
              height={128}
              alt="book1"
              className="relative z-10"
            />
          </div>
          <p className="relative mt-2 w-full max-w-40 truncate text-start font-semibold">
            {book.title}
          </p>
          <p className="relative w-full max-w-40 truncate text-start font-semibold text-gray-500">
            {author.name},
          </p>
          <p className="relative w-full max-w-40 truncate text-start font-semibold text-gray-500">
            {new Date(book.publication_date).getFullYear()}
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-zinc-800 bg-zinc-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Ты хочешь удалить {`"${book.title}"`} с корзины?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ты снова сможешь добавить в корзину книгу после удаления
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-black bg-black">
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={() => {
              dispatch(remove(book.id)); //
            }}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
