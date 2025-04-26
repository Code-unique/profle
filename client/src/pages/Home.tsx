import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ContactSection from "@/components/home/ContactSection";
import FunZoneSection from "@/components/home/FunZoneSection";
import { useEffect } from "react";
import { detectKonamiCode } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const { toast } = useToast();
  
  // Konami code easter egg
  useEffect(() => {
    const cleanup = detectKonamiCode(() => {
      // Flash the screen
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = '#ffffff';
      overlay.style.zIndex = '9999';
      overlay.style.opacity = '0.8';
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        document.body.removeChild(overlay);
        
        toast({
          title: "🔥 Konami Code Activated!",
          description: "You discovered a secret. Neon colors are now in glitch mode for 10 seconds!",
          duration: 5000,
        });
        
        // Apply glitch mode by swapping CSS variables
        const root = document.documentElement;
        root.style.setProperty('--primary', 'hsl(300, 100%, 50%)');
        root.style.setProperty('--secondary', 'hsl(186, 100%, 50%)');
        
        // Reset after 10 seconds
        setTimeout(() => {
          root.style.removeProperty('--primary');
          root.style.removeProperty('--secondary');
        }, 10000);
      }, 100);
    });

    return cleanup;
  }, [toast]);
  
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <FunZoneSection />
      <Footer />
    </main>
  );
}
