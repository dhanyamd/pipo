'use client'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'

const NewProjectButton = ({user} : {user: User}) => {
    const router = useRouter()
  return (
    <Button
    size={'lg'}
    className='rounded-lg font-semibold'
    disabled={!user.subscription}
    >
 <Plus />
 New Project
    </Button>
  )
}

export default NewProjectButton
