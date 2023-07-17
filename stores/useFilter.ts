import { create } from 'zustand'

interface Props {
  starValue: number
  adultCount: number
  childrenCount: number
  updateStarValue: (value:number) => void
  addAdult: () => void
  removeAdult: () => void
  addChild: () => void
  removeChild: () => void
  reset: () => void
}

const initialState = {
  starValue: 0,
  adultCount: 0,
  childrenCount: 0,
}

export const useFilterStore = create<Props>((set) => ({
  ...initialState,
  updateStarValue: (value) => {
    set({
      starValue: value,
    })
  },
  addAdult: () => 
    set((state) => ({adultCount: state.adultCount + 1})),
  removeAdult: () => 
    set((state) => ({adultCount: state.adultCount - 1})),
  addChild: () => 
    set((state) => ({childrenCount: state.childrenCount + 1})),
  removeChild: () => 
    set((state) => ({childrenCount: state.childrenCount - 1})),
    reset: () => set(initialState),
}))