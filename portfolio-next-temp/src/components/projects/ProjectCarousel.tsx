"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCircle } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import Button from '@/components/ui/Button';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  demoLink?: string;
  featured?: boolean;
}

interface ProjectCarouselProps {
  projects: Project[];
  className?: string;
}

export default function ProjectCarousel({ projects, className }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [autoplay, setAutoplay] = useState(true);

  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, projects.length]);

  // Pause autoplay when user interacts
  const pauseAutoplay = () => {
    setAutoplay(false);
    // Resume after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  const nextSlide = () => {
    pauseAutoplay();
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    pauseAutoplay();
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    pauseAutoplay();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // If no projects, return nothing
  if (!projects.length) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main carousel */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{
              x: direction > 0 ? '100%' : '-100%',
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
            exit={{
              x: direction < 0 ? '100%' : '-100%',
              opacity: 0,
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
            className="absolute inset-0"
          >
            <div className="h-full w-full flex items-center justify-center px-4">
              <div className="w-full max-w-4xl">
                <ProjectCard
                  title={projects[currentIndex].title}
                  description={projects[currentIndex].description}
                  image={projects[currentIndex].image}
                  technologies={projects[currentIndex].technologies || []}
                  link={projects[currentIndex].link}
                  demoLink={projects[currentIndex].demoLink}
                  featured={true}
                  className="h-full shadow-xl shadow-blue-500/10 border-blue-500/30 transform transition-transform hover:scale-[1.01]"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <Button 
          variant="secondary" 
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-3"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </Button>

        <Button 
          variant="secondary" 
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-3"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </Button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            <FaCircle
              size={index === currentIndex ? 10 : 8}
              className={`transition-all ${
                index === currentIndex ? 'text-blue-500' : 'text-slate-600'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
} 