import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  return function(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Format date to human readable format
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Random number between min and max
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Check if it's a mobile device
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

// Shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

// Detect Konami code
const konamiCode = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export function detectKonamiCode(callback: () => void): () => void {
  let konamiIndex = 0;
  
  const keydownHandler = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const requiredKey = konamiCode[konamiIndex].toLowerCase();
    
    if (key === requiredKey) {
      konamiIndex++;
      
      if (konamiIndex === konamiCode.length) {
        callback();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  };
  
  document.addEventListener('keydown', keydownHandler);
  return () => document.removeEventListener('keydown', keydownHandler);
}
