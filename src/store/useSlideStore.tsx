import { Slide, Theme } from '@/lib/types'
import { Projects } from '@prisma/client'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import { v4 as uuid4 } from 'uuid'

export interface SlideState {
    slides: Slide[]
    project: Projects | null 
    setProject: (id: Projects) => void 
    setSlides: (slides: Slide[]) => void 
    currentTheme : Theme 
    currentSlide: number 
    removeSlide: (id: string) => void 
    setCurrentTheme: (theme: Theme) => void 
    getOrderedSlides: () => Slide[]
    reorderSlides: (fromIndex: number, toIndex: number) => void 
    addSlideAtIndex: (slide: Slide, index: number) => void 
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
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme}),
      getOrderedSlides: () => {
        const state = get()
        return [...state.slides].sort((a,b) => a.slideOrder - b.slideOrder)
      },
       removeSlide: (id) => 
        set((state) => ({
            slides: state.slides.filter((slide) => slide.id !== id),
        })),
        addSlideAtIndex: (slide: Slide, index: number) => 
            set((state) => {
                const newSlides = [...state.slides] 
                newSlides.splice(index, 0, {...slide, id: uuid4()})
                newSlides.forEach((s, i) => {
                    s.slideOrder = i 
                })
                return { slides: newSlides, currentSlide: index}
            }),
            currentSlide: 0,
      reorderSlides: (fromIndex: number, toIndex: number)=> {
        set((state) => {
            const newSlides = [...state.slides]
            const [removed] = newSlides.splice(fromIndex, 1)
            newSlides.splice(toIndex, 0, removed)
            return {
                slides: newSlides.map((slide, index) => ({
                    ...slide,
                    slideOrder: index, 
                }))
            }
        })
      }
}), 
{
    name: 'slides-storage',
}))