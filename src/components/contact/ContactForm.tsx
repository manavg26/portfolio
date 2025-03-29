"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/config/siteConfig";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulating form submission
    try {
      // In a real application, you would send this data to your backend
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-full text-blue-400">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <a 
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-full text-blue-400">
                <FaPhone />
              </div>
              <div>
                <p className="text-sm text-slate-400">Phone</p>
                <a 
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-sm text-slate-400 mb-4">Connect with me</p>
            <div className="flex gap-4">
              <a 
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <FaGithub />
              </a>
              <a 
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-4">Resume</h3>
          <p className="text-slate-400 mb-4">
            Feel free to check out my resume for a detailed overview of my experience and skills.
          </p>
          <Button 
            href={siteConfig.social.resume}
            external
            variant="primary"
          >
            Download Resume
          </Button>
        </div>
      </motion.div>
      
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {submitted ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-slate-400 mb-6">Your message has been sent successfully. I&apos;ll get back to you soon!</p>
            <Button onClick={() => setSubmitted(false)} variant="secondary">
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {error && (
              <div className="mt-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <div className="mt-6">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
} 