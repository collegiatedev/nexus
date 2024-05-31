import { create } from "zustand";
import { createDnDSlice, DnDProps, DnDSlice } from "./dnd";

export const createMyStore = (initialDnD?: DnDProps) => {
  const dndProps = initialDnD || {};
  return create<DnDSlice>()((...a) => ({
    ...createDnDSlice(dndProps)(...a),
  }));
};

export type MyStore = DnDSlice; // add more as union moving forward: DnDSlice | SomeSlice

export type CreateMyStoreReturn = ReturnType<typeof createMyStore>;

// export const StoreContext = createContext<MyStore | null>(null);

// export const getStore = (): MyStore => {
//   const store = useContext(StoreContext);
//   if (!store) throw new Error("Missing StoreContext.Provider in the tree");
//   return store;
// };
