"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { siteConfig, getIconByName } from '@/config/siteConfig';
import Button from '@/components/ui/Button';
import { TechIconGrid } from '@/components/ui/TechIcon';

// Animation variants for improved performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Use a single motion container with variants */}
        <motion.div 
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Hi, I&apos;m <span className="text-blue-500">{siteConfig.name}</span>
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h2 className="text-xl md:text-2xl font-medium text-slate-300 mb-6">
              {siteConfig.title}
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <p className="text-slate-400 text-lg mb-8">
              {siteConfig.description} I specialize in creating scalable applications with modern technologies.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
            >
              Get in Touch
            </Button>
            <Button
              href="/projects"
              variant="secondary"
              size="lg"
            >
              View My Work
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex justify-center gap-4 mt-8">
            <a 
              href={siteConfig.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href={siteConfig.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a 
              href={siteConfig.social.resume} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Resume"
            >
              <FaFileAlt size={22} />
            </a>
          </motion.div>
          
          {/* Tech Icons */}
          <motion.div variants={itemVariants} className="mt-12">
            <p className="text-sm text-slate-500 mb-4">Tech Stack</p>
            <TechIconGrid 
              icons={siteConfig.techIcons.map(tech => ({
                icon: getIconByName(tech.iconName),
                name: tech.name,
                color: tech.color,
              }))}
              className="justify-center"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Visual cue to scroll - lightweight animation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 5, 0],
        }}
        transition={{
          opacity: { duration: 0.3, delay: 1 },
          y: { duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
        }}
      >
        <div className="w-6 h-9 rounded-full border border-slate-700 flex justify-center pt-1">
          <div className="w-1 h-2 bg-slate-500 rounded-full opacity-80" />
        </div>
        <span className="text-xs mt-2">Scroll</span>
      </motion.div>
    </section>
  );
} 