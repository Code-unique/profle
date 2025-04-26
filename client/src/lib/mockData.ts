// Mock data for frontend-only portfolio website

// Project type definition
export interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  year: string;
  technologies: string[];
  categories: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars: number;
  forks: number;
  featured: boolean;
}

// Developer meme type definition
export interface DevMeme {
  url: string;
  title: string;
}

// Quote type definition
export interface Quote {
  text: string;
  author: string;
}

// Mock projects data
export const projects: Project[] = [
  {
    id: 1,
    name: "JavaScript E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js and JavaScript, featuring dynamic routing, cart functionality, and Stripe integration for secure payments.",
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2023",
    technologies: ["Next.js", "JavaScript", "Stripe", "React Context API"],
    categories: ["Full Stack", "React"],
    githubUrl: "https://github.com/uniqueadhikari/ecommerce-platform",
    liveUrl: "https://ecommerce.uniqueadhikari.dev",
    stars: 24,
    forks: 8,
    featured: true
  },
  {
    id: 2,
    name: "React Task Management App",
    description: "A collaborative task management application with real-time updates using React and Firebase. Features Drag-and-drop interface, team collaboration, and notifications.",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2022",
    technologies: ["React", "Firebase", "Redux", "JavaScript"],
    categories: ["React", "Full Stack"],
    githubUrl: "https://github.com/uniqueadhikari/task-manager",
    liveUrl: "https://tasks.uniqueadhikari.dev",
    stars: 18,
    forks: 5,
    featured: true
  },
  {
    id: 3,
    name: "Interactive Financial Dashboard",
    description: "An analytics dashboard built with JavaScript and D3.js for visualizing financial data with interactive charts, custom filters, and real-time data updates via WebSockets.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2022",
    technologies: ["JavaScript", "D3.js", "Node.js", "Express", "Chart.js"],
    categories: ["Full Stack", "Node.js"],
    githubUrl: "https://github.com/uniqueadhikari/finance-dashboard",
    liveUrl: "https://finance.uniqueadhikari.dev",
    stars: 32,
    forks: 12,
    featured: true
  },
  {
    id: 4,
    name: "Real-time Chat Application",
    description: "JavaScript-powered chat application with real-time messaging using Socket.io, private conversations, group chats, file sharing, and message history.",
    imageUrl: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2022",
    technologies: ["JavaScript", "Socket.io", "Express", "MongoDB", "React"],
    categories: ["Full Stack", "Node.js", "React"],
    githubUrl: "https://github.com/uniqueadhikari/chat-app",
    liveUrl: "https://chat.uniqueadhikari.dev",
    stars: 15,
    forks: 4,
    featured: true
  },
  {
    id: 5,
    name: "JavaScript Blog Engine",
    description: "A lightweight blog platform built with Next.js and JavaScript with markdown support, code syntax highlighting, a tagging system, and responsive design.",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2021",
    technologies: ["Next.js", "JavaScript", "MDX", "Tailwind CSS"],
    categories: ["Full Stack", "React", "Freelance"],
    githubUrl: "https://github.com/uniqueadhikari/blog-engine",
    liveUrl: "https://blog.uniqueadhikari.dev",
    stars: 22,
    forks: 7,
    featured: false
  },
  {
    id: 6,
    name: "Animated Weather App",
    description: "A beautiful JavaScript weather application with animated weather effects using Framer Motion, featuring 5-day forecasts, location search, and weather alerts.",
    imageUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2021",
    technologies: ["JavaScript", "React", "OpenWeather API", "Framer Motion"],
    categories: ["React", "Freelance"],
    githubUrl: "https://github.com/uniqueadhikari/weather-app",
    liveUrl: "https://weather.uniqueadhikari.dev",
    stars: 12,
    forks: 3,
    featured: false
  },
  {
    id: 7,
    name: "Developer Portfolio Generator",
    description: "A JavaScript tool that helps developers create professional portfolios with customizable templates, GitHub stats integration, and project showcases.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2023",
    technologies: ["JavaScript", "React", "GitHub API", "Tailwind CSS", "Next.js"],
    categories: ["Full Stack", "React", "Freelance"],
    githubUrl: "https://github.com/uniqueadhikari/portfolio-generator",
    liveUrl: "https://portfolio-gen.uniqueadhikari.dev",
    stars: 28,
    forks: 9,
    featured: true
  },
  {
    id: 8,
    name: "JavaScript Recipe Finder",
    description: "An app built with vanilla JavaScript that allows users to search for recipes based on ingredients they have, with filters for dietary restrictions and cooking time.",
    imageUrl: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2021",
    technologies: ["JavaScript", "Spoonacular API", "CSS Modules", "HTML5"],
    categories: ["Frontend", "JavaScript"],
    githubUrl: "https://github.com/uniqueadhikari/recipe-finder",
    liveUrl: "https://recipes.uniqueadhikari.dev",
    stars: 14,
    forks: 5,
    featured: false
  },
  {
    id: 9,
    name: "Node.js Inventory System",
    description: "A JavaScript inventory management system for small businesses to track products, sales, and generate reports with an interactive dashboard.",
    imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2022",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Chart.js"],
    categories: ["Node.js", "Full Stack", "Freelance"],
    githubUrl: "https://github.com/uniqueadhikari/inventory-system",
    liveUrl: "https://inventory.uniqueadhikari.dev",
    stars: 19,
    forks: 6,
    featured: false
  },
  {
    id: 10,
    name: "JavaScript Music Player",
    description: "A custom music player built with pure JavaScript featuring playlist management, audio visualization, equalizer settings, and offline playback support.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2022",
    technologies: ["JavaScript", "HTML5 Audio API", "CSS3", "LocalStorage API"],
    categories: ["Frontend", "JavaScript"],
    githubUrl: "https://github.com/uniqueadhikari/js-music-player",
    liveUrl: "https://music.uniqueadhikari.dev",
    stars: 17,
    forks: 4,
    featured: false
  },
  {
    id: 11,
    name: "JavaScript Quiz App",
    description: "An interactive quiz application built with JavaScript featuring multiple categories, timed questions, score tracking, and result sharing on social media.",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2021",
    technologies: ["JavaScript", "HTML5", "CSS3", "Open Trivia API"],
    categories: ["Frontend", "JavaScript"],
    githubUrl: "https://github.com/uniqueadhikari/quiz-app",
    liveUrl: "https://quiz.uniqueadhikari.dev",
    stars: 15,
    forks: 7,
    featured: false
  },
  {
    id: 12,
    name: "JavaScript Drawing Board",
    description: "A creative drawing application created with JavaScript and HTML5 Canvas featuring multiple tools, layers, undo/redo functionality, and image export options.",
    imageUrl: "https://images.unsplash.com/photo-1471666875520-c75081f42081?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=250&q=80",
    year: "2023",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS3"],
    categories: ["Frontend", "JavaScript"],
    githubUrl: "https://github.com/uniqueadhikari/drawing-board",
    liveUrl: "https://draw.uniqueadhikari.dev",
    stars: 21,
    forks: 8,
    featured: false
  }
];

// Developer memes data
export const developerMemes: DevMeme[] = [
  {
    url: "https://i.imgur.com/IqHnPvV.jpeg",
    title: "When the code finally works"
  },
  {
    url: "https://i.imgur.com/KZFvau8.jpeg",
    title: "Debugging in production"
  },
  {
    url: "https://i.imgur.com/jO1KJpe.jpeg",
    title: "Writing documentation"
  },
  {
    url: "https://i.imgur.com/CU4QVC3.jpeg",
    title: "Code review"
  },
  {
    url: "https://i.imgur.com/kH0vQlO.jpeg",
    title: "Frontend vs Backend"
  }
];

// Developer quotes data
export const developerQuotes: Quote[] = [
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson"
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay"
  },
  {
    text: "The most disastrous thing that you can ever learn is your first programming language.",
    author: "Alan Kay"
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra"
  },
  {
    text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
    author: "Dan Salomon"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde"
  }
];

// Skills data
export const skills = [
  { name: "React", color: "cyan" },
  { name: "TypeScript", color: "cyan" },
  { name: "JavaScript", color: "cyan" },
  { name: "Next.js", color: "cyan" },
  { name: "Node.js", color: "magenta" },
  { name: "Express", color: "magenta" },
  { name: "MongoDB", color: "magenta" },
  { name: "Firebase", color: "magenta" },
  { name: "HTML/CSS", color: "green" },
  { name: "Tailwind CSS", color: "green" },
  { name: "SCSS", color: "green" },
  { name: "Figma", color: "green" },
  { name: "Git", color: "cyan" },
  { name: "GitHub", color: "cyan" },
  { name: "REST APIs", color: "magenta" },
  { name: "GraphQL", color: "magenta" }
];

// Timeline data
export const timeline = [
  {
    period: "2023 - Present",
    title: "Freelance Developer",
    description: "Working with various clients to build modern web applications with React, Next.js, and Node.js.",
    color: "cyan"
  },
  {
    period: "2022 - 2023",
    title: "Web Developer at TechStartup Inc.",
    description: "Developed and maintained client-facing applications using React and TypeScript.",
    color: "magenta"
  },
  {
    period: "2021 - 2022",
    title: "Junior Developer at WebSolutions",
    description: "Built responsive websites and e-commerce platforms using modern JavaScript frameworks.",
    color: "green"
  },
  {
    period: "2020 - 2021",
    title: "Web Development Bootcamp",
    description: "Completed intensive training in full-stack web development with JavaScript, React, and Node.js.",
    color: "cyan"
  }
];

// Terminal command responses
export const commandResponses = {
  help: `Available commands:
- about: Learn more about Unique Adhikari
- skills: View my technical skills
- projects: List my featured projects
- contact: How to get in touch with me
- clear: Clear the terminal
- exit: Close this terminal`,
  about: "I'm Unique Adhikari, a passionate freelance web developer specializing in creating modern, interactive web applications. I love working with JavaScript, React, and Node.js to build beautiful digital experiences.",
  skills: `Technical Skills:
- Frontend: React, TypeScript, Next.js, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Firebase
- Tools: Git, GitHub, VS Code, Figma
- Other: REST APIs, GraphQL, Responsive Design`,
  projects: `Featured Projects:
1. E-Commerce Platform - Next.js, TypeScript, Stripe
2. Task Management App - React, Firebase, Redux
3. Financial Dashboard - React, D3.js, Node.js
4. Portfolio Generator - React, GitHub API, Next.js

Type 'visit portfolio' to see all projects.`,
  contact: `Let's connect!
- Email: hello@uniqueadhikari.dev
- GitHub: github.com/uniqueadhikari
- LinkedIn: linkedin.com/in/uniqueadhikari
- Twitter: twitter.com/uniqueadhikari`,
  "visit portfolio": "Redirecting to the projects section...",
  clear: "",
  exit: "Closing terminal... Thank you for visiting!"
};