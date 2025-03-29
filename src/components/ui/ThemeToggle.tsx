"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { cn } from '@/utils/cn';

type Theme = 'dark' | 'light';

export default function ThemeToggle({ className }: { className?: string }) {
  // Default to dark theme for server rendering to avoid hydration mismatch
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Effect to check for saved preferences and system preferences
  useEffect(() => {
    // Only run once the component is mounted to avoid hydration mismatch
    setMounted(true);
    
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // Check system preference if no saved preference
      setTheme('light');
    }
  }, []);

  // Effect to apply theme changes to document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'light') {
      root.classList.add('light-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light-theme');
      body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme, mounted]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Use a simple button for server-side rendering to avoid hydration mismatch
  if (!mounted) {
    return (
      <button 
        className={cn(
          'relative rounded-full w-12 h-6 bg-slate-700 flex items-center p-1 cursor-pointer z-10',
          className
        )}
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onClick={toggleTheme}
      className={cn(
        'relative rounded-full w-12 h-6 bg-slate-700 flex items-center p-1 cursor-pointer z-10',
        'transition-colors duration-300',
        theme === 'light' && 'bg-blue-400',
        className
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {/* Toggle Track */}
      <span 
        className={cn(
          'absolute inset-0 rounded-full overflow-hidden',
          theme === 'light' ? 'bg-gradient-to-r from-blue-400 to-blue-300' : 'bg-gradient-to-r from-slate-800 to-slate-700'
        )}
      />
      
      {/* Toggle Thumb */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'w-4 h-4 rounded-full z-10',
          theme === 'dark' ? 'bg-slate-300' : 'bg-white'
        )}
        animate={{
          x: theme === 'dark' ? 0 : 24
        }}
      />
      
      {/* Icons */}
      <span className="sr-only">
        {theme === 'dark' ? 'Dark mode' : 'Light mode'}
      </span>
      
      <motion.span
        animate={{ opacity: theme === 'dark' ? 1 : 0 }}
        className="absolute right-2 text-indigo-300"
      >
        <FaMoon size={10} />
      </motion.span>
      
      <motion.span
        animate={{ opacity: theme === 'light' ? 1 : 0 }}
        className="absolute left-2 text-yellow-300"
      >
        <FaSun size={10} />
      </motion.span>
    </motion.button>
  );
} 