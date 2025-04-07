import React from 'react'
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
    return (
        <div className="relative group w-full h-full rounded-lg">
          <Image
            src={src}
            width={isPreview ? 48 : 800}
            height={isPreview ? 48 : 800}
            alt={alt}
            className={`object-cover w-full h-full rounded-lg ${className}`}
          />
          {!isPreview && isEditable && <div
           className='absolute top-0 lefy-0 hidden group-hover:block'>
            <UploadImage contentId={contentId} onContentChange={onContentChange}/>
            </div>}
        </div>
      );
}

export default CustomImage
