"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaLinkedin } from 'react-icons/fa';
import { SectionContainer } from '@/components/layout/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/utils/cn';
import { linkedInRecommendations } from '@/data/linkedInRecommendations';

export default function Testimonials() {
  // State declarations must come before any conditional logic (Rules of Hooks)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Function to go to the next testimonial
  const nextTestimonial = useCallback(() => {
    if (linkedInRecommendations.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === linkedInRecommendations.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  // Function to go to the previous testimonial
  const prevTestimonial = useCallback(() => {
    if (linkedInRecommendations.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? linkedInRecommendations.length - 1 : prevIndex - 1
    );
  }, []);

  // No recommendations to show, don't render anything
  if (!linkedInRecommendations.length) {
    return null;
  }

  // Animation variants for the recommendations
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

  // Get current recommendation
  const recommendation = linkedInRecommendations[currentIndex];

  // Format the date nicely
  const formattedDate = new Date(recommendation.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <SectionContainer 
      className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
      
      <div className="flex flex-col items-center">
        <SectionHeading
          title="LinkedIn Recommendations"
          subtitle="Professional endorsements from my network"
          centered
        />
        
        <div className="flex items-center mb-8 text-blue-500">
          <FaLinkedin className="mr-2" size={24} />
          <span className="text-sm">Sourced from LinkedIn</span>
        </div>
      </div>
      
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="relative bg-slate-900/50 rounded-2xl border border-slate-800 p-8 md:p-10 overflow-hidden shadow-xl">
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 text-blue-500/20">
            <FaQuoteLeft size={60} />
          </div>
          
          {/* Recommendation Content */}
          <div className="min-h-[250px] flex flex-col justify-center">
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
                <p className="text-slate-300 text-lg md:text-xl italic mb-8 relative z-10">
                  &quot;{recommendation.content}&quot;
                </p>
                
                <div>
                  <h4 className="text-white font-bold">
                    {recommendation.linkedInProfile ? (
                      <Link 
                        href={recommendation.linkedInProfile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors flex items-center justify-center gap-1"
                      >
                        {recommendation.name}
                        <FaLinkedin size={14} className="text-blue-500" />
                      </Link>
                    ) : (
                      recommendation.name
                    )}
                  </h4>
                  <p className="text-blue-400 text-sm">{recommendation.position}</p>
                  <p className="text-slate-500 text-xs mt-1">Recommended {formattedDate}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Controls */}
          {linkedInRecommendations.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {/* Previous Button */}
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-slate-300 hover:bg-blue-900/50 hover:text-white transition-colors"
                aria-label="Previous recommendation"
              >
                <FaChevronLeft size={16} />
              </button>
              
              {/* Dots Indicator */}
              <div className="flex items-center space-x-2 px-4">
                {linkedInRecommendations.map((_, index) => (
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
                    aria-label={`Go to recommendation ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Next Button */}
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-slate-300 hover:bg-blue-900/50 hover:text-white transition-colors"
                aria-label="Next recommendation"
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
