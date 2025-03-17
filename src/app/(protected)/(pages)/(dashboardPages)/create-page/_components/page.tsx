import React, { Suspense } from 'react'
import CreatePage from './CreatePage/CreatePageSkeleton'
import RenderPage from './RenderPage'
type Props = {}
const Page = (props : Props) => {
  return (
   <main className='w-full h-full pt-6'>
     <Suspense fallback={<CreatePage/>}>
     <RenderPage/>
     </Suspense>
   </main>
  )
}

export default Page
