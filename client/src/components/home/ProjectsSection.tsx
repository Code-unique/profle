import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/mockData";
import { projects as projectsData } from "@/lib/mockData";

type CategoryFilter = "All" | "React" | "Node.js" | "Full Stack" | "Freelance";

export default function ProjectsSection() {
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects based on search text and category
  useEffect(() => {
    // Add a small artificial delay to simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...projectsData];
      
      // Apply category filter
      if (activeFilter !== "All") {
        result = result.filter(project => project.categories.includes(activeFilter));
      }
      
      // Apply search filter
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        result = result.filter(project => 
          project.name.toLowerCase().includes(searchLower) || 
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
        );
      }
      
      setFilteredProjects(result);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeFilter, searchText]);

  const loadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-5xl font-heading font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-neon-magenta">Projects</span>
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A collection of my recent work, including both personal and client projects. These showcase my skills and approach to solving real-world problems.
        </motion.p>
        
        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {(["All", "React", "Node.js", "Full Stack", "Freelance"] as CategoryFilter[]).map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className={`${
                activeFilter === category
                  ? "bg-primary/10 text-primary border-primary"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>
        
        {/* Search Box */}
        <motion.div 
          className="max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-3 rounded-md bg-card border border-primary/30 focus:border-primary focus:outline-none text-foreground placeholder-muted-foreground"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>
        
        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredProjects.slice(0, displayCount).map((project, index) => (
              <ProjectCard key={project.id} project={project} variants={item} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">No projects found. Try adjusting your search.</p>
          </div>
        )}
        
        {/* Load More Button */}
        {filteredProjects && displayCount < filteredProjects.length && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              className="neon-btn px-8 py-3 rounded-md bg-card border border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              onClick={loadMore}
            >
              Load More Projects
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  variants: any;
}

function ProjectCard({ project, variants }: ProjectCardProps) {
  const neonColors = {
    cyan: "border-primary/40 hover:border-primary hover:shadow-[0_0_15px_rgba(0,238,255,0.3)]",
    magenta: "border-secondary/40 hover:border-secondary hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]",
    green: "border-accent/40 hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]"
  };
  
  const badgeColors = {
    cyan: "bg-primary/10 text-primary",
    magenta: "bg-secondary/10 text-secondary",
    green: "bg-accent/10 text-accent"
  };
  
  // Cycle through neon colors based on project id
  const colorKey = Object.keys(neonColors)[project.id % 3] as keyof typeof neonColors;
  const neonColor = neonColors[colorKey];
  
  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-xl bg-card border ${neonColor} transition-all duration-300`}
      variants={variants}
    >
      <div className="overflow-hidden h-48">
        <img 
          src={project.imageUrl} 
          alt={`${project.name} screenshot`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xl font-heading font-bold ${
            colorKey === 'cyan' ? 'text-neon-cyan' : 
            colorKey === 'magenta' ? 'text-neon-magenta' : 
            'text-neon-green'
          }`}>{project.name}</h3>
          <div className="text-xs font-mono text-muted-foreground">{project.year}</div>
        </div>
        
        <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => {
            // Cycle through badge colors
            const badgeColor = badgeColors[Object.keys(badgeColors)[index % 3] as keyof typeof badgeColors];
            
            return (
              <span key={index} className={`px-2 py-1 text-xs ${badgeColor} rounded`}>
                {tech}
              </span>
            );
          })}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <span className="flex items-center text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {project.stars}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {project.forks}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors duration-300"
                aria-label="View live demo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full hover:bg-secondary/10 text-secondary transition-colors duration-300"
                aria-label="View source code on GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
