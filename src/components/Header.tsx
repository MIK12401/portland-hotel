import React from 'react';
import { Compass, CalendarDays, UserCircle } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
  onDashboardClick: () => void;
  bookingCount: number;
}

export default function Header({ onBookClick, onDashboardClick, bookingCount }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-charcoal/80 backdrop-blur-md border-b border-brand-cream-dark py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
          id="header-logo"
        >
          <div className="w-10 h-10 bg-brand-cream-lowest text-brand-gold flex items-center justify-center font-serif text-xl font-bold border border-brand-gold/30 transition-all duration-300 group-hover:bg-brand-gold group-hover:text-brand-charcoal">
            PS
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-lg font-bold tracking-wider text-brand-primary">PORTLAND</span>
            <span className="font-serif text-xs block -mt-1 tracking-[0.2em] text-brand-gold font-medium">SUITES</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <button 
            onClick={() => scrollToSection('suites')}
            className="font-sans text-xs uppercase tracking-[0.15em] font-medium text-brand-cream-dim hover:text-brand-gold transition-colors duration-200"
            id="nav-suites"
          >
            Rooms
          </button>
          <button 
            onClick={() => scrollToSection('facilities')}
            className="font-sans text-xs uppercase tracking-[0.15em] font-medium text-brand-cream-dim hover:text-brand-gold transition-colors duration-200"
            id="nav-facilities"
          >
            Facilities
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="font-sans text-xs uppercase tracking-[0.15em] font-medium text-brand-cream-dim hover:text-brand-gold transition-colors duration-200"
            id="nav-dining"
          >
            Dining
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="font-sans text-xs uppercase tracking-[0.15em] font-medium text-brand-cream-dim hover:text-brand-gold transition-colors duration-200"
            id="nav-about"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('reviews')}
            className="font-sans text-xs uppercase tracking-[0.15em] font-medium text-brand-cream-dim hover:text-brand-gold transition-colors duration-200"
            id="nav-reviews"
          >
            Reviews
          </button>
        </nav>

        {/* Quick CTAs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onDashboardClick}
            className="relative flex items-center gap-2 px-3 py-2 text-brand-cream-dim hover:text-brand-gold transition-colors duration-200"
            title="My Reservations"
            id="header-dashboard-btn"
          >
            <UserCircle className="w-5 h-5 text-brand-gold" />
            <span className="hidden sm:inline font-sans text-xs uppercase tracking-wider font-semibold">My Stay</span>
            {bookingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-charcoal text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border border-brand-charcoal animate-pulse">
                {bookingCount}
              </span>
            )}
          </button>

          <button
            onClick={onBookClick}
            className="bg-transparent text-brand-gold hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] font-semibold border border-brand-gold active:scale-95 shadow-sm neon-glow-btn"
            id="header-book-btn"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}
