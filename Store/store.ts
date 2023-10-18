import { AnyNsRecord } from "dns";
import { create } from "zustand";

export const useStore = create<any>()((set) => ({
  userData: [],
  setUserData:(props:any) => set((state:any) => ({ userData:props })),
  isLoader: false,
  changeLoader: (props:any) => set((state:any) =>({isLoader:props}))

 
}));