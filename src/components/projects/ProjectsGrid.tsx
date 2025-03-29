"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

// Dynamically import ProjectCard component for code splitting
const ProjectCard = dynamic(() => import("@/components/projects/ProjectCard"), {
  loading: () => <ProjectCardSkeleton />,
  ssr: false,
});

// Skeleton component for loading state
function ProjectCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 animate-pulse">
      <div className="bg-slate-800 h-48 md:h-64 w-full"></div>
      <div className="p-4 md:p-6 space-y-3">
        <div className="h-6 bg-slate-800 rounded w-3/4"></div>
        <div className="h-4 bg-slate-800 rounded w-full"></div>
        <div className="h-4 bg-slate-800 rounded w-5/6"></div>
        <div className="flex gap-3 pt-2">
          <div className="h-8 bg-slate-800 rounded w-20"></div>
          <div className="h-8 bg-slate-800 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  demoLink?: string;
  featured?: boolean;
}

interface ProjectsGridProps {
  projects?: Project[];
}

export default function ProjectsGrid({ projects = [] }: ProjectsGridProps) {
  // Ensure projects is always an array even if undefined
  const projectsArray = Array.isArray(projects) ? projects : [];
  
  // Extract all unique technologies from projects
  const allTechnologies = Array.from(
    new Set(
      projectsArray.flatMap((project) => project.technologies || [])
    )
  );

  // State for active filter
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle filter change with loading state
  const handleFilterChange = (filter: string | null) => {
    setIsLoading(true);
    // Small delay to simulate data fetching and show loading state
    setTimeout(() => {
      setActiveFilter(filter);
      setIsLoading(false);
    }, 300);
  };

  // Filter projects based on selected technology
  const filteredProjects = activeFilter
    ? projectsArray.filter((project) =>
        project.technologies?.includes(activeFilter)
      )
    : projectsArray;

  // If there are no projects at all, show a message
  if (projectsArray.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 mb-4">No projects available to display.</p>
      </div>
    );
  }

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-8 mb-12">
        <Button
          variant={activeFilter === null ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleFilterChange(null)}
          className="rounded-full"
        >
          All
        </Button>
        
        {allTechnologies.map((tech) => (
          <Button
            key={tech}
            variant={activeFilter === tech ? "primary" : "secondary"}
            size="sm"
            onClick={() => handleFilterChange(tech)}
            className="rounded-full"
          >
            {tech}
          </Button>
        ))}
      </div>

      {/* Projects grid with loading state */}
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
            // Show actual projects
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.title || `project-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Suspense fallback={<ProjectCardSkeleton />}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies || []}
                    link={project.link}
                    demoLink={project.demoLink}
                    featured={index === 0 && activeFilter === null}
                  />
                </Suspense>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      {filteredProjects.length === 0 && !isLoading && (
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
    </>
  );
} 