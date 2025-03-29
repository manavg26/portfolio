"use client";

import { siteConfig } from "@/config/siteConfig";
import { SectionContainer } from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceCard from "@/components/experience/ExperienceCard";

export default function ExperiencePage() {
  return (
    <SectionContainer className="py-20 md:py-28">
      <SectionHeading
        title="Professional Experience"
        subtitle="My journey as a software engineer and the roles I've taken on."
        centered
      />
      
      <div className="mt-12 md:mt-16 relative">
        {/* Timeline line */}
        <div className="absolute left-5 md:left-7 top-0 bottom-0 w-0.5 bg-slate-800" />
        
        <div className="ml-12 space-y-12">
          {siteConfig.experience.map((exp, index) => (
            <ExperienceCard
              key={index}
              company={exp.company}
              position={exp.position}
              duration={exp.duration}
              description={exp.description}
              achievements={exp.achievements}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
} 