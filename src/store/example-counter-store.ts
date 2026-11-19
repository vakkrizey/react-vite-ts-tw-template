import { create } from 'zustand';

type ExampleCounterState = {
  count: number;
  increment: () => void;
  reset: () => void;
};

export const useExampleCounterStore = create<ExampleCounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
