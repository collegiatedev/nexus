"use client";

import { create, useStore } from "zustand";
import { createContext, ReactNode, useRef, useContext } from "react";
import { DnDSlice, createDnDSlice } from "~/lib/store/dnd";
import { HoveringSlice, createHoveringSlice } from "~/lib/store/hovering";
import { ModalSlice, createModalSlice } from "~/lib/store/modal";
import { MonthSlice, createMonthSlice } from "~/lib/store/month";

// add to args as needed
type AllSlices = DnDSlice & ModalSlice & MonthSlice & HoveringSlice;
export const createMyStore = () => {
  return create<AllSlices>()((...a) => ({
    ...createDnDSlice()(...a),
    ...createHoveringSlice()(...a),
    ...createModalSlice()(...a),
    ...createMonthSlice()(...a),
  }));
};

type CreateMyStoreReturn = ReturnType<typeof createMyStore>;
const MyStoreContext = createContext<CreateMyStoreReturn | null>(null);

export const MyStoreProvider = ({ children }: { children: ReactNode }) => {
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
