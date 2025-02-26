export const dynamic = "force-dynamic"
import { onAuthentiatedUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'
type Props = {
    children: React.ReactNode
}
const Layout = async (props: Props) => {
    const auth = await onAuthentiatedUser()
    if (!auth.user) redirect('/sign-in')
  return (
    <div className='w-full min-h-screen'>
     {props.children} 
    </div>
  )
}

export default Layout
