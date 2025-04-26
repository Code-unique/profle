import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DigitalRainButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  href?: string;
}

export default function DigitalRainButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
}: DigitalRainButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ';
  
  // Colors based on variant
  const colorMap = {
    primary: { base: 'hsl(var(--primary))', glow: 'rgba(0, 238, 255, 0.8)' },
    secondary: { base: 'hsl(var(--secondary))', glow: 'rgba(255, 0, 255, 0.8)' },
    accent: { base: 'hsl(var(--accent))', glow: 'rgba(0, 255, 0, 0.8)' },
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Border and background based on variant
  const variantClasses = {
    primary: 'border-primary/80 bg-card hover:bg-primary/10 text-primary hover:shadow-primary',
    secondary: 'border-secondary/80 bg-card hover:bg-secondary/10 text-secondary hover:shadow-secondary',
    accent: 'border-accent/80 bg-card hover:bg-accent/10 text-accent hover:shadow-accent',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Digital rain animation
  useEffect(() => {
    if (!buttonRef.current || !canvasRef.current || !isHovered) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match button
    const updateCanvasSize = () => {
      const buttonRect = buttonRef.current?.getBoundingClientRect();
      if (buttonRect) {
        canvas.width = buttonRect.width;
        canvas.height = buttonRect.height;
      }
    };
    
    updateCanvasSize();
    
    // Initialize matrix rain
    const color = colorMap[variant].base;
    const glowColor = colorMap[variant].glow;
    
    // Create rain drops
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops at random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    // Draw function
    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 5;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        
        // Position text
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Draw the character
        ctx.fillText(text, x, y);
        
        // Reset to the top when hitting the bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
      }
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, variant]);
  
  // Track mouse position for hover effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  // Handle click and ensure onClick is called
  const handleClick = (e: React.MouseEvent) => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
    
    if (onClick) {
      onClick();
    }
  };
  
  // Common props for both button and anchor
  const commonProps = {
    className: `relative overflow-hidden rounded-md font-medium border-2 transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className} ${isHovered ? 'shadow-lg' : ''}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseMove: handleMouseMove,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onClick: handleClick,
    ref: buttonRef,
  };
  
  // Content to render inside the button
  const content = (
    <>
      {/* Matrix rain canvas overlay */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen"
        style={{ 
          display: isHovered ? 'block' : 'none',
          zIndex: 1,
        }}
      />
      
      {/* Glowing border effect */}
      <div 
        className={`absolute inset-0 rounded-md ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 pointer-events-none`}
        style={{
          boxShadow: `0 0 15px ${colorMap[variant].glow}`,
          zIndex: 0,
        }}
      />
      
      {/* Light flash effect on click */}
      <div 
        className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-200 mix-blend-overlay ${isPressed ? 'opacity-30' : 'opacity-0'}`}
        style={{ zIndex: 2 }}
      />
      
      {/* Button content with pulse effect */}
      <motion.div 
        className="relative z-10"
        initial={false}
        animate={{ 
          scale: isPressed ? 0.95 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {children}
      </motion.div>
      
      {/* Futuristic circuit trace on hover */}
      <div
        className={`absolute bottom-0.5 left-0 h-[1px] bg-current transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}
        style={{ opacity: 0.7, zIndex: 1 }}
      >
        <div 
          className="absolute right-0 w-1.5 h-1.5 rounded-full bg-current -translate-y-1/2"
          style={{ 
            boxShadow: `0 0 5px ${colorMap[variant].glow}`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>
    </>
  );
  
  // Return as link if href is provided, otherwise as a button
  return href ? (
    <a 
      href={href}
      {...commonProps as any}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div {...commonProps as any}>
      {content}
    </div>
  );
}