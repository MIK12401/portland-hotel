import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy } from 'lucide-react';

export default function Story() {
  return (
    <section id="about" className="relative bg-brand-charcoal py-20 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-brand-cream-dark">
      {/* Background Grid & Orbs for Immersive UI */}
      <div className="bg-grid opacity-50"></div>
      <div className="glow-orb top-[-150px] left-[-150px] opacity-40"></div>

      {/* Background Decorative Large Year */}
      <div className="absolute right-10 md:right-32 top-10 pointer-events-none select-none opacity-[0.02]">
        <span className="font-serif text-[180px] md:text-[280px] font-bold tracking-tighter text-brand-primary block leading-none">
          2024
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Copy & Stats */}
        <div className="lg:col-span-6 space-y-8" id="story-text-container">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-brand-gold"></span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold font-bold">
                OUR STORY
              </span>
            </div>
            
            {/* Outline year decoration above the title */}
            <div className="relative">
              <div className="absolute -top-10 left-0 text-[72px] md:text-[96px] font-serif font-outline-1 text-transparent select-none opacity-5 font-bold leading-none">
                Est. 2024
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight text-brand-primary pt-6">
                A Boutique Sanctuary for the Discerning Traveler
              </h2>
            </div>
          </div>

          <div className="space-y-5 text-brand-cream-dim font-sans text-sm md:text-base leading-relaxed font-light">
            <p>
              Located at No. 3 Alkhum Close, off Lingu Crescent, Wuse II, Abuja, Portland Suites is more than just a hotel—it is a carefully curated experience designed for those who value absolute privacy and premium service.
            </p>
            <p>
              Our architecture blends bold, modern structural elements with soft, tactile interiors, creating a rhythmic harmony that ensures every guest feels an immediate sense of belonging and serene tranquility. We focus on boutique hospitality, ensuring personalized care that scales to your individual taste.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-brand-cream-dark max-w-md">
            <div className="space-y-1">
              <p className="font-serif text-3xl md:text-4xl font-semibold text-brand-gold">
                24
              </p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-brand-cream-dim font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> LUXURY SUITES
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-3xl md:text-4xl font-semibold text-brand-gold">
                4.9
              </p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-brand-cream-dim font-bold flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-brand-gold" /> GUEST RATING
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Overlapping Images */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[450px] md:min-h-[550px]" id="story-images-container">
          
          {/* Main Taller Image - story_interior_1 (back, slightly left) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-1/2 aspect-[3/4] bg-brand-charcoal border border-brand-gold/30 p-2 shadow-lg relative z-10 mr-auto"
          >
            <div className="w-full h-full overflow-hidden">
              <img 
                src="/src/assets/images/story_interior_1_1784044329199.jpg" 
                alt="Portland Suites Premium Suite Bedroom" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Secondary Shorter Image - story_interior_2 (front, offset right, slightly lower) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-0 top-12 w-[48%] aspect-[3/4] bg-brand-charcoal border border-brand-gold/30 p-2 shadow-xl z-20"
          >
            <div className="w-full h-full overflow-hidden">
              <img 
                src="/src/assets/images/story_interior_2_1784044345420.jpg" 
                alt="Portland Suites Architectural Seating Area" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Abstract Design Lines */}
          <div className="absolute left-6 bottom-4 w-12 h-12 border-b-2 border-l-2 border-brand-gold/20 -z-10" />
          <div className="absolute right-6 top-4 w-12 h-12 border-t-2 border-r-2 border-brand-gold/20 -z-10" />
        </div>

      </div>
    </section>
  );
}
