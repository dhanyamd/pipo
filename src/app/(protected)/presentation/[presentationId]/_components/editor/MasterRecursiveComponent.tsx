'use client'
import { Heading1 } from '@/components/globals/editor/components/Headings'
import { ContentItem } from '@/lib/types'
import { motion } from 'framer-motion'
import React, { useCallback } from 'react'
type MasterRecursiveProps = {
    content: ContentItem 
    onContentChange: (
        contentId: string,
        newContent: string | string[] | string[][]
    ) => void 
    isPreview? : boolean 
    isEditable? : boolean 
    slideId: string 
    index?:number
}
const ContentRenderer: React.FC<MasterRecursiveProps> = React.memo(({
    content,
    onContentChange,
    slideId,
    index,
    isEditable,
    isPreview
}) => {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onContentChange(content.id,e.target.value)
        },
        [content.id, onContentChange]
    )
    const animationProps = {
        initial: {opacity:0, y:20},
        animate: {opacity: 1, y:0},
        transition: {duration: 0.5}
    }
    const commonProps = {
        placeholder: content.placeholder,
        value: content.content as string,
        onChange: handleChange,
        isPreview: isPreview
    }
    switch (content.type) {
        case 'heading1':
            
           return <motion.div className="w-full h-full">
            {/*@ts-ignore */}
            <Heading1 {...commonProps} />
           </motion.div> 
    
        default:
          return <h1>Nothing</h1>
    }
}
)
ContentRenderer.displayName = 'ContentRenderer'
export const MasterRecursiveComponent: React.FC<MasterRecursiveProps> =
  React.memo(
    ({
      content,
      onContentChange,
      slideId,
      index,
      isPreview = false,
      isEditable = true,
    }) => {
      if (isPreview) {
        return (
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        );
      }
      return (
        <React.Fragment>
            <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        </React.Fragment>
      )

      // ... rest of the component logic ...
    }
  )

  MasterRecursiveComponent.displayName = 'MasterRecursiveComponent'
