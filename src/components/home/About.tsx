"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { SectionContainer } from '@/components/layout/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { FaArrowRight } from 'react-icons/fa';
import { handleImageError, getPlaceholder } from '@/utils/imageLoader';

// Simple animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

export default function About() {
  const [imageError, setImageError] = useState(false);
  
  // Get placeholder in case of image error
  const placeholder = getPlaceholder('profile');
  
  return (
    <SectionContainer 
      className="from-transparent to-slate-900/50"
      id="about"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={imageVariants}
          className="relative order-2 lg:order-1"
        >
          <div className="relative h-[400px] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl border-2 border-slate-800">
            <Image
              src={imageError ? placeholder.src : "/images/profile.jpg"}
              alt="Manav Goel"
              fill
              placeholder="blur"
              blurDataURL={placeholder.blurDataURL}
              className="profile-image object-cover"
              onError={(e) => {
                handleImageError(e, 'profile');
                setImageError(true);
              }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              data-original-src="/images/profile.jpg"
            />
            
            {/* Code snippet overlay */}
            <div className="absolute left-0 bottom-0 w-full p-4 bg-slate-900/80 backdrop-blur-sm">
              <pre className="text-xs text-blue-300 overflow-x-auto scrollbar-hide">
                <code>{`const developer = {
  name: "Manav Goel",
  role: "Senior Software Engineer",
  skills: ["Node.js", "Python", "Java", "Cloud"],
  passion: "Building scalable systems"
};`}</code>
              </pre>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />
        </motion.div>
        
        {/* Content Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInVariants}
          className="order-1 lg:order-2"
        >
          <SectionHeading 
            title="About Me"
            className="text-left"
          />
          
          <div className="space-y-4 text-slate-400">
            <p>
              I&apos;m a passionate Senior Software Engineer with specialized expertise in backend development, 
              AI integrations, and designing scalable systems. My journey in software development has equipped 
              me with a diverse skill set and a problem-solving mindset.
            </p>
            
            <p>
              At Paytm, I led the development of the Travel AI Wrapper service that handles thousands of concurrent 
              WebSocket connections while maintaining robust security protocols and real-time performance. My 
              implementation of speech processing services and OAuth authentication has helped streamline travel 
              booking experiences for millions of users.
            </p>
            
            <p>
              My technical toolkit includes Node.js, Java, Python, and cloud infrastructure, with particular 
              strength in developing secure, high-throughput services that scale efficiently. I&apos;m passionate about 
              solving complex engineering challenges that sit at the intersection of performance, security, and 
              user experience.
            </p>
          </div>
          
          <div className="mt-8">
            <Button 
              href="/experience"
              icon={<FaArrowRight />}
              iconPosition="right"
            >
              View My Experience
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
} 
