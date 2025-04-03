import React, { Suspense } from 'react'
import CreatePage from './_components/CreatePage/CreatePageSkeleton'
import RenderPage from './_components/RenderPage'
import { onAuthentiatedUser } from '@/actions/user'
import { redirect } from 'next/navigation'
type Props = {}

const DashboardPages = async(props : Props) => {
  const checkUser = await onAuthentiatedUser()
  if (!checkUser.user) {
    redirect('/sign-in')
  }
  //TODO: uncomment later
  //if (!checkUser.user.subscription) {
    //redirect('/dashboard')
 // }
  return (
   <main className='w-full h-full pt-6'>
     <Suspense fallback={<CreatePage/>}>
     <RenderPage/>
     </Suspense>
   </main>
  )
}

export default DashboardPages
