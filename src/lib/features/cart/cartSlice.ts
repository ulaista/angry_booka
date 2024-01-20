import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Book, Author } from "@prisma/client";


// Define a type for the slice state
export interface CartState {
  books: Record<string, { book: Book; author: Author }>;
}

// Define the initial state using that type
const initialState: CartState = {
  books: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ book: Book; author: Author }>) => {
      state.books[action.payload.book.id] = action.payload;
    },
    remove: (state, action: PayloadAction<Book | string>) => {
      delete state.books[
        typeof action.payload === "object"
          ? action.payload.id
          : action.payload
      ];
    },
  },
});

export const { add, remove } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.books;

export default cartSlice.reducer;
