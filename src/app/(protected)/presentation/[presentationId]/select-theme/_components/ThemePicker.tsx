import { Theme } from '@/lib/types'
import { useSlidesStore } from '@/store/useSlideStore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
type Props = {
    selectedTheme: Theme 
    themes: Theme[]
    onThemeSelect: (theme: Theme) => void 
}
const ThemePicker = ({onThemeSelect, selectedTheme, themes} : Props) => {
    const router = useRouter() 
    const {currentTheme,project, setSlides} = useSlidesStore()
    const [loading, setLoading] = useState(false)
  return (
    <div>
      
    </div>
  )
}

export default ThemePicker
