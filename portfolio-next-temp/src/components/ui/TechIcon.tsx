"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { cn } from '@/utils/cn';

interface TechIconProps {
  icon: IconType;
  name?: string;
  color?: string;
  size?: number;
  hoverEffect?: boolean;
  className?: string;
}

export default function TechIcon({
  icon: Icon,
  name,
  color = '#fff',
  size = 24,
  hoverEffect = true,
  className,
}: TechIconProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <motion.div
      className={cn(
        'relative inline-flex items-center justify-center',
        hoverEffect && 'group',
        className
      )}
      whileHover={hoverEffect ? { scale: 1.2 } : {}}
      onMouseEnter={() => name && setIsTooltipVisible(true)}
      onMouseLeave={() => name && setIsTooltipVisible(false)}
    >
      <Icon size={size} style={{ color }} />
      
      {name && isTooltipVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  );
}

export function TechIconGrid({ 
  icons,
  className 
}: { 
  icons: { 
    icon: IconType; 
    name?: string; 
    color?: string; 
  }[]; 
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-6', className)}>
      {icons.map((iconData, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TechIcon
            icon={iconData.icon}
            name={iconData.name}
            color={iconData.color}
            size={28}
          />
        </motion.div>
      ))}
    </div>
  );
} 