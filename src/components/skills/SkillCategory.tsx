"use client";

import { motion } from 'framer-motion';
import { useFadeAnimation } from '@/hooks/useAnimations';
import { cn } from '@/utils/cn';

interface SkillCategoryProps {
  category: string;
  items: string[];
  index: number;
  className?: string;
}

export default function SkillCategory({
  category,
  items,
  index,
  className,
}: SkillCategoryProps) {
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
        'p-6 md:p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-blue-500/30 transition-all duration-300',
        className
      )}
    >
      <h3 className="text-xl font-bold text-white mb-4">{category}</h3>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {items.map((skill, idx) => (
          <div 
            key={idx}
            className="px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 text-sm hover:bg-blue-900/30 hover:text-blue-300 transition-colors"
          >
            {skill}
          </div>
        ))}
      </div>
    </motion.div>
  );
} 