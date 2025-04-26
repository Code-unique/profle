import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { detectKonamiCode } from "@/lib/utils";
import { DevMeme, developerMemes } from "@/lib/mockData";

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
  { text: "Testing leads to failure, and failure leads to understanding.", author: "Burt Rutan" },
  { text: "It's not a bug; it's an undocumented feature.", author: "Anonymous" },
  { text: "The best way to predict the future is to implement it.", author: "David Heinemeier Hansson" }
];

// Tech stack options for the drag-and-drop game
const techOptions = [
  "React", "Vue", "Angular", "Node.js", "Express", "Next.js", 
  "MongoDB", "PostgreSQL", "GraphQL", "AWS", "Docker", "TypeScript"
];

export default function FunZoneSection() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [gameStats, setGameStats] = useState({ wpm: 0, accuracy: 0, timeLeft: 30 });
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  const [stack, setStack] = useState<string[]>([]);
  const [stackEvaluation, setStackEvaluation] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const totalKeystrokes = useRef(0);
  const correctKeystrokes = useRef(0);

  // Static memes data
  const [memes, setMemes] = useState<DevMeme[]>(developerMemes);
  const [memesLoading, setMemesLoading] = useState(false);

  // Initialize with random quote
  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

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
  }, []);

  // Start typing game
  const startGame = () => {
    if (gameStarted) return;
    
    setGameStarted(true);
    setUserInput("");
    setGameStats({ wpm: 0, accuracy: 0, timeLeft: 30 });
    totalKeystrokes.current = 0;
    correctKeystrokes.current = 0;
    startTimeRef.current = Date.now();
    
    timerRef.current = setInterval(() => {
      setGameStats(prev => {
        if (prev.timeLeft <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameStarted(false);
          calculateFinalStats();
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };
  
  const calculateFinalStats = () => {
    if (!startTimeRef.current || !currentQuote) return;
    
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // in minutes
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeElapsed);
    
    const accuracy = totalKeystrokes.current > 0 
      ? Math.round((correctKeystrokes.current / totalKeystrokes.current) * 100) 
      : 0;
    
    setGameStats(prev => ({ ...prev, wpm, accuracy }));
    
    // Get a new quote for next game
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(newQuote);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!gameStarted) return;
    
    const newInput = e.target.value;
    setUserInput(newInput);
    
    if (!currentQuote) return;
    
    // Calculate real-time stats
    const targetText = currentQuote.text;
    totalKeystrokes.current++;
    
    // Check if the current keystroke is correct
    if (newInput[newInput.length - 1] === targetText[newInput.length - 1]) {
      correctKeystrokes.current++;
    }
    
    // Calculate current accuracy
    const accuracy = Math.round((correctKeystrokes.current / totalKeystrokes.current) * 100);
    
    // Calculate current WPM
    if (startTimeRef.current) {
      const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // in minutes
      const wordsTyped = newInput.trim().split(/\s+/).length;
      const wpm = Math.round(wordsTyped / timeElapsed || 0);
      
      setGameStats(prev => ({ ...prev, wpm, accuracy }));
    }
    
    // Check if quote is completed
    if (newInput.length >= targetText.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setGameStarted(false);
      calculateFinalStats();
    }
  };
  
  const nextMeme = () => {
    if (!memes || memes.length === 0) return;
    setCurrentMemeIndex((prevIndex) => (prevIndex + 1) % memes.length);
  };
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, tech: string) => {
    e.dataTransfer.setData("text/plain", tech);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const tech = e.dataTransfer.getData("text/plain");
    if (!stack.includes(tech) && stack.length < 6) {
      setStack([...stack, tech]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const removeTech = (index: number) => {
    setStack(stack.filter((_, i) => i !== index));
  };
  
  const evaluateStack = () => {
    if (stack.length === 0) {
      setStackEvaluation("Add some technologies to your stack first!");
      return;
    }
    
    // Front-end focused
    if (stack.includes("React") || stack.includes("Vue") || stack.includes("Angular")) {
      if (stack.includes("TypeScript") && stack.includes("Next.js")) {
        setStackEvaluation("Impressive modern front-end stack! You're ready for building large-scale applications.");
      } else {
        setStackEvaluation("Good front-end focus. Consider adding TypeScript for type safety.");
      }
    }
    // Back-end focused
    else if (stack.includes("Node.js") && stack.includes("Express")) {
      if (stack.includes("MongoDB") || stack.includes("PostgreSQL")) {
        setStackEvaluation("Solid back-end stack! Ready for API development and data management.");
      } else {
        setStackEvaluation("Good server-side foundation. Add a database to complete your back-end stack.");
      }
    }
    // Full-stack
    else if (
      (stack.includes("React") || stack.includes("Vue") || stack.includes("Angular")) &&
      stack.includes("Node.js") && 
      (stack.includes("MongoDB") || stack.includes("PostgreSQL"))
    ) {
      setStackEvaluation("Perfect full-stack combination! You're equipped for end-to-end development.");
    }
    // DevOps elements
    else if (stack.includes("Docker") || stack.includes("AWS")) {
      setStackEvaluation("DevOps-focused stack. Great for deployment and infrastructure management.");
    }
    else {
      setStackEvaluation("Interesting combination! Consider adding core technologies for a more balanced stack.");
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section id="fun" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-5xl font-heading font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Fun <span className="text-neon-magenta">Zone</span>
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Take a break and have some fun with these interactive tools and games. Feel free to explore and enjoy!
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Terminal Interface */}
          <motion.div 
            className="bg-card rounded-xl overflow-hidden border border-primary/40 hover:border-primary transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <div className="bg-card px-4 py-3 flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-muted-foreground text-sm">Terminal</span>
            </div>
            
            <div className="p-4 font-mono text-sm bg-background">
              <div className="mb-4 text-primary">
                <p className="mb-1">Welcome to Unique's Interactive Terminal!</p>
                <p className="mb-2">Type 'help' to see available commands.</p>
              </div>
              
              <div className="terminal-output text-muted-foreground mb-4">
                <p>$ <span className="text-foreground">help</span></p>
                <p>Available commands:</p>
                <p>- whoami: Learn about Unique</p>
                <p>- skills: Show my technical skills</p>
                <p>- projects: List my featured projects</p>
                <p>- contact: How to reach me</p>
                <p>- meme: Show a random dev meme</p>
                <p>- clear: Clear the terminal</p>
              </div>
              
              <div className="flex items-center text-primary">
                <span className="mr-2">$</span>
                <input 
                  type="text" 
                  className="bg-transparent border-none outline-none text-foreground w-full" 
                  placeholder="Type a command..." 
                />
              </div>
            </div>
          </motion.div>
          
          {/* Mini Typing Game */}
          <motion.div 
            className="bg-card rounded-xl overflow-hidden border border-secondary/40 hover:border-secondary transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <div className="bg-card px-4 py-3">
              <h3 className="font-heading text-lg text-neon-magenta">Speed Typing Challenge</h3>
            </div>
            
            <div className="p-6 bg-background">
              <div className="mb-6 text-center">
                <p className="text-muted-foreground mb-2">Test your typing speed with developer quotes!</p>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Time: <span className="font-mono text-neon-magenta">{gameStats.timeLeft}s</span></span>
                  <span>WPM: <span className="font-mono text-neon-magenta">{gameStats.wpm}</span></span>
                  <span>Accuracy: <span className="font-mono text-neon-magenta">{gameStats.accuracy}%</span></span>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-md mb-4 font-mono text-sm">
                <p className="text-muted-foreground">
                  {currentQuote?.text} – {currentQuote?.author}
                </p>
              </div>
              
              <Textarea 
                className="w-full p-4 rounded-md bg-card border border-secondary/40 focus:border-secondary focus:outline-none text-muted-foreground placeholder-muted-foreground font-mono text-sm" 
                rows={3}
                placeholder="Start typing here when ready..."
                value={userInput}
                onChange={handleInputChange}
                disabled={!gameStarted}
              />
              
              <div className="mt-4 flex justify-center">
                <Button 
                  className="neon-btn px-4 py-2 rounded-md bg-background border border-secondary text-secondary hover:bg-secondary/10 transition-all duration-300"
                  onClick={startGame}
                  disabled={gameStarted}
                >
                  {gameStarted ? "Game In Progress" : "Start Game"}
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Interactive 3D Skills Radar */}
          <motion.div 
            className="bg-card rounded-xl overflow-hidden border border-accent/40 hover:border-accent transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <div className="bg-card px-4 py-3">
              <h3 className="font-heading text-lg text-neon-green">Interactive 3D Skills Radar</h3>
            </div>
            
            <div className="p-6 bg-background">
              <div className="mb-2 text-center">
                <p className="text-muted-foreground">Explore my skills in an interactive 3D space</p>
              </div>
              
              <div className="w-full aspect-square bg-card/50 backdrop-blur-sm rounded-md overflow-hidden relative perspective-container">
                {/* 3D Rotating radar visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[80%] h-[80%] relative radar-container">
                    {/* Main radar circle with pulsing effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Outer circle */}
                      <div className="w-full h-full rounded-full border-2 border-accent/30 animate-radar-pulse"></div>
                      {/* Middle circle */}
                      <div className="w-[80%] h-[80%] rounded-full border border-accent/40 absolute"></div>
                      {/* Inner circle */}
                      <div className="w-[50%] h-[50%] rounded-full border border-accent/50 absolute"></div>
                      {/* Radar sweep effect */}
                      <div className="w-[50%] h-[2px] absolute bg-accent/70 origin-left animate-radar-sweep shadow-lg shadow-accent/30"></div>
                    </div>
                    
                    {/* Skill dots positioned around the radar */}
                    <div className="skill-dot skill-frontend">
                      <span className="dot-label">React</span>
                      <div className="dot bg-primary"></div>
                    </div>
                    <div className="skill-dot skill-backend">
                      <div className="dot bg-secondary"></div>
                      <span className="dot-label">Node.js</span>
                    </div>
                    <div className="skill-dot skill-database">
                      <span className="dot-label">MongoDB</span>
                      <div className="dot bg-accent"></div>
                    </div>
                    <div className="skill-dot skill-mobile">
                      <div className="dot bg-primary"></div>
                      <span className="dot-label">React Native</span>
                    </div>
                    <div className="skill-dot skill-design">
                      <span className="dot-label">UI/UX</span>
                      <div className="dot bg-secondary"></div>
                    </div>
                    <div className="skill-dot skill-deployment">
                      <div className="dot bg-accent"></div>
                      <span className="dot-label">AWS</span>
                    </div>
                    <div className="skill-dot skill-testing">
                      <span className="dot-label">Jest</span>
                      <div className="dot bg-primary"></div>
                    </div>
                    <div className="skill-dot skill-lang">
                      <div className="dot bg-secondary"></div>
                      <span className="dot-label">TypeScript</span>
                    </div>
                  </div>
                </div>
                
                {/* Overlay grid lines */}
                <div className="absolute inset-0 grid-overlay-radar"></div>
                
                {/* Digital readout */}
                <div className="absolute bottom-4 left-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded text-xs text-accent font-mono border border-accent/20">
                  <div className="flex justify-between mb-1">
                    <span>Skill Analysis</span>
                    <span className="animate-text-blink">ACTIVE</span>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-1/2">
                      <span className="text-muted-foreground">Frontend:</span> <span className="text-primary">92%</span>
                    </div>
                    <div className="w-1/2">
                      <span className="text-muted-foreground">Backend:</span> <span className="text-secondary">87%</span>
                    </div>
                    <div className="w-1/2">
                      <span className="text-muted-foreground">Database:</span> <span className="text-accent">85%</span>
                    </div>
                    <div className="w-1/2">
                      <span className="text-muted-foreground">DevOps:</span> <span className="text-primary">79%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Hover over the radar to interact with the skills visualization</p>
              </div>
            </div>
          </motion.div>
          
          {/* Tech Stack Builder */}
          <motion.div 
            className="bg-card rounded-xl overflow-hidden border border-primary/40 hover:border-primary transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <div className="bg-card px-4 py-3">
              <h3 className="font-heading text-lg text-neon-cyan">Build Your Stack</h3>
            </div>
            
            <div className="p-6 bg-background">
              <div className="text-muted-foreground mb-4 text-sm">
                Drag and drop technologies to build your ideal stack!
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {techOptions.map((tech, index) => (
                  <div 
                    key={index}
                    className="bg-card p-2 rounded text-center text-xs cursor-move hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                    draggable
                    onDragStart={(e) => handleDragStart(e, tech)}
                  >
                    {tech}
                  </div>
                ))}
              </div>
              
              <div 
                className="border-2 border-dashed border-primary/30 rounded-md p-4 h-40 flex flex-wrap content-start gap-2"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {stack.length > 0 ? (
                  stack.map((tech, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs relative group"
                      onClick={() => removeTech(index)}
                    >
                      {tech}
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-card rounded-full w-3 h-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        &times;
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground w-full text-center text-sm">Drop technologies here</div>
                )}
              </div>
              
              {stackEvaluation && (
                <div className="mt-3 mb-3 p-2 bg-card rounded text-sm text-primary border border-primary/20">
                  {stackEvaluation}
                </div>
              )}
              
              <div className="mt-4 text-center">
                <Button 
                  className="neon-btn px-4 py-2 rounded-md bg-background border border-primary text-primary hover:bg-primary/10 transition-all duration-300"
                  onClick={evaluateStack}
                  disabled={stack.length === 0}
                >
                  Evaluate Stack
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Press the <span className="font-mono">↑ ↑ ↓ ↓ ← → ← → B A</span> keys for a surprise!
          </p>
          
          <a 
            href="#home" 
            className="neon-btn inline-flex items-center px-6 py-3 rounded-md bg-card border border-secondary text-secondary hover:bg-secondary/10 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to Top
          </a>
        </div>
      </div>
    </section>
  );
}
