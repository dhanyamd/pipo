import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/store/useSlideStore";

interface BlockQuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
    children: React.ReactNode;
    className?: string
  }
  
  const BlockQuote = ({ children, className, ...props }: BlockQuoteProps) => {
    const { currentTheme } = useSlidesStore();
  
    return (
      <blockquote
        className={cn(
          'pl-4 border-l-4 italic',
          'my-4 py-2',
          'text-gray-700 dark:text-gray-300',
          className
        )}
        style={{
          borderLeftColor: currentTheme.accentColor,
        }}
        {...props}
      >
        {children}
      </blockquote>
    );
  };

  export default BlockQuote