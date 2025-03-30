"use client";

import { motion } from 'framer-motion';
import { useFadeAnimation } from '@/hooks/useAnimations';
import { cn } from '@/utils/cn';

interface ExperienceCardProps {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements?: string[];
  index: number;
  className?: string;
}

export default function ExperienceCard({
  company,
  position,
  duration,
  description,
  achievements = [],
  index,
  className,
}: ExperienceCardProps) {
  const { ref, variants, animation } = useFadeAnimation({
    direction: 'up',
    delay: 0.1 * index,
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={animation}
      className={cn(
        'relative p-6 md:p-8 rounded-xl border backdrop-blur-sm',
        'transition-all duration-300',
        className
      )}
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--card-bg)',
        boxShadow: 'var(--card-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1))'
      }}
    >
      {/* Timeline connector */}
      {index > 0 && (
        <div className="absolute top-0 left-5 md:left-7 w-0.5 h-8 -mt-8 bg-gradient-to-b from-transparent" style={{ 
          backgroundImage: 'linear-gradient(to bottom, transparent, var(--accent-color))' 
        }} />
      )}
      
      <div className="relative">
        {/* Timeline dot */}
        <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-2 bg-slate-900" style={{ 
          borderColor: 'var(--accent-color)',
          backgroundColor: 'var(--background-color)'
        }} />
        
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>{position}</h3>
          <p className="text-sm font-medium" style={{ color: 'var(--accent-color)' }}>{duration}</p>
        </div>
        
        <p className="text-base md:text-lg font-medium mb-2" style={{ color: 'var(--text-color)', opacity: 0.9 }}>{company}</p>
        
        <p className="mb-4" style={{ color: 'var(--text-color)', opacity: 0.8 }}>{description}</p>
        
        {achievements.length > 0 && (
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-color)', opacity: 0.7 }}>
            {achievements.map((achievement, idx) => (
              <li key={`achievement-${index}-${idx}`} className="flex items-start">
                <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: 'var(--accent-color)' }} />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
} 
