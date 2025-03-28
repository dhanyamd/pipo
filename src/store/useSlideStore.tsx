import { Slide, Theme } from '@/lib/types'
import { Projects } from '@prisma/client'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface SlideState {
    slides: Slide[]
    project: Projects | null 
    setProject: (id: Projects) => void 
    setSlides: (slides: Slide[]) => void 
    currentTheme : Theme 
    setCurrentTheme: (theme: Theme) => void 
}
const defaultTheme: Theme = {
    name: 'Default',
    fontFamily: " 'Inter', sans-serif",
    fontColor: '#333333',
    backgroundColor: '#f0f0f0',
    slideBackgroundColor: '#ffffff',
    accentColor: '#3b82f6',
    type: 'light'
}
export const useSlidesStore = create(
    persist<SlideState>((set, get) => ({
      slides: [],
      setSlides: (slides : Slide[]) => set({slides}) ,
      project: null,
      setProject: (project) => set({ project }),
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme})
}), 
{
    name: 'slides-storage',
}))