import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      className="relative w-12 h-6 rounded-full bg-card p-1 flex items-center"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.span
        className="absolute w-4 h-4 rounded-full bg-primary"
        initial={false}
        animate={{ 
          left: theme === 'dark' ? '4px' : 'calc(100% - 20px)',
          backgroundColor: theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--primary))'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <span className={cn("absolute left-1 text-[8px] text-primary-foreground", 
        theme === 'dark' ? 'opacity-100' : 'opacity-0'
      )}>
        🌙
      </span>
      <span className={cn("absolute right-1 text-[8px] text-primary-foreground", 
        theme === 'light' ? 'opacity-100' : 'opacity-0'
      )}>
        ☀️
      </span>
    </button>
  );
}
