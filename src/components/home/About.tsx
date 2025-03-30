"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { SectionContainer } from '@/components/layout/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { FaArrowRight } from 'react-icons/fa';

// Simple animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const codeBlockVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

export default function About() {
  // For the typing animation
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  
  // Code lines to display with a typing effect - wrapped in useMemo
  const codeLines = useMemo(() => [
    '// My Developer Philosophy',
    'const philosophy = {',
    '  beliefs: ["Elegant code", "Simple solutions", "Security first"],',
    '  approach: "Measure twice, code once",',
    '  teamwork: "Best code is collaborative",',
    '  growth: "Learn something new every day"',
    '};',
    '',
    '// What drives me',
    'function motivation() {',
    '  return {',
    '    purpose: "Building systems that matter",',
    '    challenge: "Solving complex problems",',
    '    vision: "Tech that serves humanity"',
    '  };',
    '}',
  ], []);
  
  // Handle the typing animation
  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      return; // Typing completed
    }
    
    const currentLine = codeLines[currentLineIndex];
    const timer = setTimeout(() => {
      if (displayedText.length < currentLine.length) {
        setDisplayedText(currentLine.substring(0, displayedText.length + 1));
      } else {
        setDisplayedText('');
        setCurrentLineIndex(prev => prev + 1);
      }
    }, 10); // Typing speed - reduced further for even faster animation
    
    return () => clearTimeout(timer);
  }, [displayedText, currentLineIndex, codeLines]);
  
  // Format code with basic highlighting
  const formatCodeWithHighlighting = (code: string) => {
    // Define theme-aware colors for syntax highlighting
    const commentColor = 'var(--comment-color, #22c55e)';
    const keywordColor = 'var(--keyword-color, #a855f7)';
    const stringColor = 'var(--string-color, #eab308)';
    const defaultColor = 'var(--text-color)';
    
    return code.split('\n').map((line, index) => {
      // Apply different styling based on line content
      if (line.startsWith('//')) {
        // Comments
        return <div key={index} className="whitespace-pre" style={{ color: commentColor }}>{line}</div>;
      } else if (line.startsWith('const') || line.startsWith('function')) {
        // Keywords
        const parts = line.split(/^(const|function)(\s+)/);
        return (
          <div key={index} className="whitespace-pre">
            {parts.length > 1 ? (
              <>
                <span style={{ color: keywordColor }}>{parts[1]}</span>
                <span style={{ color: defaultColor }}>{parts[2]}</span>
                <span style={{ color: defaultColor }}>{parts[3] || ''}</span>
              </>
            ) : (
              <span style={{ color: defaultColor }}>{line}</span>
            )}
          </div>
        );
      } else if (line.includes('return')) {
        // Return statement
        const parts = line.split(/^(\s*)(return)(\s+)/);
        return (
          <div key={index} className="whitespace-pre">
            {parts.length > 1 ? (
              <>
                <span style={{ color: defaultColor }}>{parts[1]}</span>
                <span style={{ color: keywordColor }}>{parts[2]}</span>
                <span style={{ color: defaultColor }}>{parts[3]}</span>
                <span style={{ color: defaultColor }}>{parts[4] || ''}</span>
              </>
            ) : (
              <span style={{ color: defaultColor }}>{line}</span>
            )}
          </div>
        );
      } else if (line.includes('"')) {
        // Line with strings
        const stringRegex = /"([^"]*)"/g;
        const parts = [];
        let lastIndex = 0;
        let match;
        
        // Preserve indentation at the beginning
        const indentMatch = line.match(/^(\s+)/);
        if (indentMatch) {
          parts.push(<span key="indent" style={{ color: defaultColor }}>{indentMatch[0]}</span>);
          lastIndex = indentMatch[0].length;
        }
        
        while ((match = stringRegex.exec(line)) !== null) {
          parts.push(<span key={`text-${match.index}`} style={{ color: defaultColor }}>{line.substring(lastIndex, match.index)}</span>);
          parts.push(<span key={`str-${match.index}`} style={{ color: stringColor }}>{match[0]}</span>);
          lastIndex = match.index + match[0].length;
        }
        
        if (lastIndex < line.length) {
          parts.push(<span key="remaining" style={{ color: defaultColor }}>{line.substring(lastIndex)}</span>);
        }
        
        return <div key={index} className="whitespace-pre">{parts}</div>;
      } else {
        // Regular lines
        return <div key={index} className="whitespace-pre" style={{ color: defaultColor }}>{line}</div>;
      }
    });
  };
  
  // Get completed code
  const completedCode = codeLines.slice(0, currentLineIndex).join('\n');
  
  return (
    <SectionContainer 
      className="from-transparent to-slate-900/50"
      id="about"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Code Editor Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={codeBlockVariants}
          className="relative order-2 lg:order-1"
        >
          <div className="relative h-[450px] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl border-2 border-slate-800 shadow-lg" style={{ 
            backgroundColor: 'var(--card-bg)', 
            borderColor: 'var(--border-color)',
            color: 'var(--text-color)'
          }}>
            {/* Code Editor Header */}
            <div className="h-8 flex items-center px-4" style={{ backgroundColor: 'var(--border-color)' }}>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs text-slate-600 dark:text-slate-400">developer-profile.js</div>
            </div>
            
            {/* Code Editor Content */}
            <div className="p-4 font-mono text-sm overflow-y-auto h-[calc(100%-32px)]" style={{ color: 'var(--text-color)' }}>
              {/* Render already completed code */}
              <div className="space-y-1">
                {formatCodeWithHighlighting(completedCode)}
                
                {/* Current typing line */}
                {currentLineIndex < codeLines.length && (
                  <div className="flex whitespace-pre">
                    {/* Apply basic highlighting to the typing text */}
                    {(() => {
                      const line = displayedText;
                      // Check if line starts with whitespace
                      const indentMatch = line.match(/^(\s+)/);
                      
                      // Define theme-aware colors for syntax highlighting
                      const commentColor = 'var(--comment-color, #22c55e)';
                      const keywordColor = 'var(--keyword-color, #a855f7)';
                      const defaultColor = 'var(--text-color)';
                      
                      if (line.startsWith('//')) {
                        return <span style={{ color: commentColor }}>{displayedText}</span>;
                      } else if (line.startsWith('const') || line.startsWith('function')) {
                        const parts = line.split(' ');
                        if (parts.length > 1) {
                          return (
                            <>
                              <span style={{ color: keywordColor }}>{parts[0]}</span>
                              <span style={{ color: defaultColor }}>{' ' + parts.slice(1).join(' ')}</span>
                            </>
                          );
                        }
                        return <span style={{ color: keywordColor }}>{displayedText}</span>;
                      } else if (indentMatch) {
                        // Handle indented lines
                        const indent = indentMatch[0];
                        const content = line.substring(indent.length);
                        return (
                          <>
                            <span style={{ color: defaultColor }}>{indent}</span>
                            <span style={{ color: defaultColor }}>{content}</span>
                          </>
                        );
                      } else if (line.includes('return') && line.indexOf('return') === 0) {
                        return <span style={{ color: keywordColor }}>{displayedText}</span>;
                      } else {
                        return <span style={{ color: defaultColor }}>{displayedText}</span>;
                      }
                    })()}
                    <span className="inline-block w-2 h-4 bg-blue-500 animate-blink"></span>
                  </div>
                )}
              </div>
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
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              I&apos;m a passionate Software Engineer with specialized expertise in backend development, 
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
