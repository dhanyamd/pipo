import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Recursively fix IDs in content - replace "uuidv4()" strings with actual UUIDs and ensure uniqueness
export function fixContentIds(content: any, seenIds: Set<string> = new Set()): any {
  if (!content) return content

  // If it's an array, process each item
  if (Array.isArray(content)) {
    return content.map(item => fixContentIds(item, seenIds))
  }

  // If it's an object, process it
  if (typeof content === 'object') {
    const fixed: any = {}
    
    for (const key in content) {
      if (key === 'id') {
        // Fix the ID
        let newId = content[key]
        
        // If it's the literal string "uuidv4()", replace it
        if (newId === 'uuidv4()' || typeof newId !== 'string' || newId.length === 0) {
          newId = uuidv4()
        }
        
        // Ensure uniqueness
        while (seenIds.has(newId)) {
          newId = uuidv4()
        }
        
        seenIds.add(newId)
        fixed[key] = newId
      } else {
        // Recursively process nested content
        fixed[key] = fixContentIds(content[key], seenIds)
      }
    }
    
    return fixed
  }

  return content
}
