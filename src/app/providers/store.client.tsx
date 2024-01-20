'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type AppStore } from '../../lib/store'
// import {  } from '../../lib/features/cart/cartSlice'

export default function StoreClientProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    // storeRef.current.dispatch()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}