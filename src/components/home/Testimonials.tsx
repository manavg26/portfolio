"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { siteConfig } from '@/config/siteConfig';
import { SectionContainer } from '@/components/layout/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { handleImageError, getPlaceholder } from '@/utils/imageLoader';
import { cn } from '@/utils/cn';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const testimonials = siteConfig.testimonials || [];
  const placeholder = getPlaceholder('profile');

  // Function to go to the next testimonial
  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  // Function to go to the previous testimonial
  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  // Auto-advance the carousel every 6 seconds
  useEffect(() => {
    if (!isPaused && testimonials.length > 1) {
      const timer = setTimeout(() => {
        nextTestimonial();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPaused, nextTestimonial, testimonials.length]);

  // No testimonials to show
  if (!testimonials.length) return null;

  // Animation variants for the testimonials
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  };

  // Get current testimonial
  const testimonial = testimonials[currentIndex];

  return (
    <SectionContainer 
      className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
      
      <SectionHeading
        title="What People Say"
        subtitle="Feedback from colleagues and clients about my work and collaboration."
        centered
      />
      
      <div 
        className="mt-12 md:mt-16 max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative bg-slate-900/50 rounded-2xl border border-slate-800 p-8 md:p-10 overflow-hidden">
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 text-blue-500/20">
            <FaQuoteLeft size={60} />
          </div>
          
          {/* Testimonial Content */}
          <div className="min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500/30">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      placeholder="blur"
                      blurDataURL={placeholder.blurDataURL}
                      className="object-cover"
                      sizes="80px"
                      onError={(e) => handleImageError(e, 'profile')}
                    />
                  </div>
                </div>
                
                <p className="text-slate-300 text-lg md:text-xl italic mb-6 relative z-10">
                  &quot;{testimonial.content}&quot;
                </p>
                
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-blue-400 text-sm">{testimonial.position}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {/* Previous Button */}
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-slate-300 hover:bg-blue-900/50 hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft size={16} />
              </button>
              
              {/* Dots Indicator */}
              <div className="flex items-center space-x-2 px-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      index === currentIndex 
                        ? "bg-blue-500 scale-110" 
                        : "bg-slate-700 hover:bg-slate-600"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Next Button */}
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-slate-300 hover:bg-blue-900/50 hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
} 