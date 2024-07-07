"use client";

import { create, useStore } from "zustand";
import { createDnDSlice, DnDSlice } from "./dnd";
import { createContext, ReactNode, useRef, useContext } from "react";
import { DnDHandler, DnDHandlerProps } from "./dndHandler";
import { createModalSlice, ModalSlice } from "./modal";
import { createMonthSlice, MonthSlice } from "./month";
import { MyTasks } from "~/types";

// add to args as needed
type AllSlices = DnDSlice & ModalSlice & MonthSlice;
export const createMyStore = (handlerProps?: DnDHandlerProps) => {
  const handler = handlerProps
    ? new DnDHandler(handlerProps as MyTasks)
    : new DnDHandler();

  return create<AllSlices>()((...a) => ({
    ...createDnDSlice({ handler, hoveringContainer: null })(...a),
    ...createModalSlice()(...a),
    ...createMonthSlice()(...a),
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
