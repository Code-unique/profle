import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { useMobile } from "@/hooks/use-mobile";
import ThemeToggle from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const { theme } = useTheme();
  const isMobile = useMobile();
  const logoRef = useRef<HTMLDivElement>(null);
  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Random glitch effect timer for logo
    const setupGlitchTimer = () => {
      const randomTime = Math.random() * 10000 + 5000; // 5-15 seconds
      
      glitchTimerRef.current = setTimeout(() => {
        setIsGlitching(true);
        
        // Disable glitch after a short duration
        setTimeout(() => {
          setIsGlitching(false);
          setupGlitchTimer(); // Set up next glitch
        }, 500);
      }, randomTime);
    };

    setupGlitchTimer();
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (glitchTimerRef.current) {
        clearTimeout(glitchTimerRef.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Additional glitch effect on hover
  const handleLogoHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

  // The letters to animate in the cyberpunk logo
  const logoText = "Unique";
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-lg",
        isScrolled
          ? "bg-background/60 border-b border-primary/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
          : "bg-transparent"
      )}
    >
      {/* Animated header decoration line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 animate-pulse"></div>
      </div>
      
      {/* Diagonal corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/70 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary/70 transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Cyberpunk Logo with glitch effect */}
        <div 
          ref={logoRef}
          className="relative h-10 flex items-center"
          onMouseEnter={handleLogoHover}
        >
          {/* Cyber brackets with neon glow */}
          <Link href="/" className="text-2xl font-heading font-bold flex items-center relative perspective-container">
            {/* Beginning bracket with futuristic style */}
            <span className="text-neon-cyan relative transform-gpu mr-1">
              <span className={`inline-block ${isGlitching ? 'animate-glitch-1' : ''}`}>&lt;</span>
              {isGlitching && (
                <>
                  <span className="absolute top-0 left-0 text-red-500 opacity-70 transform translate-x-[1px] translate-y-[1px] animate-glitch-2">&lt;</span>
                  <span className="absolute top-0 left-0 text-blue-500 opacity-70 transform -translate-x-[1px] -translate-y-[1px] animate-glitch-3">&lt;</span>
                </>
              )}
            </span>
            
            {/* Individual animated letters for the name */}
            <div className="flex overflow-hidden">
              {logoText.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className={`inline-block font-bold ${isGlitching ? 'text-white' : ''}`}
                  initial={{ y: 0 }}
                  animate={isGlitching ? {
                    y: [0, -5, 5, 0],
                    color: [
                      "rgba(255, 255, 255, 1)",
                      "rgba(0, 238, 255, 1)",
                      "rgba(255, 0, 255, 1)",
                      "rgba(255, 255, 255, 1)"
                    ],
                    transition: { 
                      duration: 0.3,
                      delay: i * 0.03
                    }
                  } : {}}
                >
                  {letter}
                  {isGlitching && (
                    <span className="absolute top-0 left-0 -ml-1 text-blue-500 opacity-50 animate-glitch-2 mix-blend-screen">
                      {letter}
                    </span>
                  )}
                </motion.span>
              ))}
            </div>
            
            {/* Ending bracket with glow */}
            <span className="text-neon-cyan relative transform-gpu ml-1">
              <span className={`inline-block ${isGlitching ? 'animate-glitch-1' : ''}`}>/&gt;</span>
              {isGlitching && (
                <>
                  <span className="absolute top-0 left-0 text-red-500 opacity-70 transform translate-x-[1px] translate-y-[1px] animate-glitch-2">/&gt;</span>
                  <span className="absolute top-0 left-0 text-blue-500 opacity-70 transform -translate-x-[1px] -translate-y-[1px] animate-glitch-3">/&gt;</span>
                </>
              )}
            </span>
          </Link>
          
          {/* Circuit line decoration */}
          <div className="absolute -bottom-1 left-0 w-full h-[2px]">
            <div className="relative w-full h-full">
              <div className="absolute left-0 top-0 w-[80%] h-full bg-gradient-to-r from-primary/80 to-secondary/0"></div>
              <div className="absolute right-0 top-0 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Desktop Menu - Futuristic style */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { href: "#home", label: "Home", color: "primary" },
            { href: "#about", label: "About", color: "primary" },
            { href: "#projects", label: "Projects", color: "primary" },
            { href: "#contact", label: "Contact", color: "primary" },
            { href: "#fun", label: "Fun Zone", color: "secondary" }
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-${item.color} transition-all duration-300 relative group`}
            >
              <div className="overflow-hidden relative">
                {/* Navigation item with futuristic line and dot */}
                <span>{item.label}</span>
                
                {/* Animated underline with dot accent */}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-${item.color} group-hover:w-full transition-all duration-300`}></span>
                
                {/* Animated dot that follows the line */}
                <span className={`absolute -bottom-1 left-0 w-1.5 h-1.5 rounded-full bg-${item.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 delay-100`}></span>
              </div>
              
              {/* Tech accent dot at top */}
              <span className={`absolute -top-1 left-1/2 w-1 h-1 rounded-full bg-${item.color}/50 opacity-0 group-hover:opacity-100 transition-all duration-300`}></span>
              
              {/* Small corner accents */}
              <span className={`absolute top-0 left-0 w-1 h-1 border-t border-l border-${item.color}/0 group-hover:border-${item.color}/50 transition-all duration-300`}></span>
              <span className={`absolute bottom-0 right-0 w-1 h-1 border-b border-r border-${item.color}/0 group-hover:border-${item.color}/50 transition-all duration-300`}></span>
            </Link>
          ))}

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button - with effects */}
        <motion.button
          className="md:hidden text-foreground relative focus:outline-none w-10 h-10 flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 rounded-full border border-primary/30 opacity-0 hover:opacity-100 transition-opacity"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
              className="transition-all duration-300"
            />
          </svg>
          
          {/* Decorative dot */}
          <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-primary animate-pulse"></span>
        </motion.button>
      </div>

      {/* Mobile Menu with futuristic styling */}
      <motion.div
        className={`md:hidden px-2 pt-2 pb-3 space-y-1 glassmorphism border-t border-primary/20 overflow-hidden`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {isMobileMenuOpen && (
          <div className="absolute inset-0 bg-grid-overlay pointer-events-none"></div>
        )}
        
        <Link
          href="#home"
          className="block px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary hover:translate-x-1 transition-all duration-300 relative group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 group-hover:w-1 h-1/2 bg-primary/50 transition-all duration-300"></span>
          <span className="relative z-10 group-hover:ml-2 transition-all duration-300">Home</span>
        </Link>
        <Link
          href="#about"
          className="block px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary hover:translate-x-1 transition-all duration-300 relative group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 group-hover:w-1 h-1/2 bg-primary/50 transition-all duration-300"></span>
          <span className="relative z-10 group-hover:ml-2 transition-all duration-300">About</span>
        </Link>
        <Link
          href="#projects"
          className="block px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary hover:translate-x-1 transition-all duration-300 relative group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 group-hover:w-1 h-1/2 bg-primary/50 transition-all duration-300"></span>
          <span className="relative z-10 group-hover:ml-2 transition-all duration-300">Projects</span>
        </Link>
        <Link
          href="#contact"
          className="block px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary hover:translate-x-1 transition-all duration-300 relative group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 group-hover:w-1 h-1/2 bg-primary/50 transition-all duration-300"></span>
          <span className="relative z-10 group-hover:ml-2 transition-all duration-300">Contact</span>
        </Link>
        <Link
          href="#fun"
          className="block px-3 py-2 rounded-md hover:bg-secondary/10 hover:text-secondary hover:translate-x-1 transition-all duration-300 relative group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 group-hover:w-1 h-1/2 bg-secondary/50 transition-all duration-300"></span>
          <span className="relative z-10 group-hover:ml-2 transition-all duration-300">Fun Zone</span>
        </Link>

        <div className="px-3 py-2 flex items-center justify-between bg-card/30 backdrop-blur-md rounded-md mt-2 border border-primary/10">
          <span className="text-sm">Theme</span>
          <ThemeToggle />
        </div>
      </motion.div>
    </header>
  );
}
