import React from 'react'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

type Props = {
    contentId: string;
    onContentChange: (
      contentId: string,
      newContent: string | string[] | string[][]
    ) => void;
  };
  
  const UploadImage = ({ contentId, onContentChange }: Props) => {
    const handleChangeEvent = (e: {cdnUrl: string | string[] | string[][]}) => {
        // Ensure we pass a string, not an array
        const url = Array.isArray(e.cdnUrl) ? e.cdnUrl[0] : e.cdnUrl
        onContentChange(contentId, url as string)
    }
    const uploadcareKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || process.env.UPLOADCARE_PUBLIC_KEY || ''
    
    if (!uploadcareKey) {
      console.error('Uploadcare public key is not configured. Please add NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY to your .env.local file')
      return (
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs max-w-xs">
          <p className="font-semibold mb-1">Uploadcare not configured</p>
          <p className="text-xs">Add <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY</code> to your <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">.env.local</code> file</p>
          <p className="text-xs mt-1">Get your key from: <a href="https://app.uploadcare.com/projects/-/api-keys/" target="_blank" rel="noopener noreferrer" className="underline">uploadcare.com</a></p>
        </div>
      )
    }
    
    return (
      <div>
        <FileUploaderRegular
          sourceList="local, url, dropbox"
          classNameUploader="uc-light"
          pubkey={uploadcareKey}
          multiple={false} 
          onFileUploadSuccess={handleChangeEvent} 
          maxLocalFileSizeBytes={10000000}
        />
      </div>
    );
  };

export default UploadImage
