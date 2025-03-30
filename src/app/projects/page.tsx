"use client";

import { Suspense, useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { SectionContainer } from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { extractGitHubUsername, fetchGitHubRepos, GitHubRepo } from "@/utils/github";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { FaStar } from "react-icons/fa";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import GitHubProjectCard from "@/components/projects/GitHubProjectCard";

// Define project interface
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  demoLink?: string;
  featured?: boolean;
}

// Project categories
const PROJECT_CATEGORIES = [
  "Web Development",
  "App Development",
  "Data Science",
  "Game Development",
  "AI/Machine Learning"
];

// Map technologies to categories
const TECH_TO_CATEGORY: Record<string, string> = {
  // Web Development
  "React": "Web Development",
  "Next.js": "Web Development",
  "HTML/CSS": "Web Development",
  "Node.js": "Web Development",
  "Express": "Web Development",
  "JavaScript": "Web Development",
  "TypeScript": "Web Development",
  "Spring Boot": "Web Development",
  
  // App Development
  "Java": "App Development",
  "Android": "App Development",
  "iOS": "App Development",
  "Swift": "App Development",
  "Flutter": "App Development",
  "React Native": "App Development",
  
  // Data Science
  "Python": "Data Science",
  "Pandas": "Data Science",
  "Scikit-learn": "Data Science",
  "Matplotlib": "Data Science",
  "Data Analysis": "Data Science",
  
  // Game Development
  "Unity": "Game Development", 
  "Unreal Engine": "Game Development",
  "C#": "Game Development",
  "C++": "Game Development",
  "Game Development": "Game Development",
  
  // AI/Machine Learning
  "AI Integration": "AI/Machine Learning",
  "WebSockets": "AI/Machine Learning", // For Travel AI
  "TensorFlow": "AI/Machine Learning",
  "PyTorch": "AI/Machine Learning",
  "Machine Learning": "AI/Machine Learning"
};

// Determine project category based on technologies
function determineProjectCategory(technologies: string[]): string {
  if (!technologies || technologies.length === 0) return "Web Development";
  
  // Check for direct category matches
  for (const tech of technologies) {
    if (tech === "Game Development") return "Game Development";
    if (tech === "AI Integration") return "AI/Machine Learning";
  }
  
  const categories = technologies
    .map(tech => TECH_TO_CATEGORY[tech])
    .filter(Boolean);
  
  // Return the most common category or default to Web Development
  if (categories.length === 0) return "Web Development";
  
  const categoryCounts: Record<string, number> = {};
  categories.forEach(category => {
    if (category) categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  
  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1]);
  
  return sortedCategories[0][0];
}

// Skeleton component for loading state
function ProjectCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border animate-pulse" 
         style={{ 
           borderColor: 'var(--border-color)',
           backgroundColor: 'var(--card-bg)'
         }}>
      <div className="h-48 md:h-64 w-full" 
           style={{ 
             background: 'linear-gradient(to bottom right, var(--gradient-from), var(--gradient-to))',
             opacity: 0.5 
           }}></div>
      <div className="p-4 md:p-6 space-y-3">
        <div className="h-6 rounded w-3/4" style={{ backgroundColor: 'var(--border-color)' }}></div>
        <div className="h-4 rounded w-full" style={{ backgroundColor: 'var(--border-color)' }}></div>
        <div className="h-4 rounded w-5/6" style={{ backgroundColor: 'var(--border-color)' }}></div>
        <div className="flex gap-3 pt-2">
          <div className="h-8 rounded w-20" style={{ backgroundColor: 'var(--border-color)' }}></div>
          <div className="h-8 rounded w-24" style={{ backgroundColor: 'var(--border-color)' }}></div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set projects from siteConfig
    setProjects(siteConfig.projects as Project[] || []);
    
    // Fetch GitHub repos
    async function fetchRepos() {
      try {
        const githubUrl = siteConfig.social?.github || "https://github.com/manavg26";
        const username = extractGitHubUsername(githubUrl);
        
        if (username) {
          const repos = await fetchGitHubRepos(username);
          setGithubRepos(repos || []);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepos();
  }, []);

  // Handle filter change
  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured);

  // Filter projects based on category
  const filteredProjects = activeFilter
    ? projects.filter(project => {
        const category = determineProjectCategory(project.technologies || []);
        return category === activeFilter;
      })
    : projects;

  // Filter GitHub repos based on category
  const filteredRepos = activeFilter
    ? githubRepos.filter(repo => {
        // Determine category from language or topics
        const technologies = [...(repo.topics || [])];
        if (repo.language) technologies.push(repo.language);
        
        const category = determineProjectCategory(technologies);
        return category === activeFilter;
      })
    : githubRepos;

  return (
    <SectionContainer className="py-20 md:py-28">
      <SectionHeading
        title="My Projects"
        subtitle="Explore my portfolio of web apps, mobile applications, data science projects, and more."
        centered
      />
      
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-10 mb-12">
        <Button
          variant={activeFilter === null ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleFilterChange(null)}
          className="rounded-full"
        >
          All Projects
        </Button>
        
        {PROJECT_CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? "primary" : "secondary"}
            size="sm"
            onClick={() => handleFilterChange(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Projects Carousel - only show when no filter is active */}
      {featuredProjects.length > 0 && activeFilter === null && (
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <FaStar className="text-yellow-400 mr-2" />
            <h3 className="text-2xl font-bold">Featured Projects</h3>
          </div>
          
          <ProjectCarousel projects={featuredProjects} />
        </div>
      )}

      {/* All Projects Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-6">All Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Show skeletons when loading
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCardSkeleton />
                </motion.div>
              ))
            ) : (
              // Show projects and repos
              [
                // When no filter is active, exclude featured projects as they're already in the carousel
                ...(activeFilter === null 
                  ? filteredProjects.filter(p => !p.featured) 
                  : filteredProjects),
                ...filteredRepos
              ].map((item, index) => (
                <motion.div
                  key={
                    'title' in item 
                      ? item.title || `project-${index}` 
                      : item.id || `repo-${index}`
                  }
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className={('title' in item && item.featured) ? "lg:col-span-2" : ""}
                >
                  {'title' in item ? (
                    <Suspense fallback={<ProjectCardSkeleton />}>
                      <ProjectCard
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        technologies={item.technologies || []}
                        link={item.link}
                        demoLink={item.demoLink}
                        featured={'featured' in item ? item.featured : false}
                        className={('featured' in item && item.featured && activeFilter !== null) 
                          ? "border-yellow-500/30 shadow-lg shadow-yellow-500/10" 
                          : ""
                        }
                      />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<ProjectCardSkeleton />}>
                      <GitHubProjectCard repo={item} />
                    </Suspense>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        {filteredProjects.length === 0 && filteredRepos.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-slate-400">No projects found with the selected filter.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleFilterChange(null)}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
} 
