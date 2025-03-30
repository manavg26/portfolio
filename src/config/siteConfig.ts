'use client';

import { FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaDocker, FaAws, FaDatabase, FaMicrosoft } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiApachekafka, SiRabbitmq, SiMongodb } from 'react-icons/si';

export const siteConfig = {
  name: "Manav Goel",
  title: "Software Engineer",
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
      position: "Software Developer",
      duration: "June 2022 - Present",
      description: "Led the development of backend microservices that handle thousands of concurrent connections while delivering AI-powered features with robust security protocols and real-time performance.",
      achievements: [
        "Architected and developed a comprehensive RESTful microservice architecture enhancing data-sharing capabilities and optimizing decision-making processes, now serving 20K+ daily active users",
        "Integrated Azure Speech SDK into an AI-driven service, implementing advanced ASR and STT capabilities that improved voice recognition accuracy by 35%",
        "Designed a scalable provider pattern architecture allowing seamless integration of multiple speech processing vendors without significant code refactoring, decreasing future integration time by 50%",
        "Implemented an optimized SQL database with connection pooling, ensuring efficient management of concurrent user sessions and enhanced system reliability",
        "Spearheaded cross-team collaboration to integrate new backend systems, reducing integration issues by 40% through effective communication and leveraging historical data",
        "Established robust CI/CD pipeline using Jenkins and Argo CD for EKS deployments, reducing deployment time by 65% and manual intervention by 45%",
        "Containerized applications with Docker, achieving 30% reduction in resource consumption while improving performance with 20% faster deployment times",
        "Implemented comprehensive monitoring using Grafana and ELK Stack, creating detailed dashboards that decreased bug resolution time by 50%",
        "Championed Test-Driven Development practices, resulting in 15% fewer post-release defects and 25% faster QA cycles"
      ]
    },
    {
      company: "Paytm",
      position: "Software Development Intern",
      duration: "January 2022 - June 2022",
      description: "Contributed to improving software quality and performance while learning and implementing best practices in a professional development environment.",
      achievements: [
        "Conducted thorough research and delivered a comprehensive 10-page report analyzing 3 production applications, providing actionable recommendations to key stakeholders",
        "Developed an automated reporting generation system that reduced manual errors by 80% and streamlined operational workflows",
        "Modernized legacy codebases for 2 production applications, resulting in 50% reduced latency and 25% fewer security vulnerabilities",
        "Embraced company coding standards and best practices, ensuring clean, consistent, and maintainable code across projects"
      ]
    }
  ],
  projects: [
    {
      title: "Travel AI Service",
      description: "Node.js backend for real-time speech processing",
      image: "/images/projects/travel-ai.jpg", 
      technologies: ["Node.js", "WebSockets", "AI Integration"],
      link: "https://github.com/manavg26/Travel-ai-service",
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
      link: "https://github.com/manavg26/Data-Science",
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
