import { Slide } from '@/lib/types'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface SlideState {
    slides: Slide[]
    setSlides: (slides: Slide[]) => void 
}

export const useSlidesStore = create(
    persist<SlideState>((set, get) => ({
      slides: [],
      setSlides: (slides : Slide[]) => set({slides}) 
}), 
{
    name: 'slides-storage',
}))