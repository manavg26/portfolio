"use client";

import { SectionContainer } from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <SectionContainer className="py-20 md:py-28">
      <SectionHeading
        title="Get in Touch"
        subtitle="Have a question or want to work together? Feel free to reach out!"
        centered
      />
      
      <ContactForm />
    </SectionContainer>
  );
} 