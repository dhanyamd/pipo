import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import UploadImage from './UploadImage';

type Props = {
    src: string;
    alt: string;
    className?: string;
    isPreview?: boolean;
    contentId: string;
    onContentChange: (
      contentId: string,
      newContent: string | string[] | string[][]
    ) => void;
    isEditable?: boolean;
  };
const CustomImage = ({
    alt,
    contentId,
    onContentChange,
    src,
    className,
    isEditable = true,
    isPreview = false
}: Props) => {
    const [imgError, setImgError] = useState(false)
    const [imgSrc, setImgSrc] = useState(src)
    
    // Update imgSrc when src prop changes
    useEffect(() => {
      setImgSrc(src)
      setImgError(false)
    }, [src])
    
    // Fallback to placeholder if image fails to load (handles 403, 404, network errors, etc.)
    const handleError = () => {
      if (!imgError && imgSrc) {
        console.warn('Image failed to load:', imgSrc)
        setImgError(true)
        // Use placehold.co which is already configured in next.config.ts
        setImgSrc(`https://placehold.co/${isPreview ? 48 : 800}x${isPreview ? 48 : 800}/cccccc/666666?text=Image+Not+Available`)
      }
    }
    
    // Check if src is valid
    const isValidSrc = imgSrc && imgSrc.trim() !== '' && imgSrc !== 'undefined' && !imgError
    
    // Determine if image should be unoptimized (external URLs, Azure Blob, Uploadcare, etc.)
    const shouldUnoptimize = Boolean(imgSrc && (
      imgSrc.includes('oaidalleapiprodscus.blob.core.windows.net') ||
      imgSrc.includes('placehold.co') ||
      imgSrc.includes('ucarecdn.com') ||
      imgSrc.includes('uploadcare.com') ||
      imgSrc.startsWith('http://') ||
      imgSrc.startsWith('https://')
    ))
    
    return (
        <div className="relative group w-full h-full rounded-lg overflow-hidden">
          {isValidSrc ? (
            <Image
              src={imgSrc}
              width={isPreview ? 48 : 800}
              height={isPreview ? 48 : 800}
              alt={alt}
              className={`object-cover w-full h-full rounded-lg ${className}`}
              onError={handleError}
              unoptimized={shouldUnoptimize}
              priority={!isPreview}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center rounded-lg">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-400 dark:text-gray-500 text-xs">No image</span>
            </div>
          )}
          {!isPreview && isEditable && (
            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10 rounded-lg'>
              <div className='bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg'>
                <UploadImage contentId={contentId} onContentChange={onContentChange}/>
              </div>
            </div>
          )}
        </div>
      );
}

export default CustomImage
