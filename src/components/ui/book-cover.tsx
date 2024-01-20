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
import { add, remove } from "~/lib/features/cart/cartSlice";
import { useAppDispatch } from "~/lib/hooks";
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

export function BookCover({ book, author }: { book: Book; author: Author }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
            {book.publication_date.getFullYear()}
          </p>
        </div>
      </DialogTrigger>
      <BookCoverDialogContent author={author} book={book} />
    </Dialog>
  );
}

export function BookCoverDialogContent({ book, author }: { book: Book; author: Author }) {
  const dispatch = useAppDispatch();

  return (
    <DialogContent className="border-gray-600 bg-zinc-900 text-white sm:max-w-[525px]">
      <DialogHeader className="flex flex-row gap-4">
        <div className="w-full">
          <Image
            src={book.img}
            width={128}
            height={128}
            alt="book1"
            className="mb-4 min-w-32"
          />
          <p className="text-sm text-white/70">{author.name}</p>
          <p className="text-sm text-white/70">
            {book.publication_date.getFullYear()}
          </p>
        </div>
        <div className="space-y-5">
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>{book.description}</DialogDescription>
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit" variant={"secondary"} disabled>
          Купить
        </Button>
        <DialogClose asChild>
          <Button
            type="submit"
            variant={"secondary"}
            onClick={() => {
              dispatch(add({ book, author }));
            }}
          >
            Добавить в корзину
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
            {book.publication_date.getFullYear()}
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
              dispatch(remove(book.id));
            }}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
