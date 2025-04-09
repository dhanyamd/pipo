'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useSlidesStore } from '@/store/useSlideStore'
import { LayoutTemplate } from 'lucide-react'
import React from 'react'
import LayoutChooser from './LayoutChooser'

const EditorSidebar = () => {
    const {currentTheme} = useSlidesStore()
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10">
    <div className="rounded-xl border border-r-0 border-background-70 shadow-lg p-2 flex flex-col items-center space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <LayoutTemplate className="h-5 w-5" />
            <span className="sr-only">Choose Layout</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
        side='left' 
        align='center' 
        className='w-[480px] p-0'
        >
            <LayoutChooser/>
        </PopoverContent>
      </Popover>
    </div>
  </div>
  )
}

export default EditorSidebar
