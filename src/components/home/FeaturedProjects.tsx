"use client";

import { siteConfig } from '@/config/siteConfig';
import { SectionContainer } from '@/components/layout/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/projects/ProjectCard';
import Button from '@/components/ui/Button';
import { FaArrowRight } from 'react-icons/fa';

export default function FeaturedProjects() {
  // Filter featured projects
  const featuredProjects = siteConfig.projects.filter(project => project.featured);
  
  return (
    <SectionContainer>
      <SectionHeading
        title="Featured Projects"
        subtitle="Explore some of my recent work that demonstrates my skills and expertise."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            technologies={project.technologies}
            link={project.link}
            featured={index === 0}
          />
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <Button 
          href="/projects"
          size="lg"
          icon={<FaArrowRight />}
          iconPosition="right"
        >
          View All Projects
        </Button>
      </div>
    </SectionContainer>
  );
} 