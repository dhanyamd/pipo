import { cn } from '@/lib/utils'
import { useSlidesStore } from '@/store/useSlideStore'
import React from 'react'
type Props = {
    items: string[] 
    onItemClick: (id: string) => void 
    className?: string
}
const TableOfContent = ({items, onItemClick, className} : Props) => {
    const {currentTheme} = useSlidesStore()
    return (
        <nav
          className={cn('space-y-2', className)}
          style={{ color: currentTheme.fontColor }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className={cn('cursor-pointer hover:underline')}
              // onClick={() => onItemClick(item)}
            >
              {item}
            </div>
          ))}
        </nav>
      );
}

export default TableOfContent
