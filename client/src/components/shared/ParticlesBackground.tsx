import { useEffect, useRef, useState } from "react";
import { randomNumber } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  pulseDirection: 1 | -1;
  pulseSpeed: number;
  lineConnections: number[];
  element: HTMLDivElement;
}

export default function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const { theme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });
    
    // Setup canvas for the connection lines
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      container.appendChild(canvas);
      
      // Cast to mutable ref to avoid TypeScript error
      (canvasRef as React.MutableRefObject<HTMLCanvasElement>).current = canvas;
    } else {
      // If canvas already exists, just update dimensions
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
    
    // Clear any existing particles
    const existingParticles = container.querySelectorAll('.particle');
    existingParticles.forEach(el => el.remove());
    
    // Calculate number of particles based on screen size
    const particleCount = Math.min(Math.floor((width * height) / 15000), 150);
    const particles: Particle[] = [];
    
    // Ultra-vivid colors for a cyberpunk feel
    const baseColors = theme === 'dark' 
      ? [
          'rgba(0, 255, 255, 1)',  // Cyan
          'rgba(255, 0, 255, 1)',  // Magenta
          'rgba(0, 255, 128, 1)',  // Green
          'rgba(255, 90, 0, 1)',   // Orange
          'rgba(180, 0, 255, 1)'   // Purple
        ]
      : [
          'rgba(0, 210, 210, 0.9)', 
          'rgba(210, 0, 210, 0.9)', 
          'rgba(0, 210, 128, 0.9)',
          'rgba(210, 90, 0, 0.9)',
          'rgba(150, 0, 210, 0.9)'
        ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Create more diverse particle sizes
      const size = randomNumber(1, 4);
      
      // Random starting position
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      // More dynamic speeds
      const speedY = (Math.random() - 0.5) * 0.5;
      const speedX = (Math.random() - 0.5) * 0.5;
      
      // Rotation properties
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * 1;
      
      // Pulsing properties
      const opacity = Math.random() * 0.5 + 0.5;
      const pulseDirection = Math.random() > 0.5 ? 1 : -1;
      const pulseSpeed = Math.random() * 0.02 + 0.01;
      
      // Randomly select color with slight variations
      const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
      const colorParts = baseColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      
      if (!colorParts) continue;
      
      // Add slight variations to RGB values for more diversity
      const r = Math.min(255, Math.max(0, parseInt(colorParts[1]) + randomNumber(-20, 20)));
      const g = Math.min(255, Math.max(0, parseInt(colorParts[2]) + randomNumber(-20, 20)));
      const b = Math.min(255, Math.max(0, parseInt(colorParts[3]) + randomNumber(-20, 20)));
      const a = parseFloat(colorParts[4]);
      
      const color = `rgba(${r}, ${g}, ${b}, ${a})`;
      
      // Create connections to other particles (indexes only)
      const lineConnections: number[] = [];
      const connectionCount = Math.floor(Math.random() * 2) + 1; // 1-2 connections
      
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * particleCount);
        if (targetIndex !== i) {
          lineConnections.push(targetIndex);
        }
      }
      
      // Create more interesting particle shapes
      if (Math.random() > 0.7) {
        // Star shape
        particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      } else if (Math.random() > 0.6) {
        // Diamond shape
        particle.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      } else if (Math.random() > 0.5) {
        // Triangle shape
        particle.style.clipPath = 'polygon(50% 0%, 100% 100%, 0% 100%)';
      }
      
      // Apply styles
      particle.style.position = 'absolute';
      particle.style.width = `${size * 2}px`;
      particle.style.height = `${size * 2}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.top = `${y}px`;
      particle.style.left = `${x}px`;
      particle.style.transform = `rotate(${rotation}deg) scale(${opacity})`;
      particle.style.boxShadow = `0 0 ${size * 5}px ${color}`;
      particle.style.opacity = opacity.toString();
      particle.style.zIndex = '-1';
      particle.style.transition = 'transform 0.3s ease-out';
      
      container.appendChild(particle);
      
      particles.push({
        x,
        y,
        size,
        color,
        speedY,
        speedX,
        rotation,
        rotationSpeed,
        opacity,
        pulseDirection,
        pulseSpeed,
        lineConnections,
        element: particle
      });
    }
    
    particlesRef.current = particles;
    
    // Animation function
    const animateParticles = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections between particles
      ctx.strokeStyle = theme === 'dark' ? 'rgba(120, 255, 255, 0.1)' : 'rgba(100, 200, 255, 0.07)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      
      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        
        // Connect to predefined particles
        for (const connectionIdx of p1.lineConnections) {
          if (connectionIdx < particlesRef.current.length) {
            const p2 = particlesRef.current[connectionIdx];
            const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            
            if (distance < 200) {
              const opacity = 1 - (distance / 200);
              ctx.strokeStyle = `rgba(120, 255, 255, ${opacity * 0.2})`;
              ctx.beginPath();
              ctx.moveTo(p1.x + p1.size, p1.y + p1.size);
              ctx.lineTo(p2.x + p2.size, p2.y + p2.size);
              ctx.stroke();
            }
          }
        }
        
        // Connect to mouse if active and nearby
        if (mouseRef.current.active) {
          const mouseDistance = Math.sqrt(
            Math.pow(mouseRef.current.x - p1.x, 2) + 
            Math.pow(mouseRef.current.y - p1.y, 2)
          );
          
          if (mouseDistance < 150) {
            const opacityMouse = 1 - (mouseDistance / 150);
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(255, 100, 255, ${opacityMouse * 0.5})` 
              : `rgba(200, 50, 200, ${opacityMouse * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(p1.x + p1.size, p1.y + p1.size);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
            
            // Pull particle toward mouse
            p1.x += (mouseRef.current.x - p1.x) * 0.02;
            p1.y += (mouseRef.current.y - p1.y) * 0.02;
          }
        }
      }
      
      // Update particle positions
      for (const particle of particlesRef.current) {
        // Move particle
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;
        
        // Pulse opacity
        particle.opacity += particle.pulseSpeed * particle.pulseDirection;
        if (particle.opacity > 1) {
          particle.opacity = 1;
          particle.pulseDirection = -1;
        } else if (particle.opacity < 0.3) {
          particle.opacity = 0.3;
          particle.pulseDirection = 1;
        }
        
        // Reset if out of bounds
        if (particle.y < -20) {
          particle.y = height + 20;
          particle.x = Math.random() * width;
        } else if (particle.y > height + 20) {
          particle.y = -20;
          particle.x = Math.random() * width;
        }
        
        if (particle.x < -20) {
          particle.x = width + 20;
        } else if (particle.x > width + 20) {
          particle.x = -20;
        }
        
        // Update position, rotation, and opacity
        particle.element.style.top = `${particle.y}px`;
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.transform = `rotate(${particle.rotation}deg) scale(${particle.opacity})`;
        particle.element.style.opacity = particle.opacity.toString();
      }
      
      animationRef.current = requestAnimationFrame(animateParticles);
    };
    
    // Start animation
    animateParticles();
    
    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { 
        x: e.clientX, 
        y: e.clientY, 
        active: true 
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationRef.current);
      particlesRef.current = [];
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      if (canvasRef.current && container.contains(canvasRef.current)) {
        container.removeChild(canvasRef.current);
      }
    };
  }, [theme]);
  
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setDimensions({ width: innerWidth, height: innerHeight });
      
      // Resize canvas
      if (canvasRef.current) {
        canvasRef.current.width = innerWidth;
        canvasRef.current.height = innerHeight;
      }
      
      // Reset animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Force re-create particles
      if (containerRef.current) {
        const forceUpdate = containerRef.current.offsetHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="particles-container fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]"
      aria-hidden="true"
      style={{
        background: theme === 'dark' 
          ? 'radial-gradient(circle at center, rgba(10, 15, 30, 0.5) 0%, rgba(5, 10, 20, 0.7) 70%, rgba(0, 5, 10, 0.9) 100%)'
          : 'radial-gradient(circle at center, rgba(220, 230, 255, 0.3) 0%, rgba(200, 210, 230, 0.5) 70%, rgba(180, 190, 210, 0.7) 100%)'
      }}
    />
  );
}
