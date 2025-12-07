'use client'

import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"
interface HeadingProps extends React.TextareaHTMLAttributes<HTMLAreaElement>{
    className? : string 
    styles?: React.CSSProperties 
    isPreview?: boolean
}
const createHeading = (displayName: string, defaultClassName: string) => {
    const Heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>(
        ({children, styles, isPreview =  false, className, ...props}, ref) => {
            const textareaRef = useRef<HTMLTextAreaElement>(null)
            useEffect(() => {
                const textarea = textareaRef.current 
                if (textarea && !isPreview) {
                    const adjustHeight = () => {
                        textarea.style.height = '0'
                        textarea.style.height = `${textarea.scrollHeight}px`
                    }
                    textarea.addEventListener('input', adjustHeight)
                    adjustHeight()
                    return () => textarea.removeEventListener('input', adjustHeight)
                }
            },[isPreview])
            
            const previewClassName = isPreview ? 'text-xs' : ''

            return (
                //@ts-ignore
                <textarea
                className={cn(
                    `w-full bg-transparent ${defaultClassName} ${previewClassName} font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none 
                   resize-none overflow-hidden`, className
                )}
                style={{
                    padding: isPreview ? '0.25rem 0' : '0.5rem 0',
                    margin: 0,
                    color: 'inherit',
                    boxSizing: 'border-box',
                    lineHeight: isPreview ? '1.3' : '1.4',
                    minHeight: isPreview ? '1.3em' : '1.4em',
                    ...styles
                }}
                ref={(el) => {
                    ;(textareaRef.current as HTMLTextAreaElement | null) = el 
                    if (typeof ref === 'function') ref(el)
                    else if (ref) ref.current = el
                } }
                readOnly={isPreview}
                {...props}
                />
            )
        }
    )
    Heading.displayName = displayName 
    return Heading 
}

const Heading1 = createHeading('Heading1', 'text-4xl')
const Heading2 = createHeading('Heading2', 'text-3xl')
const Heading3 = createHeading('Heading3', 'text-2xl') 
const Heading4 = createHeading('Heading4', 'text-xl')
const Title = createHeading('Title', 'text-5xl')

export {Heading1, Heading2, Heading3, Heading4, Title}