import React from 'react'
import DeleteAllButton from './_component/DeleteAllButton'
import { getDeletedProjects } from '@/actions/projects'
import NotFound from '@/components/globals/not-found'
import Projects from '@/components/globals/projects'

const Page = async () => {
    const deletedProjects = await getDeletedProjects()
    if(!deletedProjects.data) return <NotFound />
  return (
    <div className='flex flex-col gap-6 relative'>
    <div className='flex justify-between items-center'>
        <div className='flex flex-col items-start'>
            <h1 className='text-2xl font-semibold dark:text-primary'>Trash</h1>
            <p className='text-base font-normal dark:text-secondary'>
                All your deleted presentations
            </p>
        </div>
        <DeleteAllButton Projects={deletedProjects.data}/>
         </div>
         {deletedProjects.data.length > 0 ? (
            <Projects projects={deletedProjects.data}/>
        ): (
            <NotFound />
        )}
    </div>
  )
}

export default Page