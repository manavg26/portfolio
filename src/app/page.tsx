"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import FeaturedProjects from "@/components/home/FeaturedProjects";

// Dynamically import the Testimonials component for better performance
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => null
});

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
    </>
  );
}
