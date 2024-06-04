"use client";

import { create, useStore } from "zustand";
import { createDnDSlice, DnDSlice } from "./dnd";
import { createContext, ReactNode, useRef, useContext } from "react";
import { DnDHandler, DnDHandlerProps } from "./types";
import { SelectTask } from "~/server/db/schema";
import { createModalSlice, ModalSlice } from "./modal";

// add to args as needed
type AllSlices = DnDSlice & ModalSlice;
export const createMyStore = (handlerProps?: DnDHandlerProps) => {
  const handler = handlerProps
    ? new DnDHandler(handlerProps as Array<SelectTask>)
    : new DnDHandler();

  return create<AllSlices>()((...a) => ({
    ...createDnDSlice({ handler, hoveringContainer: null })(...a),
    ...createModalSlice()(...a),
  }));
};

type CreateMyStoreReturn = ReturnType<typeof createMyStore>;

const MyStoreContext = createContext<CreateMyStoreReturn | null>(null);
export const MyStoreProvider = ({
  children,
  params,
}: {
  children: ReactNode;
  params?: DnDHandlerProps; // extend this def later
}) => {
  const storeRef = useRef<CreateMyStoreReturn>();
  if (!storeRef.current) storeRef.current = createMyStore(params);

  return (
    <MyStoreContext.Provider value={storeRef.current}>
      {children}
    </MyStoreContext.Provider>
  );
};

export const useMyStore = <T,>(selector: (store: AllSlices) => T): T => {
  const myStoreContext = useContext(MyStoreContext);

  if (!myStoreContext) {
    throw new Error(`useMyStore must be use within MyStoreProvider`);
  }

  return useStore(myStoreContext, selector);
};
