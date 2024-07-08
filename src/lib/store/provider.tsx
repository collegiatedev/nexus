"use client";

import { create, useStore } from "zustand";
import { createDnDSlice, DnDProps, DnDSlice } from "./dnd";
import { createContext, ReactNode, useRef, useContext } from "react";
import { createModalSlice, ModalSlice } from "./modal";
import { createMonthSlice, MonthSlice } from "./month";
import { type MyTasks } from "~/server/queries";

// add to args as needed
type AllSlices = DnDSlice & ModalSlice & MonthSlice;
export const createMyStore = (props?: DnDProps) => {
  return create<AllSlices>()((...a) => ({
    ...createDnDSlice(props)(...a),
    ...createModalSlice()(...a),
    ...createMonthSlice()(...a),
  }));
};

type CreateMyStoreReturn = ReturnType<typeof createMyStore>;
const MyStoreContext = createContext<CreateMyStoreReturn | null>(null);

export const MyStoreProvider = ({
  children,
  // params,
}: {
  children: ReactNode;
  // params?: DnDHandlerProps; // extend this def later
}) => {
  const storeRef = useRef<CreateMyStoreReturn>();
  if (!storeRef.current) storeRef.current = createMyStore();

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
