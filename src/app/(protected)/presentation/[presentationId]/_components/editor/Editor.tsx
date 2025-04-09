'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { LayoutSlides, Slide } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useSlidesStore } from '@/store/useSlideStore'
import { NavigationMenuViewportProps } from '@radix-ui/react-navigation-menu'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {v4 as uuid4} from 'uuid'
import {MasterRecursiveComponent} from './MasterRecursiveComponent'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Trash } from 'lucide-react'
import { updateSlides } from '@/actions/projects'
type Props = {
    isEditable: boolean 
}

interface DropZoneProps {
    index: number;
    onDrop: (
        item: {
            type: string;
            layoutType: string;
            component: LayoutSlides;
            index?: number
        },
        dropIndex: number
    ) => void;
    isEditable: boolean
}
export const DropZone: React.FC<DropZoneProps> = ({
    index,
    onDrop,
   isEditable
}) => {
    const [{ canDrop, isOver}] = useDrop({
        accept: ['SLIDE', 'layout'],
        drop: (item: {
            type: string 
            layoutType: string 
            component: LayoutSlides 
            index? : number
        }) => {
            onDrop(item, index)
        },
        canDrop: () => isEditable,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop
        }),
    })

    if (!isEditable) return null 
   return (
    <div className={cn(
        'h-4 my-2 rounded-md transition-all duration-200',
        isOver && canDrop ? 'border-green-500 bg-green-100' : 'border-gray-300',
        canDrop ? 'border-blue-300' : ''
    )}>
      {isOver && canDrop && (
        <div className='h-full flex items-center justify-center text-green-600'>
            Drop here
            </div>
      )}
    </div>
   )
}
interface DraggableSlideProps {
    slide: Slide 
    index: number 
    moveSlide: (dragIndex: number, hoverIndex: number) => void 
    handleDelete: (id: string) => void 
    isEditable: boolean
}
export const DraggableSlide: React.FC<DraggableSlideProps> = ({
    slide,
    index,
    moveSlide,
    handleDelete,
    isEditable
}) => {
    const ref = useRef(null)
    const [{isDragging}, drag] = useDrag({
        type: 'SLIDE',
        item: {
            index,
            type: 'SLIDE',
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: isEditable
    })
    const [_, drop] = useDrop({
        accept: ['SLIDE', 'LAYOUT'],
        hover(item: {index: number; type: string}) {
            if (!ref.current || !isEditable) {
                return
            }
            const dragIndex = item.index 
            const hoverIndex = index
            if (item.type === 'SLIDE') {
                if (dragIndex === hoverIndex) {
                    return
                }
                moveSlide(dragIndex, hoverIndex) 
                item.index = hoverIndex
            }
        }
    })
    drag(drop(ref))
    const handleContentChange = (contentId: string, newContent: string | string[] | string[][]) => {
        console.log('Content changed', slide, contentId, newContent)
        if (isEditable) {
            updateContentItem(slide.id, contentId, newContent)
        }
    }
  
    const {currentSlide, currentTheme, setCurrentSlide, updateContentItem} = useSlidesStore()
    return(
        <div 
        ref={ref}
         className={cn('w-full rounded-lg relative p-0 min-h-[400px] max-h-[800px]', 
            'shadow-xl transition-shadow duration-300',
            'flex flex-col',
            index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2' : '',
            slide.className,
            isDragging ? 'opacity-50' : 'opacity-100'
         )}
         style={{ backgroundImage: currentTheme.gradientBackground}}
         onClick={() => setCurrentSlide(index)}
        >
            <div className='h-full w-full flex-grow overflow-hidden'>
                <MasterRecursiveComponent 
                content={slide.content}
                isPreview={false}
                slideId={slide.id}
                isEditable={isEditable} 
                onContentChange={handleContentChange}
                />
            </div>
            {isEditable && (
  <Popover>
    <PopoverTrigger
      asChild
      className="absolute top-2 left-2"
    >
      <Button
        size="sm"
        variant="outline"
      >
        <EllipsisVertical className="w-5 h-5" />
        <span className="sr-only">Slide options</span>
      </Button>
    </PopoverTrigger>
   <PopoverContent className="w-fit p-0">
    <div className='flex space-x-2'>
        <Button
        variant="ghost"
        onClick={() => handleDelete(slide.id)}
        >
            <Trash className='w-5 h-5 text-red-500'/>
            <span className='sr-only'>Delete slide</span>
        </Button>
    </div>
   </PopoverContent>
  </Popover>
)}
        </div>
    )
}
const Editor = ({isEditable} : Props) => {
    const {
       getOrderedSlides,
       currentSlide,
       removeSlide,
       addSlideAtIndex,
       reorderSlides,
       slides,
       project 
    } = useSlidesStore()
    const orderedSlides = getOrderedSlides()
    const [loading, setLoading]= useState(true)
    const slideRefs = useRef<(HTMLDivElement | null)[]>([])
    const autisaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        if (isEditable) {
            reorderSlides(dragIndex, hoverIndex)
        }
    }

    const handleDelete = (id : string) => {
        if (isEditable) {
            console.log('Deleting', id)
            removeSlide(id)
        }
    }
    const handleDrop = (
        item: {
            type: string 
            layoutType: string 
            component: LayoutSlides 
            index?: number
        },
        dropIndex: number
    ) => {
        if (!isEditable) return 
        if (item.type === 'layout') {
            addSlideAtIndex({
                ...item.component,
                id: uuid4(),
                slideOrder: dropIndex
            }, dropIndex )
        } else if (item.type === 'SLIDE' && item.index !== undefined) {
            moveSlide(item.index, dropIndex)
        }
    } 
    useEffect(() => {
        if (slideRefs.current[currentSlide]) {
            slideRefs.current[currentSlide]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }, [currentSlide])
    useEffect(() => {
        if (typeof window!== "undefined") setLoading(false)
    }, [])
   const savelSlides = useCallback(() => {
    if (isEditable && project) {
        ;(async () => {
            await updateSlides(project.id, JSON.parse(JSON.stringify(slides)))
        })()
    }
   },[isEditable, project, slides])
    useEffect(() => {
     // using throttling 
     // if() we already have a timer? cancel timer and create new one
     if (autisaveTimeoutRef.current) {
        clearTimeout(autisaveTimeoutRef.current)
     } 
     //inside the timer make the save request 

     if (isEditable) {
        autisaveTimeoutRef.current = setTimeout(() => {
          savelSlides()
        }, 2000)
     }
     //cleanup
     return () => {
        if (autisaveTimeoutRef.current) {
            clearTimeout(autisaveTimeoutRef.current)
        }
     }

    },[slides, isEditable, project])
  return (
    <div className='flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20'>
        {loading ? (
            <div className='w-full px-4 flex-col space-y-6'>
                <Skeleton className='h-52 w-full'/>
                <Skeleton className='h-52 w-full'/>
                <Skeleton className='h-52 w-full'/>
                </div>
        ): (
            <ScrollArea className='flex-1 mt-8'>
                <div className='px-4 space-y-4 pt-2'>
                    {isEditable && (<DropZone 
                    index={0}
                    onDrop={handleDrop} 
                    isEditable={isEditable}
                    />)}
                    {orderedSlides.map((slide, index) => (
                        <React.Fragment key={slide.id || index}>
                            <DraggableSlide 
                            slide={slide}
                            index={index}
                            moveSlide={moveSlide}
                            handleDelete={handleDelete}
                            isEditable={isEditable}
                            />
                        </React.Fragment>
                    ))}
                </div>

            </ScrollArea>
        )}
      
    </div>
  )
}

export default Editor
