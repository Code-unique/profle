import { useState, useEffect, useRef } from "react";

interface TypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

export default function TypingEffect({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetweenTexts = 2000
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const type = () => {
      const currentText = texts[textIndex];
      
      if (isWaiting) {
        timeoutRef.current = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, delayBetweenTexts);
        return;
      }
      
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        
        // If text is fully deleted, move to next text
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        
        // If text is fully typed, pause before deleting
        if (displayText.length === currentText.length) {
          setIsWaiting(true);
        }
      }
    };
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(type, speed);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, textIndex, isDeleting, isWaiting, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);
  
  return (
    <span className="typing-effect">{displayText}</span>
  );
}
