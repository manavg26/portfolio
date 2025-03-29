"use client";

import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-xl font-bold text-white">
              {siteConfig.name}
            </Link>
            <p className="text-slate-400 max-w-md">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href={siteConfig.social.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href={siteConfig.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href={`mailto:${siteConfig.contact.email}`} 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
              <a 
                href={`tel:${siteConfig.contact.phone}`} 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <FaPhone size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              {siteConfig.mainNav.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="flex flex-col space-y-2">
              <p className="text-slate-400">
                <span className="font-medium text-slate-300">Email:</span>{' '}
                <a 
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-slate-400">
                <span className="font-medium text-slate-300">Phone:</span>{' '}
                <a 
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <div className="pt-4">
                <a 
                  href={siteConfig.social.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2 md:mt-0">
            Designed and built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
} 