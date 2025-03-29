"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { handleImageError, getPlaceholder } from '@/utils/imageLoader';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  title: string;
  description?: string;
  image?: string;
  technologies?: string[];
  link?: string;
  demoLink?: string;
  featured?: boolean;
  className?: string;
}

export default function ProjectCard({
  title,
  description = "No description available",
  image = "/images/placeholder-project.jpg",
  technologies = [],
  link,
  demoLink,
  featured = false,
  className,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Get placeholder in case of image error
  const placeholder = getPlaceholder('project');
  
  // Ensure image path is correct - add safeguard
  const imageSrc = imageError || !image 
    ? placeholder.src 
    : image.startsWith('http') || image.startsWith('/') 
      ? image 
      : `/${image}`;

  // Determine sizes to use based on featured status
  const sizes = featured
    ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
    : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

  // Ensure technologies is always an array
  const techArray = Array.isArray(technologies) ? technologies : [];

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
      {/* Project Image */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title || "Project Image"}
          fill
          placeholder="blur"
          blurDataURL={placeholder.blurDataURL}
          className={cn(
            'project-image object-cover transition-transform duration-500 group-hover:scale-110',
            isHovered && 'scale-110 blur-[2px]'
          )}
          onError={(e) => {
            handleImageError(e, 'project');
            setImageError(true);
          }}
          priority={featured}
          sizes={sizes}
          data-original-src={image} // Store original src for error logging
        />
        
        {/* Gradient Overlay */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-slate-800/90 via-slate-700/40 to-transparent dark:from-slate-900 dark:via-slate-900/50',
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