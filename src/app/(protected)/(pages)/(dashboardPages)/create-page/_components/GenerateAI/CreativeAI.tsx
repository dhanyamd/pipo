'use client'
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { containerVariants, itemVariants } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useCreativeAIStore from '@/store/useCreativeAI'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CardList from '../common/CardList'
import usePromptStore from '@/store/usePromptStore'
import RecentPrompts from './RecentPrompts'
import { toast } from 'sonner'
import { v4 as uuid, v4 } from 'uuid'
import { generateCreativePrompt } from '@/actions/openai'
import { OutlineCard } from '@/lib/types'
import { createProject } from '@/actions/projects'
import { useSlidesStore } from '@/store/useSlideStore'
type Props = {
    onBack: () => void 
}
const CreativeAI = ({onBack} : Props) => {
    const {setProject} = useSlidesStore()
    const [noOfCards, setNoOfCards] = useState(0)
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const [editText, setEditText] = useState('')
    const router = useRouter()
    const {addPrompt, prompts} = usePromptStore()
    const {currentAiPrompt,addMultipleOutlines, addOutline,  resetOutlines, setCurrentAiPrompt, outlines} = useCreativeAIStore()
    const handleBack = () => {
        onBack()
    }
    const handleGenerate = async() => {
        setIsGenerating(true) 
        if (outlines.length === 0) {
            toast.error('Error', {
                description: 'Please add at least one card to generate slides. '
            })
            return
        }
        try {
         const res = await createProject(
            currentAiPrompt,
            outlines.slice(0, noOfCards)
         )
         if (res.status !== 200 || !res.data ){
            throw new Error('Unable to create project')
         }
         router.push(`/presentation/${res.data.id}/select-theme`)
         setProject(res.data)
         addPrompt({
            id: v4(),
            title: currentAiPrompt || outlines?.[0].title,
            outlines: outlines,
            createdAt: new Date().toISOString()
         })
         setCurrentAiPrompt('')
         resetOutlines()
        }catch(error){
            toast.error("Error", {
                description: 'Failed to create project'
            })
        } finally {
            setIsGenerating(false)
        }
    }
    const resetCards = () => {
        setEditingCard(null)
        setSelectedCard(null)
        setEditText('')

        setCurrentAiPrompt('')
        resetOutlines()
    }
    const generateOutline = async() => {
        if (currentAiPrompt === ''){
            toast.error('Error', {
        description: 'Please enter a prompt to generate an outline.'})
        return
            }
        setIsGenerating(true)
        const res = await generateCreativePrompt(currentAiPrompt)
        if (res.status === 200 && res.data?.outlines) {
            const cardData: OutlineCard[] = []
            res.data?.outlines.map((outline: string, idx: number) => {
                const newCard = {
                   id: uuid(),
                   title: outline,
                   order: idx + 1,
                }
                cardData.push(newCard)
            })
            addMultipleOutlines(cardData)
            setNoOfCards(cardData.length)
            toast.success('Success', {
                description: 'Outline generated successfully'
            })
        } else {
            toast.error('Error', {
                description: 'Failed to generate outline. Please try again'
            })
        }
        setIsGenerating(false)
    }
    useEffect(() => {
        setNoOfCards(outlines.length)

    },[outlines.length])
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
            Generate with <span className='text-vivid'>Pipo AI</span>
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
      onClick={generateOutline}
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

    <CardList
     outlines={outlines}
     addOutline={addOutline}
     addMultipleOutlines={addMultipleOutlines}
     editingCard={editingCard}
     selectedCard={selectedCard}
     editText={editText}
     onEditChange={setEditText}
     onCardSelect={setSelectedCard}
     setEditText={setEditText}
     setEditingCard={setEditingCard}
     setSelectedCard={setSelectedCard}
     onCardDoubleClick={(id:string, title: string) => {
        setEditingCard(id)
        setEditText(title)
     }}
     />
     {outlines.length > 0 && <Button className='w-full' disabled={isGenerating} onClick={handleGenerate}>
        {isGenerating ? (
         <>
         <Loader2 className='animate-spin mr-2'/>Generating...</>
        ): (
            'Generate'
        )}
        </Button>}
        {prompts.length > 0 && <RecentPrompts />}
   </motion.div>
  )
}

export default CreativeAI
 