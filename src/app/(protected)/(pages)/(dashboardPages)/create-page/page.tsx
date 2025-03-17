import React, { Suspense } from 'react'
import CreatePage from './_components/CreatePage/CreatePageSkeleton'
import RenderPage from './_components/RenderPage'
type Props = {}

const DashboardPages = (props : Props) => {
  return (
   <main className='w-full h-full pt-6'>
     <Suspense fallback={<CreatePage/>}>
     <RenderPage/>
     </Suspense>
   </main>
  )
}

export default DashboardPages
