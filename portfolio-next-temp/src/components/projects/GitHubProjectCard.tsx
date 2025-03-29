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
      {/* Repository Header */}
      <div className="p-5 border-b border-slate-800 relative">
        {/* Gradient Overlay for Header */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-slate-800/20 via-slate-700/10 to-transparent dark:from-slate-900/20 dark:via-slate-900/10',
          isHovered && 'opacity-90'
        )} />
        
        <div className="flex justify-between items-start relative z-10">
          <h3 className="text-xl font-bold truncate">{displayName}</h3>
          <div className="flex items-center space-x-3">
            {safeRepo.stargazers_count > 0 && (
              <div className="flex items-center space-x-1 text-slate-400 text-sm">
                <FaStar className="text-yellow-400" />
                <span>{safeRepo.stargazers_count}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Repository Description */}
      <div className="p-5">
        <p className="text-slate-400 text-sm line-clamp-3 min-h-[3em]">
          {safeRepo.description || `A ${safeRepo.language || 'code'} repository`}
        </p>
        
        {/* Technologies/Topics */}
        <div className="mt-4 flex flex-wrap gap-2">
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