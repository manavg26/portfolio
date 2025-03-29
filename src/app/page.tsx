"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import FeaturedProjects from "@/components/home/FeaturedProjects";

// Dynamically import the Testimonials component for better performance
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => <TestimonialsSkeleton />
});

// Lightweight skeleton component for Testimonials while loading
function TestimonialsSkeleton() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center mb-12">
          <div className="h-10 bg-slate-800/40 rounded w-60 mb-4"></div>
          <div className="h-4 bg-slate-800/40 rounded w-96"></div>
        </div>
        <div className="max-w-4xl mx-auto bg-slate-900/30 rounded-2xl border border-slate-800/50 p-8 md:p-10 min-h-[200px] flex items-center justify-center">
          <div className="text-slate-600 text-center">Loading testimonials...</div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
    </>
  );
}
