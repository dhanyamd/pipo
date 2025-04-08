'use client'
import { Heading1, Heading2, Heading3, Heading4, Title } from '@/components/globals/editor/components/Headings'
import { ContentItem } from '@/lib/types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { useCallback } from 'react'
import Dropzonee from './Dropzone'
import Paragraph from './Paragraph'
import TableComponent from './TableComponent'
import ColumnComponent from './ColumnComponent'
import CustomImage from './CustomImage'
import BlockQuote from './BlockQuote'
import NumberedList, { BulletList, TodoList } from './NumberedList'
import CalloutBox from './CalloutBox'
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
            
           return( <motion.div className="w-full h-full" {...animationProps}>
            {/*@ts-ignore */}
            <Heading1 {...commonProps} />
           </motion.div> 
           )
           case 'heading2' : 
           return (
            <motion.div
            className='w-full h-full'
            {...animationProps}>
              {/**@ts-ignore */}
              <Heading2 {...commonProps}/>
            </motion.div>
           )
           case 'heading3' : 
           return (
            <motion.div
            className='w-full h-full'
            {...animationProps}>
              {/**@ts-ignore */}
              <Heading3 {...commonProps}/>
            </motion.div>
           )
           case 'heading2' : 
           return (
            <motion.div
            className='w-full h-full'
            {...animationProps}>
              {/**@ts-ignore */}
              <Heading4 {...commonProps}/>
            </motion.div>
           )
           case 'title' : 
           return (
            <motion.div
            className='w-full h-full'
            {...animationProps}>
              {/**@ts-ignore */}
              <Title {...commonProps}/>
            </motion.div>
           )
           case 'paragraph' : 
           return (
            <motion.div
            className='w-full h-full'
            {...animationProps}>
              {/**@ts-ignore */}
              <Paragraph {...commonProps}/>
            </motion.div>
           )
           case 'table': 
           return (
            <motion.div
            {...animationProps}
            className='w-full h-full'
            >
              <TableComponent 
              content={content.content as string[][]}
              onChange={(newContent) => 
                onContentChange(content.id, newContent !== null ? newContent : '')
              }
              initialRowSize={content.initialRows}
              initialColSize={content.initialColumns}
              isPreview={isPreview}
              isEditable={isEditable}
              />
            </motion.div>
           )
           case 'resizable-column' : 
             if (Array.isArray(content.content)) {
              return (
                <motion.div
                {...animationProps}
                className='w-full h-full'
                >
                  <ColumnComponent 
                  content={content.content as ContentItem[]}
                  className={content.className}
                  onContentChange={onContentChange}
                  slideId={slideId}
                  isPreview={isPreview}
                  isEditable={isEditable}
                  />
                </motion.div>
              )
             }
             return null
          case 'calloutBox' : 
          return (
            <motion.div
            {...animationProps}
            className='w-full h-full'
            >
              <CalloutBox 
              type={content.callOutType || 'info'} 
              className={content.className}
              >
                <Paragraph {...commonProps}/>
              </CalloutBox>
            </motion.div>
          )
          case 'image': 
           return (
            <motion.div
            {...animationProps} 
            className='w-full h-full'
            >
             <CustomImage
  src={content.content as string}
  alt={content.alt || 'image'}
  className={content.className}
  isPreview={isPreview}
  contentId={content.id}
  onContentChange={onContentChange}
  isEditable={isEditable}
/>
            </motion.div>
           )

           case 'blockquote': 
           return (
            <motion.div
            {...animationProps}
            className={cn('w-full h-full flex flex-col', content.className)}
            >
              <BlockQuote>
                <Paragraph  {...commonProps}/>
              </BlockQuote>
              </motion.div>
           )
           case 'numberedList': 
           return (
            <motion.div
            {...animationProps}
            className={cn('w-full h-full')}
            >
              <NumberedList 
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)} 
              className={content.className}
              />
            </motion.div>
           )
           case 'bulletList': 
           return (
            <motion.div
            {...animationProps}
            className={cn('w-full h-full')}
            >
              <BulletList 
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)} 
              className={content.className}
              />
            </motion.div>
           )
           case 'todoList': 
           return (
            <motion.div
            {...animationProps}
            className={cn('w-full h-full')}
            >
              <TodoList 
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)} 
              className={content.className}
              />
            </motion.div>
           )
           case 'column' : 
           if (Array.isArray(content.content)) {
            return (
                <motion.div
                {...animationProps}
                className={cn('w-full h-full flex flex-col', content.className)}
                >
                    {content.content.length > 0 
                    ? (content.content as ContentItem[]).map((
                        subItem: ContentItem, subIndex: number
                    ) => (
                        <React.Fragment key={subItem.id || `item-${subIndex}`}>
                            {!isPreview && !subItem.restrictToDrop &&
                             subIndex===0 && isEditable && (
                             <Dropzonee
                             index={0}
                             parentId={content.id}
                             slideId={slideId}
                             />)}
                             <MasterRecursiveComponent 
                             content={subItem}
                             onContentChange={onContentChange}
                             isPreview={isPreview}
                             slideId={slideId}
                             index={subIndex}
                             isEditable={isEditable}
                             />
                             {!isPreview && 
                             !subItem.restrictToDrop && isEditable && (
                              <Dropzonee 
                              index={subIndex + 1}
                              parentId={content.id}
                              slideId={slideId}
                              />
                             )}
                        </React.Fragment>
                    )) : isEditable ? (
                      <Dropzonee 
                      index={0}
                      parentId={content.id}
                      slideId={slideId}
                      />
                    ) : null}
                </motion.div>
            )
          }
             return null 
        default:
          return null
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
