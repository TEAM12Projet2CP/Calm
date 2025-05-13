import { create } from 'zustand';

export const useSpeedStore = create((set) => ({
  speed: 1, // Default speed
  setSpeed: (newSpeed) => {
    // Add validation if needed
    if (newSpeed >= 0.5 && newSpeed <= 2) {
      set({ speed: newSpeed });
    }
  },
}));