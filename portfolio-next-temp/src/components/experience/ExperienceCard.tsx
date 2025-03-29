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
        'relative p-6 md:p-8 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm',
        'hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300',
        className
      )}
    >
      {/* Timeline connector */}
      {index > 0 && (
        <div className="absolute top-0 left-5 md:left-7 w-0.5 h-8 -mt-8 bg-gradient-to-b from-transparent to-blue-500/30" />
      )}
      
      <div className="relative">
        {/* Timeline dot */}
        <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-2 border-blue-500 bg-slate-900" />
        
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-bold text-white">{position}</h3>
          <p className="text-sm text-blue-400 font-medium">{duration}</p>
        </div>
        
        <p className="text-base md:text-lg font-medium text-slate-300 mb-2">{company}</p>
        
        <p className="text-slate-400 mb-4">{description}</p>
        
        {achievements.length > 0 && (
          <ul className="space-y-2 text-sm text-slate-400">
            {achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 inline-block flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
} 