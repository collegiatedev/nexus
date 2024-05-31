"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  type MyStore,
  type CreateMyStoreReturn,
  createMyStore,
} from "./myStore";
import { DnDProps } from "./dnd";

export const MyStoreContext = createContext<CreateMyStoreReturn | null>(null);

export const MyStoreProvider = ({
  children,
  params,
}: {
  children: ReactNode;
  params?: DnDProps; // extend this def later
}) => {
  const storeRef = useRef<CreateMyStoreReturn>();
  if (!storeRef.current) storeRef.current = createMyStore(params);

  return (
    <MyStoreContext.Provider value={storeRef.current}>
      {children}
    </MyStoreContext.Provider>
  );
};

export const useMyStore = <T,>(selector: (store: MyStore) => T): T => {
  const myStoreContext = useContext(MyStoreContext);

  if (!myStoreContext) {
    throw new Error(`useMyStore must be use within MyStoreProvider`);
  }

  return useStore(myStoreContext, selector);
};
