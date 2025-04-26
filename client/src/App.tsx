import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/hooks/use-theme';
import Home from '@/pages/Home';
import CustomCursor from '@/components/shared/CustomCursor';
import BackToTop from '@/components/shared/BackToTop';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Save scroll position before reload
  useEffect(() => {
    const saveScrollPosition = () => {
      localStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', saveScrollPosition);
    return () => window.removeEventListener('beforeunload', saveScrollPosition);
  }, []);

  // Restore scroll position after loading
  useEffect(() => {
    if (!isLoading) {
      const savedPosition = localStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-2xl text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <CustomCursor />
      <BackToTop />
      <Home />
      <Toaster />
    </ThemeProvider>
  );
}
