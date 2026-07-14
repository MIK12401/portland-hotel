import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSuiteClick: () => void;
  onFacilitiesClick: () => void;
  onAboutClick: () => void;
  onDashboardClick: () => void;
}

export default function Footer({ onSuiteClick, onFacilitiesClick, onAboutClick, onDashboardClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-charcoal text-brand-cream-dim pt-16 pb-8 px-6 md:px-12 lg:px-24 border-t border-brand-gold/20 relative overflow-hidden">
      <div className="bg-grid opacity-15"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-brand-cream-dim/10 pb-12 relative z-10">
        
        {/* Left Column: Info & Logo */}
        <div className="md:col-span-5 space-y-6" id="footer-about-col">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleScrollToTop}>
            <div className="w-10 h-10 bg-brand-gold text-brand-charcoal flex items-center justify-center font-serif text-xl font-bold border border-brand-gold/30 neon-glow-btn">
              PS
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-brand-cream block">PORTLAND</span>
              <span className="font-serif text-[10px] tracking-[0.25em] text-brand-gold font-bold block -mt-1">SUITES</span>
            </div>
          </div>

          <p className="font-sans text-xs md:text-sm text-brand-cream-dim/75 leading-relaxed font-light max-w-sm">
            No. 3 Alkhum Close, off Lingu Crescent, Wuse II, Abuja, Nigeria.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 pt-2 text-xs font-sans font-medium uppercase tracking-widest text-brand-gold">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-cream transition-colors duration-200 flex items-center gap-1">
              Instagram <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-cream transition-colors duration-200 flex items-center gap-1">
              Twitter <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-cream transition-colors duration-200 flex items-center gap-1">
              LinkedIn <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="md:col-span-3 space-y-4" id="footer-links-col">
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">
            QUICK LINKS
          </h4>
          
          <ul className="space-y-2.5 text-xs font-sans text-brand-cream-dim/80 font-light">
            <li>
              <button onClick={onSuiteClick} className="hover:text-brand-gold transition-colors duration-200 uppercase tracking-widest text-[10px] font-semibold">
                Our Suites
              </button>
            </li>
            <li>
              <button onClick={onFacilitiesClick} className="hover:text-brand-gold transition-colors duration-200 uppercase tracking-widest text-[10px] font-semibold">
                Facilities
              </button>
            </li>
            <li>
              <button onClick={onAboutClick} className="hover:text-brand-gold transition-colors duration-200 uppercase tracking-widest text-[10px] font-semibold">
                Dining & Culinary
              </button>
            </li>
            <li>
              <button onClick={onAboutClick} className="hover:text-brand-gold transition-colors duration-200 uppercase tracking-widest text-[10px] font-semibold">
                About Us
              </button>
            </li>
            <li>
              <button onClick={onDashboardClick} className="hover:text-brand-gold transition-colors duration-200 uppercase tracking-widest text-[10px] font-semibold">
                Guest Dashboard
              </button>
            </li>
          </ul>
        </div>

        {/* Right Column: Contact & Reservations */}
        <div className="md:col-span-4 space-y-4" id="footer-contact-col">
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">
            RESERVATIONS & DESK
          </h4>
          
          <div className="space-y-4 text-xs font-sans text-brand-cream-dim/80 font-light">
            <p className="leading-relaxed">
              Contact our concierge for bespoke booking requirements or corporate embassy hosting.
            </p>

            <div className="space-y-2 pt-2">
              <a 
                href="mailto:stay@portlandsuites.ng" 
                className="flex items-center gap-2.5 hover:text-brand-gold transition-colors duration-200"
              >
                <Mail className="w-4 h-4 text-brand-gold" />
                <span className="font-mono">stay@portlandsuites.ng</span>
              </a>

              <a 
                href="tel:+2348001234567" 
                className="flex items-center gap-2.5 hover:text-brand-gold transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span className="font-mono">+234 (0) 800 123 4567</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-cream-dim/40 font-sans font-light">
        <p>
          &copy; {currentYear} Portland Suites Wuse II, Abuja. All rights reserved.
        </p>
        <p className="flex items-center gap-1.5 uppercase tracking-widest text-[9px] font-semibold text-brand-gold/60">
          <ShieldCheck className="w-3.5 h-3.5" /> High-Discretion Luxury Sanctuary
        </p>
      </div>
    </footer>
  );
}
