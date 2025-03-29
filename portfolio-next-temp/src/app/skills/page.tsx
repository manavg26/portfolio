"use client";

import { siteConfig, getIconByName } from "@/config/siteConfig";
import { SectionContainer } from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCategory from "@/components/skills/SkillCategory";
import { TechIconGrid } from "@/components/ui/TechIcon";

export default function SkillsPage() {
  return (
    <SectionContainer className="py-20 md:py-28">
      <SectionHeading
        title="Skills & Expertise"
        subtitle="My technical skills and areas of expertise in software development."
        centered
      />
      
      {/* Tech Icons */}
      <div className="flex justify-center my-12">
        <TechIconGrid 
          icons={siteConfig.techIcons.map(tech => ({
            icon: getIconByName(tech.iconName),
            name: tech.name,
            color: tech.color,
          }))}
          className="justify-center gap-8"
        />
      </div>
      
      {/* Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {siteConfig.skills.map((skillCategory, index) => (
          <SkillCategory
            key={skillCategory.category}
            category={skillCategory.category}
            items={skillCategory.items}
            index={index}
          />
        ))}
      </div>
    </SectionContainer>
  );
} 