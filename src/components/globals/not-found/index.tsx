import { Snowflake } from 'lucide-react'
import React from 'react'
type Props = {}
const NotFound = () => {
  return (
    <div className='flex flex-col text-xl min-h-[70vh] w-full justify-center items-center gap-12'>
     <Snowflake className='size-10'/>
      <div className='flex flex-col items-center justify-center text-center'>
    <p className='text-3xl font-semibold text-primary'>
     Nothing to see here
    </p>
    <p className='text-base font-normal text-gray-500 dark:text-gray-700'>
   Create a new project to witness the power of {' '}
   <span className='text-vivid'>
   Creative AI
   </span>
    </p>
      </div>
    </div>
  )
}

export default NotFound
