"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "../../lib/store";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// import {  } from '../../lib/features/cart/cartSlice'

export default function StoreClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  const persistorRef = useRef<Persistor>();
  if (!storeRef.current || !persistorRef.current) {
    const { persistor, store } = makeStore();
    storeRef.current = store;
    persistorRef.current = persistor;
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<div>loading...</div>} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
