import { create } from 'zustand';

export const useSpeedStore = create((set) => ({
  speed: 2,
  setSpeed: (newSpeed) => {
 
    set({ speed: newSpeed });
  },
}));
