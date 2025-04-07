import { cn } from '@/lib/utils'
import { useSlidesStore } from '@/store/useSlideStore'
import React from 'react'
type ListProps = {
    items: string[] 
    onChange: (newItems: string[]) => void 
    className? : string 
    isEditable?: boolean
}
type ListItemProps = {
    item: string;
    index: number;
    onChange: (index: number, value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    isEditable: boolean;
    fontColor: string;
  };
  
  const ListItem: React.FC<ListItemProps> = ({
    item,
    index,
    onChange,
    onKeyDown,
    isEditable,
    fontColor,
  }) => (
    <input 
    type='text' 
    value={item} 
    onChange={(e) => onChange(index, e.target.value)} 
    onKeyDown={(e) => onKeyDown(e, index)} 
    className='bg-transparent outline-none w-full py-1'
    style={{color: fontColor}} 
    readOnly={!isEditable}
    />
  )
const NumberedList: React.FC<ListProps> = ({
    items,
    onChange,
    className,
    isEditable = true
}) => {
    const { currentTheme } = useSlidesStore()
    const handleChange = (index: number, value: string) => {
        if (isEditable) {
            const newItems = [...items] 
            newItems[index] = value 
            onChange(newItems)
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const newItems = [...items];
          newItems.splice(index + 1, 0, '');
          onChange(newItems);
          setTimeout(() => {
            const nextInput = document.querySelector(
              `li:nth-child(${index + 2}) input`
            ) as HTMLInputElement | null;
            if (nextInput) nextInput.focus();
          }, 0);
        } else if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
               e.preventDefault() 
               const newItems = [...items ]
               newItems.splice(index, 1) 
               onChange(newItems)
        }
      };
      
      return (
        <ol
          className={cn('list-decimal list-inside space-y-1', className)}
          style={{ color: currentTheme.fontColor }}
        >
          {items.map((item, index) => (
            <li key={index}>
              <ListItem
                item={item}
                index={index}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                isEditable={isEditable}
                fontColor={currentTheme.fontColor}
              />
            </li>
          ))}
        </ol>
      );
    return (
        <ol
          className={cn('list-decimal list-inside space-y-1', className)}
          style={{ color: currentTheme.fontColor }}
        >
          {items.map((item, index) => (
            <li key={index}>
              <ListItem
                item={item}
                index={index}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                isEditable={isEditable}
                fontColor={currentTheme.fontColor}
              />
            </li>
          ))}
        </ol>
      );
}

export default NumberedList
