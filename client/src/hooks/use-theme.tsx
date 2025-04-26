import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always force dark theme
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Force dark theme regardless of system preference
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
    
    // Also set a meta tag to ensure dark mode
    const meta = document.createElement('meta');
    meta.name = 'color-scheme';
    meta.content = 'dark';
    document.head.appendChild(meta);
    
    // Store dark theme in localStorage
    localStorage.setItem("theme", "dark");
    
    // Set CSS variables for dark mode specific effects
    root.style.setProperty('--always-dark', '1');
  }, []);

  // Toggle function that creates a brief flash effect but stays in dark mode
  const toggleTheme = () => {
    // Create a flashy effect for fun, but stay in dark mode
    const root = document.documentElement;
    
    // Briefly flash to indicate interaction but keep dark mode
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = 'rgba(0, 238, 255, 0.1)';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    overlay.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(overlay);
    
    // Remove the overlay after animation
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 300);
    }, 150);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
