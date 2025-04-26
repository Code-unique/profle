import { useEffect, useState } from "react";
import { throttle } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMobile();
  
  useEffect(() => {
    if (isMobile) return;
    
    // Only show custom cursor on desktop
    const handleMouseMove = throttle((e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    }, 10);
    
    const handleMouseOut = () => {
      setIsVisible(false);
    };
    
    // Track hover state for interactive elements
    const handleInteractiveElementsHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], select, .clickable'
      );
      
      const mouseEnterHandler = () => setIsHovering(true);
      const mouseLeaveHandler = () => setIsHovering(false);
      
      interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", mouseEnterHandler);
        el.addEventListener("mouseleave", mouseLeaveHandler);
      });
      
      return () => {
        interactiveElements.forEach(el => {
          el.removeEventListener("mouseenter", mouseEnterHandler);
          el.removeEventListener("mouseleave", mouseLeaveHandler);
        });
      };
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    
    const cleanupHoverHandlers = handleInteractiveElementsHover();
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      cleanupHoverHandlers();
    };
  }, [isMobile, isVisible]);
  
  if (isMobile) return null;
  
  return (
    <div 
      className={`custom-cursor bg-primary transition-transform duration-100 ${
        isHovering ? "scale-[1.5]" : ""
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px) ${isHovering ? "scale(1.5)" : "scale(1)"}` 
      }}
      aria-hidden="true"
    />
  );
}
