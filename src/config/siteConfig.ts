'use client';

import { FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaDocker, FaAws, FaDatabase, FaMicrosoft } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiApachekafka, SiRabbitmq, SiMongodb } from 'react-icons/si';

export const siteConfig = {
  name: "Manav Goel",
  title: "Senior Software Engineer",
  description: "Innovative Software Engineer with specialized expertise in backend development, AI integrations, and scalable architecture design.",
  mainNav: [
    { label: "Home", path: "/" },
    { label: "Experience", path: "/experience" },
    { label: "Projects", path: "/projects" },
    { label: "Skills", path: "/skills" },
    { label: "Contact", path: "/contact" },
  ],
  social: {
    github: "https://github.com/manavg26",
    linkedin: "https://www.linkedin.com/in/manavgoel26",
    resume: "/documents/resume_manav_goel.pdf",
  },
  contact: {
    email: "goelmanav2009@gmail.com",
    phone: "887-230-9776",
  },
  colors: {
    primary: "#0ea5e9", // Sky blue
    secondary: "#6366f1", // Indigo
    accent: "#f97316", // Orange
    background: "#0f172a", // Dark blue
    text: "#f8fafc", // Light gray for text
  },
  experience: [
    {
      company: "Paytm",
      position: "Senior Software Engineer",
      duration: "2021 - Present",
      description: "Led the development of Travel AI Wrapper service that handles thousands of concurrent WebSocket connections while maintaining robust security protocols and real-time performance.",
      achievements: [
        "Architected and implemented the Travel AI Wrapper service.",
        "Implemented speech processing services and OAuth authentication.",
        "Designed scalable architecture for handling high-throughput services."
      ]
    },
    // Add other experiences here
  ],
  projects: [
    {
      title: "Travel AI Service",
      description: "Node.js backend for real-time speech processing",
      image: "/images/projects/travel-ai.jpg", 
      technologies: ["Node.js", "WebSockets", "AI Integration"],
      link: "https://github.com/manavg26/Travel-AI",
      featured: true
    },
    {
      title: "E-Banking Project",
      description: "Secure banking web application",
      image: "/images/projects/e-banking.jpg",
      technologies: ["Java", "Spring Boot", "React", "MySQL"],
      link: "https://github.com/manavg26/E-Banking_Project",
      featured: true
    },
    {
      title: "Data Science Portfolio",
      description: "Collection of data analysis projects",
      image: "/images/projects/data-science.jpg",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      link: "https://github.com/manavg26/Data-Science-Portfolio",
      featured: true
    },
    // Add more projects here
  ],
  skills: [
    { 
      category: "Programming Languages",
      items: ["Python", "Java", "Golang", "TypeScript"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["Node.js", "React", "Django", "Express", "Spring Boot"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Kafka", "Docker", "Kubernetes", "AWS", "CI/CD", "RabbitMQ", "WebSockets"]
    },
    {
      category: "Database",
      items: ["MongoDB", "MySQL", "PostgreSQL", "Cassandra", "Redis"]
    }
  ],
  techIcons: [
    { name: "Node.js", iconName: "FaNodeJs", color: "#339933" },
    { name: "Python", iconName: "FaPython", color: "#3776AB" },
    { name: "Java", iconName: "FaJava", color: "#007396" },
    { name: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E" },
    { name: "MySQL", iconName: "FaDatabase", color: "#E34F26" },
    { name: "MongoDB", iconName: "SiMongodb", color: "#4DB33D" },
    { name: "Kafka", iconName: "SiApachekafka", color: "#1572B6" },
    { name: "RabbitMQ", iconName: "SiRabbitmq", color: "#FF6600" },
    { name: "Git", iconName: "FaGitAlt", color: "#F05032" },
    { name: "Docker", iconName: "FaDocker", color: "#2496ED" },
    { name: "Azure", iconName: "FaMicrosoft", color: "#0089D6" },
    { name: "AWS", iconName: "FaAws", color: "#FF9900" },
    { name: "TypeScript", iconName: "SiTypescript", color: "#3178C6" }
  ]
};

// Helper function to get icon components by name when needed
export function getIconByName(name: string) {
  switch (name) {
    case 'SiJavascript': return SiJavascript;
    case 'SiTypescript': return SiTypescript;
    case 'FaNodeJs': return FaNodeJs;
    case 'FaPython': return FaPython;
    case 'FaJava': return FaJava;
    case 'FaGitAlt': return FaGitAlt;
    case 'FaDocker': return FaDocker;
    case 'FaAws': return FaAws;
    case 'FaMicrosoft': return FaMicrosoft;
    case 'SiApachekafka': return SiApachekafka;
    case 'SiRabbitmq': return SiRabbitmq;
    case 'FaDatabase': return FaDatabase;
    case 'SiMongodb': return SiMongodb;
    default: return FaReact; // Fallback
  }
}

export type SiteConfig = typeof siteConfig; 
