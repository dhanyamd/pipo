'use client'
import { OutlineCard } from '@/lib/types'
import {AnimatePresence, motion} from 'framer-motion'
import React, { useRef, useState } from 'react'
import Card from './Card'
import AddCardButton from './AddCardButton'
type Props = {
    outlines: OutlineCard[]
    editingCard: string | null 
    selectedCard: string | null 
    editText: string 
    addOutline?: (card: OutlineCard) => void 
    onEditChange: (value: string) => void 
    onCardSelect: (id: string) => void 
    onCardDoubleClick: (id: string, title: string) => void
    setEditText: (value: string) => void 
    setEditingCard: (id: string | null) => void 
    addMultipleOutlines: (cards: OutlineCard[]) => void
    setSelectedCard: (value : string | null) => void 
}
const CardList = ({
 addMultipleOutlines,
 editText,
 editingCard,
 onCardDoubleClick,
 setSelectedCard,
 onCardSelect,
 onEditChange,
 outlines,
 selectedCard,
 setEditText,
 setEditingCard,
 addOutline
}: Props) => {
    const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null)
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
    const onAddCard = (index? : number) => {
        const newCard: OutlineCard = {
            id: Math.random().toString(36).substring(2,9),
            title: editText || 'New Section',
            order: (index !== undefined ? index + 1 : outlines.length) + 1
        }
        const updatedCards = index !== undefined ? [
            ...outlines.slice(0, index + 1),
            newCard,
            ...outlines.slice(index + 1)
            .map((card) => ({...card, order: card.order + 1}))
        ] : [
            ...outlines, newCard
        ]
        addMultipleOutlines(updatedCards)
        setEditText('')
    }
    const onCardUpdate = (id: string, newTitle: string) => {
        addMultipleOutlines(
            outlines.map((card) => 
            card.id === id ? {...card, title: newTitle} : card)
        )
        setEditingCard(null)
        setSelectedCard(null)
        setEditText('')
    }
    const onCardDelete = (id: string ) => {
        addMultipleOutlines(outlines 
            .filter((card) => card.id !== id)
            .map((card, index) => ({...card, order: index + 1}))
        )
    }
    const getDragOverStyles = (cardIndex: number) => {
        if (dragOverIndex === null || draggedItem === null) return {}
        if (cardIndex === dragOverIndex) {
            return {
                borderTop: '2px solid #000',
                marginTop: '0.5rem',
                transition: 'margin 0.2s cubic-beizer(0.25, 0.1, 0.25, 1)'
            }
        }else if (cardIndex === dragOverIndex - 1){
            return {
                borderBottom: '2px solid #000',
                marginBottom: '0.5rem',
                transition: 'margin 0.2s cubic-beizer(0.25, 0.1, 0.25, 1)'
            }
        }
        return {}
    }
    const  dragOffsetY = useRef<number>(0)
    const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
        setDraggedItem(card)
        e.dataTransfer.effectAllowed = 'move'
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        dragOffsetY.current = e.clientY - rect.top 

        const draggedE = e.currentTarget.cloneNode(true) as HTMLElement
        draggedE.style.position = 'absolute'
        draggedE.style.top = '-100px'
        draggedE.style.opacity='0.8'
        draggedE.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`
        document.body.appendChild(draggedE)
        e.dataTransfer.setDragImage(draggedE, 0, dragOffsetY.current)

        setTimeout(() => {
            setDragOverIndex(outlines.findIndex((c) => c.id === card.id))
            document.body.removeChild(draggedE)
        }, 0)
    }
    const onDragEnd = () => {
        setDraggedItem(null)
        setDragOverIndex(null)
    }
    const onDragOver = (e: React.DragEvent, index: number) => {
      e.preventDefault()
      if (!draggedItem) return

      const rect = e.currentTarget.getBoundingClientRect()
      const y = e.clientY - rect.top
      const threshold = rect.height / 2

      if(y < threshold) {
        setDragOverIndex(index)
      } else {
        setDragOverIndex(index + 1)
      }
     }
     const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (!draggedItem || dragOverIndex === null) return 
        const updatedCards = [...outlines]
        const draggedIndex = updatedCards.findIndex(
           (card) => card.id === draggedItem.id 
        )
         
        if (draggedIndex === -1 || draggedIndex === dragOverIndex) return 
        const [removedCard] = updatedCards.splice(draggedIndex, 1)
        updatedCards.splice(
            dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
            0,
            removedCard
        )
       addMultipleOutlines(
        updatedCards.map((card, index) => ({ ...card, order: index}))
       )
       setDragOverIndex(null)
       setDraggedItem(null)
     }
  return (
    <motion.div
    className='space-y-2 -my-2'
    layout
    onDragOver={(e) => {
        e.preventDefault()
        if (
            outlines.length === 0 || 
            e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
            onDragOver(e, outlines.length)
        }
    }}
    onDrop={(e) => {
        e.preventDefault()
        onDrop(e)
    }}
    >
        <AnimatePresence>
            {outlines.map((card, index) => (
                <React.Fragment key={card.id}>
                    <Card 
                    onDragOver={(e) => onDragOver(e, index)}
                    card={card}
                    isEditing={editingCard === card.id}
                    isSelected={selectedCard === card.id}
                    editText={editText}
                    onEditChange={onEditChange}
                    onEditBlur={() => onCardUpdate(card.id, editText)}
                    onEditKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onCardUpdate(card.id, editText)
                        }
                    }}
                    onCardClick={() => onCardSelect(card.title)}
                    onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
                    onDeleteClick={() => onCardDelete(card.id)}
                    dragHnadlers={{
                        onDragStart: (e) => onDragStart(e, card),
                        onDragEnd: onDragEnd
                    }}
                    dragOverStyles={
                        getDragOverStyles(index)}
                    />
                    <AddCardButton onAddCard={() => onAddCard(index)}/>
                </React.Fragment>
            ))}
        </AnimatePresence>
    </motion.div>

  )
}

export default CardList
