import { create, StoreApi, UseBoundStore } from "zustand";
import { createDnDSlice, DnDSlice } from "./dnd";

// auto-gen selectors for useStore utils
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;
const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

// create a store with all slices
const useBoundStore = create<DnDSlice>()((...a) => ({
  ...createDnDSlice(...a),
}));

export const useMyStore = createSelectors(useBoundStore);
