'use client';

import { FaReact, FaNodeJs, FaJava, FaPython, FaHtml5, FaCss3, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiJavascript } from 'react-icons/si';

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
      items: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "HTML/CSS"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["Node.js", "React", "Next.js", "Express", "Spring Boot"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Docker", "AWS", "CI/CD", "RESTful APIs", "WebSockets"]
    },
    {
      category: "Database",
      items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"]
    }
  ],
  techIcons: [
    { name: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E" },
    { name: "TypeScript", iconName: "SiTypescript", color: "#3178C6" },
    { name: "React", iconName: "FaReact", color: "#61DAFB" },
    { name: "Node.js", iconName: "FaNodeJs", color: "#339933" },
    { name: "Python", iconName: "FaPython", color: "#3776AB" },
    { name: "Java", iconName: "FaJava", color: "#007396" },
    { name: "HTML5", iconName: "FaHtml5", color: "#E34F26" },
    { name: "CSS3", iconName: "FaCss3", color: "#1572B6" },
    { name: "Git", iconName: "FaGitAlt", color: "#F05032" },
    { name: "Docker", iconName: "FaDocker", color: "#2496ED" },
    { name: "AWS", iconName: "FaAws", color: "#FF9900" }
  ],
  testimonials: [
    {
      name: "Raj Sharma",
      position: "Engineering Manager at Paytm",
      content: "Manav is one of the most technically skilled engineers I've worked with. His ability to architect complex solutions while maintaining clean, maintainable code is exceptional. He led our Travel AI project with great success, managing to handle high throughput requirements while ensuring top-notch security.",
      image: "/images/testimonials/raj-sharma.jpg",
    },
    {
      name: "Priya Patel",
      position: "Senior Product Manager",
      content: "Working with Manav on the WebSocket implementation was a pleasure. He quickly understood our product requirements and translated them into technical solutions that exceeded expectations. His attention to detail and focus on performance has been invaluable to our team.",
      image: "/images/testimonials/priya-patel.jpg",
    },
    {
      name: "Alex Chen",
      position: "Tech Lead at AWS",
      content: "Manav's expertise in cloud architecture is impressive. During our collaboration on a high-scale project, he proposed optimization strategies that reduced our AWS costs by 30% while improving performance. His deep understanding of both backend systems and cloud infrastructure makes him a truly valuable engineer.",
      image: "/images/testimonials/alex-chen.jpg",
    }
  ]
};

// Helper function to get icon components by name when needed
export function getIconByName(name: string) {
  switch (name) {
    case 'SiJavascript': return SiJavascript;
    case 'SiTypescript': return SiTypescript;
    case 'FaReact': return FaReact;
    case 'FaNodeJs': return FaNodeJs;
    case 'FaPython': return FaPython;
    case 'FaJava': return FaJava;
    case 'FaHtml5': return FaHtml5;
    case 'FaCss3': return FaCss3;
    case 'FaGitAlt': return FaGitAlt;
    case 'FaDocker': return FaDocker;
    case 'FaAws': return FaAws;
    default: return FaReact; // Fallback
  }
}

export type SiteConfig = typeof siteConfig; 