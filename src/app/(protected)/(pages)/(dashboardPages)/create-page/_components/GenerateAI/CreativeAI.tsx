'use client'
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { containerVariants, itemVariants } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useCreativeAIStore from '@/store/useCreativeAI'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
type Props = {
    onBack: () => void 
}
const CreativeAI = ({onBack} : Props) => {
    const [noOfCards, setNoOfCards] = useState(0)
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const [editText, setEditText] = useState('')
    const router = useRouter()
    const {currentAiPrompt, resetOutlines, setCurrentAiPrompt, outlines} = useCreativeAIStore()
    const handleBack = () => {
        onBack()
    }
    const resetCards = () => {
        setEditingCard(null)
        setSelectedCard(null)
        setEditText('')

        setCurrentAiPrompt('')
        resetOutlines()
    }
  return (
   <motion.div
   className='space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
   variants={containerVariants}
   initial="hidden"
   animate="visible"
   >
    <Button
    onClick={handleBack}
    variant="outline"
    className='mb-4'
    >
        <ChevronLeft className='mr-2 h-4 w-4'/>Back
    </Button>
    <motion.div
    variants={itemVariants}
    className='text-center space-y-2'
    >
        <h1 className='text-4xl font-bold text-primary'>
            Generate with <span className='text-vivid'>Creative AI</span>
        </h1>
        <p className='text-gray-500'>What would you like to create today?</p>
    </motion.div>
    <motion.div
    className='bg-primary/10 p-4 rounded-xl'
    variants={itemVariants}
    >
        <div className='flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl'>
        <Input 
        placeholder='Enter Prompt and add to the cards...'
        className='text-base sm:tect-xl border-0 focus-visible:ring-0 shadow-none bg-transparent flex-grow'
        required
        value={currentAiPrompt || ''}
        onChange={(e) => setCurrentAiPrompt(e.target.value)}
        />
        <div className='flex items-center gap-3'>
            <Select value={noOfCards.toString()}
            onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
            <SelectTrigger className='w-fit gap-2 font-semibold shadow-xl'>
            <SelectValue placeholder="Select number of cards"/>
            </SelectTrigger>
            <SelectContent className='w-fit'>
                {outlines.length === 0 ? (
                    <SelectItem
                    value='0'
                    className='font-semibold'
                    >
                        No cards
                    </SelectItem>
                ): (
                    Array.from({ length : outlines.length }, (_,idx) => idx+1).map((num) => (
                        <SelectItem
                        key={num}
                        value={num.toString()}
                        className='font-semibold'
                        >
                            {num} {num === 1 ? 'Card' : 'Cards'}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
            </Select>

            <Button
            variant="destructive"
            onClick={resetCards}
            size="icon"
            aria-label='Reset cards'
            >
                <RotateCcw className='h-4 w-4'/>
            </Button>
        </div>
        </div>
    </motion.div>
    <div className='w-full flex justify-center items-center'>
      <Button className='font-medium text-lg flex gap-2 items-center'
      disabled={isGenerating}
      >
        {isGenerating ? (
     <>
     <Loader2 className='animate-spin mr-2'/> Generating...
     </>
        ): (
            'Generate Outline'
        )}
      </Button>
    </div>
   </motion.div>
  )
}

export default CreativeAI
