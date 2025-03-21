import { Slide } from '@/lib/types'
import { Projects } from '@prisma/client'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface SlideState {
    slides: Slide[]
    project: Projects | null 
    setProject: (id: Projects) => void 
    setSlides: (slides: Slide[]) => void 
}

export const useSlidesStore = create(
    persist<SlideState>((set, get) => ({
      slides: [],
      setSlides: (slides : Slide[]) => set({slides}) ,
      project: null,
      setProject: (project) => set({ project })
}), 
{
    name: 'slides-storage',
}))