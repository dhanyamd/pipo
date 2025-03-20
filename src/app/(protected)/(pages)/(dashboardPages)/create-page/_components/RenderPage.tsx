'use client'
import usePromptStore from '@/store/usePromptStore'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import CreatePage from './CreatePage/CreatePage'
import CreativeAI from './GenerateAI/CreativeAI'
import ScratchPage from './GenerateAI/ScratchPage'
type Props = {}
const RenderPage = (props : Props) => {
    const router = useRouter()
    const {page, setPage} = usePromptStore()

    const hanleBack = () => {
        setPage('create')
    }
   const handleSelectOption = (option: string) => {
    if (option === "template"){
        router.push('/templates')
    } else if (option === "create-scratch") {
        setPage('create-scratch')
    } else {
        setPage('creative-ai')
    }
   }
    const resetStep = () => {
        switch (page) {
            case 'create':
                return <CreatePage onSelectOption={handleSelectOption}/>
            case 'create-scratch':
                  return <ScratchPage onBack={hanleBack}/>
            case 'creative-ai':
                return <CreativeAI onBack={hanleBack}/>
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
