'use client'
import { itemVariants, themes, timeAgo } from '@/lib/constants'
import { useSlidesStore } from '@/store/useSlideStore'
import { JsonValue } from '@prisma/client/runtime/library'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ThumbnailPreview from '../thumbnail-preview'
import AlertDialogBox from '../alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { deleteProject, recoverProject } from '@/actions/projects'
import { Theme } from '@/lib/types'
import { fixContentIds } from '@/lib/utils'
type Props = {
    projectId: string
    title: string 
    createdAt: string 
    isDelete?: boolean 
    themeName: string
    slideData: JsonValue
}
const ProjectCard = ({projectId, title, createdAt, themeName,  slideData,isDelete} : Props) => {
const router = useRouter()
const [loading, setLoading] = useState(false)
const [open, setOpen] = useState(false)
  const {setSlides} = useSlidesStore()
    const handleNavigation = () => {
      // Fix any "uuidv4()" string IDs in existing data
      const fixedSlides = fixContentIds(JSON.parse(JSON.stringify(slideData)))
      setSlides(fixedSlides)
      router.push(`/presentation/${projectId}`)
  }
  const theme = themes.find((theme) => theme.name === themeName)
  const handleRecover = async () => {
    setLoading(true)
    if (!projectId) {
        setLoading(false)
        toast.error("Error", {
            description: "Project not found."
        })
        return 
    }
    try {
        const res = await recoverProject(projectId)
        if (res.status !== 200) {
            toast.error('Oops', {
                description: res.error || 'Something went wrong'
            })
            return 
        }
        setOpen(false)
        router.refresh()
        toast.success('Success', {
            description: 'Project recovered successfully'
        })
    } catch (error) {
        toast.error('Oops', {
            description: 'Something went wrong.Please contact support!'
        })
    }
  }
  const handleDelete = async () => {
    setLoading(true)
    if (!projectId) {
        setLoading(false)
        toast.error("Error", {
            description: "Project not found."
        })
        return 
    }
    try {
        const res = await deleteProject(projectId)
        if (res.status !== 200) {
            toast.error('Oops', {
                description: res.error || 'Failed to delete the project'
            })
            return 
        }
        setOpen(false)
        router.refresh()
        toast.success('Success', {
            description: 'Project deleted successfully'
        })
    } catch (error) {
        toast.error('Oops', {
            description: 'Something went wrong.Please contact support!'
        })
    }
  }
    return (
        <motion.div
        className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
            !isDelete && 'hover:bg-muted/50'
        }`}
        variants={itemVariants}
        >
    <div 
    className='relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer '
    onClick={handleNavigation}
    >
    <ThumbnailPreview
    theme={theme!}
    slide={JSON.parse(JSON.stringify(slideData))?.[0]}
    />
    </div>
    <div className='w-full'>
        <div className='space-y-1'>
      <h3 className='font-semibold text-base text-primary line-clamp-1'>
        {title}
      </h3>
      <div className='flex w-full justify-between items-center gap-2'>
      <p className='text-sm text-muted-foreground' suppressHydrationWarning>
        {timeAgo(createdAt)}
      </p>
       {isDelete ? ( 
        <AlertDialogBox
        description='This will recover your project and restore your data.'
        className='bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700'
        loading={loading}
        open={open}
        onClick={handleRecover}
        handleOpen={() => setOpen(!open)}
        >
            <Button
            size={'sm'}
            variant={'ghost'}
            className='bg-background-80 dark:hover:bg-background-90'
            disabled={loading}
            >Recover</Button>
        </AlertDialogBox>
       ): (
        <AlertDialogBox
        description='This will recover your project and restore your data.'
        className='bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
        loading={loading}
        open={open}
        onClick={handleDelete}
        handleOpen={() => setOpen(!open)}
        >
            <Button
            size={'sm'}
            variant={'ghost'}
            className='bg-background-80 dark:hover:bg-background-90'
            disabled={loading}
            >Delete</Button>
        </AlertDialogBox>
       )}
      </div>
        </div>

    </div>
        </motion.div>
    )
}

export default ProjectCard

