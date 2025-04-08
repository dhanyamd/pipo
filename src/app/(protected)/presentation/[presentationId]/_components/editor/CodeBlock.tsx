import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/store/useSlideStore";

type Props = {
    code?: string;
    language?: string;
    onChange: (newCode: string) => void;
    className?: string;
  };
  
  const CodeBlock = ({ code, language, onChange, className }: Props) => {
    const { currentTheme } = useSlidesStore();
  
    return (
      <pre
        className={cn('p-4 rounded-lg overflow-x-auto', className)}
        style={{ backgroundColor: currentTheme.accentColor + '20' }}
      >
        <code className={`language-${language}`}>
          <textarea value={code} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full h-full bg-transparent outline-none font-mono"
          style={{ color: currentTheme.fontColor }}
          ></textarea>
        </code>
      </pre>
    );
  };

  export default CodeBlock