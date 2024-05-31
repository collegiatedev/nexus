"use client";

import { create, useStore } from "zustand";
import { createDnDSlice, DnDProps, DnDSlice } from "./dnd";
import { createContext, ReactNode, useRef, useContext } from "react";

type AllSlices = DnDSlice; // extend this def using unions: DnDSlice | OtherSlice

// add to args as needed
export const createMyStore = (initialDnD?: DnDProps) => {
  const dndProps = initialDnD || {};
  return create<AllSlices>()((...a) => ({
    ...createDnDSlice(dndProps)(...a),
  }));
};

type CreateMyStoreReturn = ReturnType<typeof createMyStore>;

const MyStoreContext = createContext<CreateMyStoreReturn | null>(null);
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

export const useMyStore = <T,>(selector: (store: AllSlices) => T): T => {
  const myStoreContext = useContext(MyStoreContext);

  if (!myStoreContext) {
    throw new Error(`useMyStore must be use within MyStoreProvider`);
  }

  return useStore(myStoreContext, selector);
};
