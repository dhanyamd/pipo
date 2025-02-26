import { onAuthentiatedUser } from '@/actions/user'
import AppSidebar from '@/components/globals/app-sidebar'
import NavMain from '@/components/globals/app-sidebar/nav-main'
import { SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'
type Props = {
    children: React.ReactNode
}
const Layout = async ({children} : Props) => {
    const checkUser = await onAuthentiatedUser()
    if (!checkUser.user) {
        redirect('/sign-in')
    }
  return  <SidebarProvider>
        <AppSidebar>
            
        </AppSidebar>
    </SidebarProvider>
  
}

export default Layout
