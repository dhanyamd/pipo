import { getAllProjects } from '@/actions/projects'
import NotFound from '@/components/globals/not-found'
import ProjectCard from '@/components/globals/project-card'
import Projects from '@/components/globals/projects'
import React from 'react'

const DashboardPage = async () => {
    const allProjects = await getAllProjects()
  return (
    <div className='w-full flex flex-col gap-6 relative'>
        <div className='flex flex-col-reverse items-start w-full 
        gap-6 sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex flex-col items-start'>
        <h1 className='text-2xl pl-3 font-semibold dark:text-primary backdrop-blur-lg'>
        Projects
        </h1>
        <p className='text-base font-normal pl-3 dark:text-gray-500'>
         All of your work in one place
        </p>
        </div>
        </div>
        <ProjectCard />
      {allProjects.data && allProjects.data.length > 0 ? (
        <Projects projects={allProjects.data}/>
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default DashboardPage
