'use client'
import usePromptStore from '@/store/usePromptStore'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import CreatePage from './CreatePage/CreatePage'
type Props = {}
const RenderPage = (props : Props) => {
    const router = useRouter()
    const {page, setPage} = usePromptStore()

    const resetStep = () => {
        switch (page) {
            case 'create':
                return <CreatePage/>
            case 'create-scratch':
                  return <></>
            case 'creative-ai':
                return <></>
            default:
                null
        }
    }
  return (
    <AnimatePresence mode='wait'>
        <motion.div key={page}
        initial={{ opacity: 0, x:20 }}
        animate={{ opacity: 1, x:20 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3}}
        >
            {resetStep()}
        </motion.div>
    </AnimatePresence>
  )
}

export default RenderPage
