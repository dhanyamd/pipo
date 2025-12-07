'use client'
import { Button } from '@/components/ui/button'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useSlidesStore } from '@/store/useSlideStore'
import { Projects } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { fixContentIds } from '@/lib/utils'
type Props = {
    recentProjects: Projects[]
}
const RecentOpen = ({ recentProjects} : Props) => {
    const router = useRouter()
    const {setSlides} = useSlidesStore()
    const handleClick = (projectId: string, slides: JsonValue) => {
      if(!projectId || !slides) {
        toast.error('Project not found', {
            description: 'Please try again!'
        })
        return 
      }
      // Fix any "uuidv4()" string IDs in existing data
      const fixedSlides = fixContentIds(JSON.parse(JSON.stringify(slides)))
      setSlides(fixedSlides)
      router.push(`/presentation/${projectId}`)
    }
  return recentProjects.length > 0 ? (
    <SidebarGroup>
    <SidebarGroupLabel className='text-xl'>
        Recently Opened
    </SidebarGroupLabel>
    <SidebarMenu>
     {recentProjects.length > 0 ? 
     recentProjects.map((item, idx) => (
        <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
        asChild 
        tooltip={item.title}
        className='hover:bg-primary-80'
        >
    <Button
    variant={'link'}
    onClick={() => handleClick(item.id, item.slides)}
    className='text-xs items-center justify-start'
    >
        <span>{item.title}</span>
    </Button>
        </SidebarMenuButton>
    </SidebarMenuItem>
     ))
     : ' '}
    </SidebarMenu>
</SidebarGroup>
  ) : ' '
}

export default RecentOpen
