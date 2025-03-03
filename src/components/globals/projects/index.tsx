import type { Projects } from '@prisma/client';
import React from 'react';
import {motion} from "framer-motion"
import { containerVariants } from '@/lib/constants';
import ProjectCard from '../project-card';
type Props = {
    projects: Projects[];
};
const Projects = ({ projects } : Props) => {
  return (
   <motion.div
   className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
   variants={containerVariants}
   initial="hidden"
   animate="visible"
   >
    {projects.map((project, id) => (
      <ProjectCard 
      key={id}
      projectId={project.id}
      title={project.title}
      createdAt={project.createdAt.toString()}
      slideData={project.slides}
      src={
        project.thumbnail|| 
        'https://images.unsplash.com/photo-1505533321630-975218a5f66f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
      />
    ))}
   </motion.div>
  )
}

export default Projects
