"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GitHubRepo } from "@/utils/github";
import GitHubProjectCard from "./GitHubProjectCard";
import Button from "@/components/ui/Button";
import { FaGithub } from "react-icons/fa";

interface GitHubProjectsGridProps {
  repos?: GitHubRepo[];
  username?: string;
}

export default function GitHubProjectsGrid({ 
  repos = [], 
  username = "" 
}: GitHubProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueLanguages, setUniqueLanguages] = useState<string[]>([]);

  // Use useMemo to prevent unnecessary re-renders
  const reposArray = useMemo(() => {
    return Array.isArray(repos) ? repos : [];
  }, [repos]);

  useEffect(() => {
    // Extract unique languages from repos
    const languages = Array.from(
      new Set(
        reposArray
          .map((repo) => repo?.language)
          .filter((lang): lang is string => lang !== null && lang !== undefined)
      )
    );
    setUniqueLanguages(languages);
  }, [reposArray]);

  // Handle filter change with loading state
  const handleFilterChange = (filter: string | null) => {
    setIsLoading(true);
    // Small delay to simulate data fetching and show loading state
    setTimeout(() => {
      setActiveFilter(filter);
      setIsLoading(false);
    }, 300);
  };

  // Filter repos based on selected language
  const filteredRepos = activeFilter
    ? reposArray.filter((repo) => repo?.language === activeFilter)
    : reposArray;

  if (reposArray.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-4">No GitHub repositories found</h3>
        {username && (
          <Button
            href={`https://github.com/${username}`}
            external
            icon={<FaGithub />}
          >
            Visit GitHub Profile
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-8 mb-12">
        <Button
          variant={activeFilter === null ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleFilterChange(null)}
          className="rounded-full"
        >
          All
        </Button>
        
        {uniqueLanguages.map((language) => (
          <Button
            key={language}
            variant={activeFilter === language ? "primary" : "secondary"}
            size="sm"
            onClick={() => handleFilterChange(language)}
            className="rounded-full"
          >
            {language}
          </Button>
        ))}
      </div>

      {/* Repositories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            // Show loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`loading-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-800/50 rounded-xl h-64 animate-pulse"
              />
            ))
          ) : (
            filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <GitHubProjectCard
                  repo={repo}
                  featured={index === 0 && reposArray.length > 3}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      {filteredRepos.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <p className="text-slate-400 mb-4">No repositories found with the selected filter.</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleFilterChange(null)}
          >
            Reset Filters
          </Button>
        </div>
      )}
      
      {/* GitHub profile link */}
      {username && (
        <div className="mt-12 text-center">
          <Button
            href={`https://github.com/${username}`}
            external
            icon={<FaGithub />}
            size="lg"
          >
            View All on GitHub
          </Button>
        </div>
      )}
    </>
  );
} 