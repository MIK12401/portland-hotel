import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, Compass, ArrowRight } from 'lucide-react';
import { Room } from '../types';

interface HeroProps {
  onReserveClick: () => void;
  onQuickSearch: (checkIn: string, checkOut: string, guests: number, roomId: string) => void;
  rooms: Room[];
}

export default function Hero({ onReserveClick, onQuickSearch, rooms }: HeroProps) {
  // Setup quick search state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);
  const dayAfterStr = dayAfterTomorrow.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(tomorrowStr);
  const [checkOut, setCheckOut] = useState(dayAfterStr);
  const [guests, setGuests] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || '');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch(checkIn, checkOut, guests, selectedRoomId);
  };

  return (
    <section className="relative bg-brand-charcoal min-h-[92vh] flex flex-col justify-between overflow-hidden text-brand-cream py-12 px-6 md:px-12 lg:px-24">
      {/* Background Grid & Glowing Orbs of Immersive UI */}
      <div className="bg-grid"></div>
      <div className="glow-orb top-[-100px] right-[-100px]"></div>
      <div className="glow-orb-2 bottom-[-50px] left-[-50px]"></div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
        
        {/* Left Column - Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8" id="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="text-brand-gold font-sans text-xs md:text-sm uppercase tracking-[0.25em] font-bold block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
              PORTLAND CORE OPTIMAL STAY
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-brand-primary max-w-2xl">
              Experience Unmatched Luxury in the Heart of <span className="text-brand-gold">Wuse II</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-brand-cream-dim text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-xl"
          >
            Discover a refined world where West African hospitality meets international luxury standards. Tucked away on Alkhum Close, your private escape and premium sanctuary await.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onReserveClick}
              className="bg-brand-gold text-brand-charcoal hover:bg-brand-primary hover:text-brand-charcoal transition-all duration-300 px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3 border border-brand-gold shadow-lg active:scale-95 neon-glow-btn"
              id="hero-cta-btn"
            >
              Reserve Your Stay <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#suites"
              className="px-6 py-4 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-cream hover:text-brand-gold transition-colors duration-200 border border-brand-cream-dark hover:border-brand-gold bg-brand-charcoal/40 backdrop-blur-xs"
            >
              Explore Suites
            </a>
          </motion.div>
        </div>

        {/* Right Column - Image Showcase */}
        <div className="lg:col-span-5 flex justify-center items-center relative" id="hero-image-pane">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[450px] aspect-[4/5] bg-brand-charcoal/80 border border-brand-gold/30 p-3 shadow-2xl relative"
          >
            {/* The actual generated hotel image */}
            <div className="w-full h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-brand-charcoal/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
              <img 
                src="/src/assets/images/hero_exterior_1784044295714.jpg" 
                alt="Portland Suites Abuja Facade" 
                className="w-full h-full object-cover transform scale-102 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Label */}
              <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal/90 backdrop-blur-sm p-4 border border-brand-gold/20 z-20">
                <p className="font-serif text-sm text-brand-gold font-bold">Portland Suites</p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-cream-dim">No. 3 Alkhum Close, Wuse II</p>
              </div>
            </div>

            {/* Decorative Gold Corner Borders */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-brand-gold pointer-events-none" />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-brand-gold pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Row - Scroll indicator + Quick Booking Engine */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mt-12 md:mt-16 border-t border-brand-cream-dark pt-6 z-10">
        
        {/* Scroll Label */}
        <div className="hidden md:flex items-center gap-3 text-brand-cream-dim/60 font-sans text-[10px] uppercase tracking-[0.3em]">
          <span className="w-8 h-[1px] bg-brand-gold/40 block"></span>
          <span className="animate-pulse">Scroll to explore</span>
        </div>

        {/* Floating Quick Reservation Widget */}
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-brand-charcoal/90 backdrop-blur-md text-brand-primary p-4 lg:p-5 flex flex-col lg:flex-row items-center gap-4 border border-brand-gold/30 shadow-2xl w-full lg:max-w-4xl"
          id="quick-search-form"
        >
          {/* Check-In */}
          <div className="flex flex-col gap-1.5 w-full lg:w-auto flex-1">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-brand-gold" /> Check-in
            </label>
            <input 
              type="date" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={tomorrowStr}
              className="bg-brand-charcoal text-brand-primary text-xs border border-brand-cream-dark p-2 px-3 focus:outline-none focus:border-brand-gold font-semibold w-full"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col gap-1.5 w-full lg:w-auto flex-1">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-brand-gold" /> Check-out
            </label>
            <input 
              type="date" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || tomorrowStr}
              className="bg-brand-charcoal text-brand-primary text-xs border border-brand-cream-dark p-2 px-3 focus:outline-none focus:border-brand-gold font-semibold w-full"
              required
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1.5 w-full lg:w-32">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
              <User className="w-3 h-3 text-brand-gold" /> Guests
            </label>
            <select 
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="bg-brand-charcoal text-brand-primary text-xs border border-brand-cream-dark p-2 px-3 focus:outline-none focus:border-brand-gold font-semibold w-full appearance-none cursor-pointer"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
            </select>
          </div>

          {/* Selected Room Type */}
          <div className="flex flex-col gap-1.5 w-full lg:w-48">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-brand-gold" /> Room Preferred
            </label>
            <select 
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="bg-brand-charcoal text-brand-primary text-xs border border-brand-cream-dark p-2 px-3 focus:outline-none focus:border-brand-gold font-semibold w-full appearance-none cursor-pointer"
            >
              {rooms.map(room => (
                <option key={room.id} value={room.id} className="text-brand-primary bg-brand-charcoal">
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            className="w-full lg:w-auto bg-brand-gold text-brand-charcoal hover:bg-brand-primary hover:text-brand-charcoal transition-all duration-300 px-6 py-4 text-xs font-sans uppercase tracking-widest font-bold self-end neon-glow-btn cursor-pointer"
            id="quick-book-submit-btn"
          >
            Check Availability
          </button>
        </form>
      </div>
    </section>
  );
}
