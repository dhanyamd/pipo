import type { Projects } from '@prisma/client';
import React from 'react';
import {motion} from "framer-motion"
import { containerVariants } from '@/lib/constants';
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
   ></motion.div>
  )
}

export default Projects
