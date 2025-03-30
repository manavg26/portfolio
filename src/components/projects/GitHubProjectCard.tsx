"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { GitHubRepo, getLanguageColor } from '@/utils/github';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface GitHubProjectCardProps {
  repo: GitHubRepo;
  className?: string;
  featured?: boolean;
}

// Default fallback repository when data is incomplete
const defaultRepo: Partial<GitHubRepo> = {
  name: "Repository",
  full_name: "username/repository",
  html_url: "https://github.com",
  description: "GitHub repository",
  topics: [],
  homepage: null,
  stargazers_count: 0,
  fork: false,
  language: null,
  updated_at: new Date().toISOString()
};

// Single gradient for all project cards - darker with blackish edges
const gradient = 'bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900';

export default function GitHubProjectCard({
  repo,
  className,
  featured = false,
}: GitHubProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Merge the provided repo with defaults to handle missing properties
  const safeRepo = { ...defaultRepo, ...repo };
  
  // Safely get color for language
  const languageColor = getLanguageColor(safeRepo.language);

  // Format repository name for display
  const displayName = safeRepo.name
    ? safeRepo.name.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())
    : "Repository";

  // Get topics with a fallback if empty
  const topics = safeRepo.topics && safeRepo.topics.length > 0 
    ? safeRepo.topics 
    : safeRepo.language ? [safeRepo.language] : ['Repository'];

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
      {/* Repository Header with Gradient Background */}
      <div className={`relative h-48 md:h-64 w-full overflow-hidden ${gradient}`}>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")' }} />
        
        {/* Gradient Overlay */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent',
          isHovered && 'opacity-90'
        )} />
        
        {/* Repository Name and Stars */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <h3 className="text-xl font-bold truncate text-white">{displayName}</h3>
          {safeRepo.stargazers_count > 0 && (
            <div className="flex items-center space-x-1 text-white text-sm">
              <FaStar className="text-yellow-400" />
              <span>{safeRepo.stargazers_count}</span>
            </div>
          )}
        </div>
        
        {/* Technologies/Topics */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {safeRepo.language && (
            <span 
              className="text-xs px-2 py-1 rounded-full bg-blue-100 text-black font-medium backdrop-blur-sm dark:bg-slate-800/80 dark:text-slate-200 flex items-center"
            >
              <span 
                className="w-2 h-2 rounded-full mr-1.5" 
                style={{ backgroundColor: languageColor }}
              />
              {safeRepo.language}
            </span>
          )}
          
          {topics.slice(0, safeRepo.language ? 3 : 4).map((topic, index) => (
            (topic !== safeRepo.language) && (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-blue-100 text-black font-medium backdrop-blur-sm dark:bg-slate-800/80 dark:text-slate-200"
              >
                {topic}
              </span>
            )
          ))}
          
          {topics.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-black font-medium backdrop-blur-sm dark:bg-slate-800/80 dark:text-slate-200">
              +{topics.length - 4}
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <p className="text-slate-400 text-sm line-clamp-3 min-h-[3em]">
          {safeRepo.description || `A ${safeRepo.language || 'code'} repository`}
        </p>
        
        {/* Links */}
        <div className="mt-6 flex gap-3">
          {safeRepo.html_url && (
            <Button
              href={safeRepo.html_url}
              external
              variant="ghost"
              size="sm"
              icon={<FaGithub />}
            >
              Code
            </Button>
          )}
          
          {safeRepo.homepage && (
            <Button
              href={safeRepo.homepage}
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
