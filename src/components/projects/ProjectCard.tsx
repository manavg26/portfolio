"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  title: string;
  description?: string;
  image?: string; // Keeping for backward compatibility
  technologies?: string[];
  link?: string;
  demoLink?: string;
  featured?: boolean;
  className?: string;
}

export default function ProjectCard({
  title,
  description = "No description available",
  technologies = [],
  link,
  demoLink,
  featured = false,
  className,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Ensure technologies is always an array
  const techArray = Array.isArray(technologies) ? technologies : [];
  
  // Single gradient for all project cards - darker with blackish edges
  const gradient = 'bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900';

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-slate-800 backdrop-blur-sm',
        'transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10',
        featured && 'md:col-span-2',
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Project Header with Gradient Background */}
      <div className={`relative h-48 md:h-64 w-full overflow-hidden ${gradient}`}>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")' }} />
        
        {/* Gradient Overlay */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent',
          isHovered && 'opacity-90'
        )} />
        
        {/* Technologies */}
        {techArray.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {techArray.slice(0, 4).map((tech, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-blue-100 text-black font-medium backdrop-blur-sm dark:bg-slate-800/80 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
            {techArray.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-black font-medium backdrop-blur-sm dark:bg-slate-800/80 dark:text-slate-200">
                +{techArray.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 md:p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-slate-400 text-sm line-clamp-3">{description}</p>
        
        {/* Links */}
        <div className="mt-4 flex gap-3">
          {link && (
            <Button
              href={link}
              external
              variant="ghost"
              size="sm"
              icon={<FaGithub />}
            >
              Code
            </Button>
          )}
          {demoLink && (
            <Button
              href={demoLink}
              external
              variant="outline"
              size="sm"
              icon={<FaExternalLinkAlt />}
            >
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 
