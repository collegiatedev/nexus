import { create } from "zustand";
import { createDnDSlice, DnDProps, DnDSlice } from "./dnd";
import { createContext, useContext } from "react";

type MyStore = ReturnType<typeof createMyStore>;

export const createMyStore = (initialDnD?: Partial<DnDProps>) => {
  const dndProps = initialDnD || {};
  return create<DnDSlice>()((...a) => ({
    ...createDnDSlice(dndProps)(...a),
  }));
};

export const StoreContext = createContext<MyStore | null>(null);

export const getStore = (): MyStore => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreContext.Provider in the tree");
  return store;
};

// type BoundStore = ReturnType<typeof useBoundStore>;

// const useBoundStore = (bearProps: Partial<BearProps>) => {
//   return create<BearSlice>()((...a) => ({
//     ...createBearSlice(bearProps)(...a),
//   }));
// };

// export const StoreContext = createContext<BoundStore | null>(null);
