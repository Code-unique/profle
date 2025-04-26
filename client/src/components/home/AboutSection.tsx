import { motion, Variants } from "framer-motion";

type Skill = {
  name: string;
  color: "cyan" | "magenta" | "green";
};

type TimelineItem = {
  period: string;
  title: string;
  description: string;
  color: "cyan" | "magenta" | "green";
};

const skills: Skill[] = [
  { name: "JavaScript", color: "cyan" },
  { name: "React", color: "magenta" },
  { name: "Next.js", color: "green" },
  { name: "Node.js", color: "cyan" },
  { name: "Express", color: "magenta" },
  { name: "TypeScript", color: "green" },
  { name: "Tailwind CSS", color: "cyan" },
  { name: "Redux", color: "magenta" },
  { name: "MongoDB", color: "green" },
  { name: "Firebase", color: "cyan" },
  { name: "REST APIs", color: "magenta" },
  { name: "HTML/CSS", color: "green" },
  { name: "Responsive Design", color: "cyan" },
  { name: "Git/GitHub", color: "magenta" },
  { name: "Webpack", color: "green" },
];

const timelineItems: TimelineItem[] = [
  {
    period: "2023 - Present",
    title: "Freelance JavaScript Developer",
    description: "Building custom web solutions for diverse clients, specializing in React, Next.js, and Node.js applications with modern state management and responsive UI designs.",
    color: "cyan"
  },
  {
    period: "2022 - 2023",
    title: "Full Stack Developer at TechStartup Inc.",
    description: "Developed and maintained JavaScript-based web applications using the MERN stack (MongoDB, Express, React, Node.js). Implemented authentication systems, RESTful APIs, and real-time features with WebSockets.",
    color: "magenta"
  },
  {
    period: "2021 - 2022",
    title: "Front-End Developer at WebSolutions",
    description: "Created responsive, pixel-perfect interfaces with React, Redux, and modern CSS frameworks. Collaborated closely with design teams to implement stunning UIs and optimize performance for complex SPAs.",
    color: "green"
  },
  {
    period: "2020 - 2021",
    title: "JavaScript Developer Bootcamp",
    description: "Intensive training in full-stack JavaScript development, building projects with various frontend and backend technologies while mastering core programming concepts and best practices.",
    color: "cyan"
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-5xl font-heading font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-neon-cyan">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 flex justify-center items-start">
            <motion.div 
              className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-primary animate-float"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=300&h=300" 
                alt="Unique Adhikari" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20"></div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-2">
            <motion.h3 
              className="text-2xl font-heading font-semibold mb-4 text-neon-magenta"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My Journey
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              I'm a passionate Full Stack JavaScript Developer with a love for building modern, performant web applications. My journey started with a curiosity about how websites work and evolved into a deep passion for creating intuitive digital experiences.
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              With expertise in Next.js, React, Node.js, and TypeScript, I strive to build applications that are not just functional but also delightful to use. I believe in clean code, performance optimization, and staying at the forefront of web technologies.
            </motion.p>
            
            <motion.h3 
              className="text-2xl font-heading font-semibold mb-4 text-neon-cyan mt-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Tech Stack
            </motion.h3>
            
            <motion.div 
              className="flex flex-wrap gap-3 mb-10 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/20"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  variants={item}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className={`skill-pill px-4 py-2 rounded-full bg-card/80 border-2 ${
                    skill.color === "cyan" 
                      ? "border-primary text-neon-cyan hover:bg-primary/20 hover:border-neon-cyan" 
                      : skill.color === "magenta" 
                        ? "border-secondary text-neon-magenta hover:bg-secondary/20 hover:border-neon-magenta" 
                        : "border-accent text-neon-green hover:bg-accent/20 hover:border-neon-green"
                  } text-sm transition-all duration-300 shadow-lg`}
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-heading font-semibold mb-6 text-neon-cyan"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Timeline
            </motion.h3>
            
            <motion.div 
              className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-accent before:animate-glow-pulse"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {timelineItems.map((timelineItem, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  className="relative pl-10"
                  whileHover={{ x: 5 }}
                >
                  <div className={`absolute left-0 top-1 h-6 w-6 rounded-full border-2 ${
                    timelineItem.color === "cyan" 
                      ? "border-primary border-neon-cyan" 
                      : timelineItem.color === "magenta" 
                        ? "border-secondary border-neon-magenta" 
                        : "border-accent border-neon-green"
                  } bg-background`}>
                    <span className={`absolute inset-1 rounded-full ${
                      timelineItem.color === "cyan" 
                        ? "bg-primary/30"
                        : timelineItem.color === "magenta" 
                          ? "bg-secondary/30"
                          : "bg-accent/30"
                    } animate-pulse`}></span>
                  </div>
                  
                  <div className={`font-mono text-sm mb-1 ${
                    timelineItem.color === "cyan" 
                      ? "text-neon-cyan" 
                      : timelineItem.color === "magenta" 
                        ? "text-neon-magenta" 
                        : "text-neon-green"
                  }`}>{timelineItem.period}</div>
                  
                  <div className={`font-heading font-bold text-xl mb-2 ${
                    timelineItem.color === "cyan" 
                      ? "text-primary" 
                      : timelineItem.color === "magenta" 
                        ? "text-secondary" 
                        : "text-accent"
                  }`}>{timelineItem.title}</div>
                  
                  <div className={`p-4 rounded-lg ${
                    timelineItem.color === "cyan" 
                      ? "bg-primary/5 border border-primary/20" 
                      : timelineItem.color === "magenta" 
                        ? "bg-secondary/5 border border-secondary/20" 
                        : "bg-accent/5 border border-accent/20"
                  }`}>
                    <p className="text-muted-foreground">{timelineItem.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
