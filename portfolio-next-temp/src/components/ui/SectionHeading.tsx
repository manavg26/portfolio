"use client";

import { motion } from 'framer-motion';
import { useFadeAnimation } from '@/hooks/useAnimations';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  const { ref, variants, animation } = useFadeAnimation({
    direction: 'up',
    delay: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={animation}
      className={cn(
        'mb-8 md:mb-12 lg:mb-16',
        centered && 'text-center',
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
        {title}
        <span className="inline-block ml-1 text-blue-500">.</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
} 