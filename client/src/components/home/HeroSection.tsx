import { useEffect, useRef } from "react";
import TypingEffect from "@/components/shared/TypingEffect";
import { motion } from "framer-motion";
import DigitalRainButton from "@/components/shared/DigitalRainButton";

export default function HeroSection() {
  const scrollToRef = useRef<HTMLDivElement>(null);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut" 
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const scrollDownVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delay: 1,
        duration: 0.8
      }
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5
      }
    }
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 bg-grid-pattern before:absolute before:inset-0 before:bg-gradient-to-b before:from-background/10 before:via-background/50 before:to-background">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            className="relative mb-4"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-heading font-bold bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              Hello, I'm <span className="relative z-10 text-3d text-3d-cyan bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Unique</span>
              <span className="relative z-10 text-hologram text-opacity-90 dark:text-opacity-95 bg-gradient-to-r from-secondary to-accent" data-text="adhikari">adhikari</span>
            </motion.h1>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-6 w-10 h-10 border-t-2 border-l-2 border-primary opacity-70"></div>
            <div className="absolute -bottom-4 -right-6 w-10 h-10 border-b-2 border-r-2 border-secondary opacity-70"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 w-8 h-2 bg-primary/40 rounded-full"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 w-8 h-2 bg-secondary/40 rounded-full"></div>
            
            {/* Accent dots */}
            <div className="absolute -top-8 left-1/4 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="absolute -bottom-8 right-1/4 w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <div className="absolute -right-10 top-1/4 w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          </motion.div>
          
          <motion.div 
            className="text-xl md:text-2xl mb-8 font-mono h-8"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <TypingEffect 
              texts={[
                "Full Stack Dev | Builder | Freelancer",
                "JavaScript | TypeScript | React | Node.js",
                "Web Developer | UI Designer | Problem Solver"
              ]} 
              typingSpeed={80}
              deletingSpeed={50}
              delayBetweenTexts={2000}
            />
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground mb-6 text-lg max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            I'm a passionate JavaScript developer specializing in building modern, interactive web applications with React, Node.js, and the latest frontend technologies. With 3+ years of experience crafting elegant solutions for complex problems, I bring ideas to life through clean, efficient code.
          </motion.p>
          
          <motion.p 
            className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              ...textVariants,
              visible: { 
                ...textVariants.visible,
                transition: { 
                  delay: 0.1,
                  duration: 0.6,
                  ease: "easeOut" 
                }
              }
            }}
          >
            From dynamic e-commerce platforms to responsive SPAs, I create digital experiences that captivate users and drive business success. Let's build something extraordinary together.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-4"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {/* GitHub Button - Digital Rain Effect */}
            <motion.div variants={buttonVariants}>
              <DigitalRainButton 
                variant="primary"
                size="md"
                href="https://github.com/code-unique"
                className="hover:bg-primary/20 transition-colors duration-300"
              >
                <span className="flex items-center group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                  <span className="font-medium">GitHub</span>
                </span>
              </DigitalRainButton>
            </motion.div>
            
            {/* LinkedIn Button - Digital Rain Effect */}
            <motion.div variants={buttonVariants}>
              <DigitalRainButton 
                variant="secondary"
                size="md"
                href="https://linkedin.com/in/uniqueadhikari"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </span>
              </DigitalRainButton>
            </motion.div>
            
            {/* WhatsApp Button - Digital Rain Effect */}
            <motion.div variants={buttonVariants}>
              <DigitalRainButton 
                variant="accent"
                size="md"
                href="https://wa.me/1234567890"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WhatsApp
                </span>
              </DigitalRainButton>
            </motion.div>
            
            {/* Resume Button - Digital Rain Enhanced */}
            <motion.div variants={buttonVariants}>
              <DigitalRainButton 
                variant="primary"  
                size="lg"
                href="/resume.pdf"
                className="relative font-bold"
              >
                <div className="relative z-10 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </div>
              </DigitalRainButton>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20"
          ref={scrollToRef}
          initial="hidden"
          animate="visible"
          variants={scrollDownVariants}
          whileInView="bounce"
          viewport={{ once: false }}
          onClick={scrollToAbout}
        >
          <button className="text-primary hover:text-foreground transition-colors duration-300" aria-label="Scroll to about section">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
