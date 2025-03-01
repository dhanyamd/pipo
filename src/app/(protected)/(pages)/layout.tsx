import { getRecentProjects } from '@/actions/projects'
import { onAuthentiatedUser } from '@/actions/user'
import AppSidebar from '@/components/globals/app-sidebar'
import NavMain from '@/components/globals/app-sidebar/nav-main'
import UpperInfoBar from '@/components/globals/upper-info-bar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'
type Props = {
    children: React.ReactNode
}
const Layout = async ({children} : Props) => {
    const recentProjects = await getRecentProjects();
    const checkUser = await onAuthentiatedUser()
    if (!checkUser.user) {
        redirect('/sign-in')
    }
  return  <SidebarProvider>
        <AppSidebar recentProjects={recentProjects.data || []} user={checkUser.user}/>
        <SidebarInset>
            <UpperInfoBar user={checkUser.user}/>
            {children}
        </SidebarInset>
    </SidebarProvider>
  
}

export default Layout
