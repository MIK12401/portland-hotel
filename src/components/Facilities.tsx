import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Waves, Utensils, Leaf, Coffee, Wifi, Dumbbell, ShieldCheck, Bell, 
  X, Check, Clock, UserCheck, CalendarRange 
} from 'lucide-react';
import { Facility } from '../types';

interface FacilitiesProps {
  facilities: Facility[];
  onBookSpaClick: () => void;
  onBookDiningClick: () => void;
}

export default function Facilities({ facilities, onBookSpaClick, onBookDiningClick }: FacilitiesProps) {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  // Helper to dynamically render Lucide icons by name
  const renderIcon = (iconName: string, className = "w-6 h-6 text-brand-gold") => {
    switch (iconName) {
      case 'Waves': return <Waves className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Leaf': return <Leaf className={className} />;
      case 'Coffee': return <Coffee className={className} />;
      case 'Wifi': return <Wifi className={className} />;
      case 'Dumbbell': return <Dumbbell className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Bell': return <Bell className={className} />;
      default: return <Waves className={className} />;
    }
  };

  // Get operational info or specialized text for the facility modal
  const getFacilityExtraInfo = (facilityId: string) => {
    switch (facilityId) {
      case 'azure-pool':
        return {
          hours: '6:00 AM - 10:00 PM Daily',
          details: ['Heated kidney-shaped outdoor pool', 'Complimentary fresh towels', 'Poolside mocktail service & light bites', 'Artistic local murals & dense tropical flora'],
          cta: null
        };
      case 'gourmet-dining':
        return {
          hours: '7:00 AM - 11:00 PM Daily',
          details: ['Executive Chef tasting menus', 'Private dining rooms available upon request', 'Fusian of West African spices with French culinary style', 'Organic locally-sourced garden vegetables'],
          cta: { text: 'Reserve Dining Table', action: onBookDiningClick }
        };
      case 'wellness-spa':
        return {
          hours: '8:00 AM - 9:00 PM Daily',
          details: ['Organic botanical essential oils', 'Hot stone massages & customized facials', 'Private soundproof wellness suites', 'Professional licensed therapists'],
          cta: { text: 'Schedule Spa Treatment', action: onBookSpaClick }
        };
      case 'executive-lounge':
        return {
          hours: '24/7 Access for Suite Guests',
          details: ['Discreet soundproof video meeting booths', 'Selection of elite books & global news sheets', 'Premium coffee, high tea, and select digestifs', 'Secretarial and print support services'],
          cta: null
        };
      default:
        return {
          hours: '24/7 Available',
          details: ['Premium high-tier hospitality standard', 'Discreet operation', 'Seamless property integration'],
          cta: null
        };
    }
  };

  // Separate main items from sub row items
  const mainPool = facilities.find(f => f.id === 'azure-pool');
  const mainDining = facilities.find(f => f.id === 'gourmet-dining');
  const mainSpa = facilities.find(f => f.id === 'wellness-spa');
  const mainLounge = facilities.find(f => f.id === 'executive-lounge');
  
  const bottomGridItems = facilities.filter(f => !f.isMain && f.id !== 'gourmet-dining' && f.id !== 'wellness-spa');

  return (
    <section id="facilities" className="bg-brand-charcoal py-20 px-6 md:px-12 lg:px-24 border-b border-brand-cream-dark relative">
      <div className="bg-grid opacity-30"></div>
      <div className="glow-orb top-[20%] right-[-100px] opacity-30"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Grid Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-brand-gold"></span>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold font-bold">
                AMENITIES
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-primary">
              Premium Facilities
            </h2>
          </div>
          
          <button 
            onClick={() => setSelectedFacility(facilities[0])}
            className="border-b border-brand-gold text-brand-gold hover:text-brand-primary hover:border-brand-primary transition-all duration-300 pb-1 self-start font-sans text-xs uppercase tracking-widest font-semibold"
            id="facilities-explore-all-btn"
          >
            Explore Detailed Specs
          </button>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="facilities-main-grid">
          
          {/* Main Huge Left Card: The Azure Pool (lg:col-span-8) */}
          {mainPool && (
            <motion.div 
              whileHover={{ y: -4 }}
              onClick={() => setSelectedFacility(mainPool)}
              className="lg:col-span-8 relative aspect-[16/10] md:aspect-[16/9] bg-brand-charcoal overflow-hidden group cursor-pointer border border-brand-gold/30 shadow-2xl"
              id="facility-azure-pool"
            >
              {/* Backing image with elegant gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/50 to-brand-charcoal/20 z-10 transition-opacity duration-300 group-hover:opacity-95" />
              <img 
                src={mainPool.image} 
                alt={mainPool.name} 
                className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Text Area */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 space-y-2 md:space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 backdrop-blur-sm flex items-center justify-center">
                    {renderIcon(mainPool.iconName, "w-4 h-4 text-brand-gold")}
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">
                    Signature Amenity
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-primary">
                  {mainPool.name}
                </h3>
                <p className="font-sans text-brand-cream-dim text-xs md:text-sm max-w-xl font-light leading-relaxed">
                  {mainPool.description}
                </p>
              </div>

              {/* Top Right Specs Tag */}
              <div className="absolute top-4 right-4 bg-brand-gold text-brand-charcoal text-[10px] font-sans uppercase tracking-widest px-3 py-1.5 backdrop-blur-md font-bold z-20 neon-glow-btn">
                Lush Garden Setting
              </div>
            </motion.div>
          )}

          {/* Right Column (lg:col-span-4) - Dining & Spa Stack */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Gourmet Dining Card (Black bg, gold logo) */}
            {mainDining && (
              <motion.div 
                whileHover={{ y: -4 }}
                onClick={() => setSelectedFacility(mainDining)}
                className="bg-brand-charcoal/60 backdrop-blur-md text-brand-primary p-6 md:p-8 flex-1 flex flex-col justify-between cursor-pointer border border-brand-gold/30 hover:border-brand-gold transition-colors duration-300 group relative overflow-hidden"
                id="facility-gourmet-dining"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-charcoal border border-brand-gold/30 flex items-center justify-center">
                    {renderIcon(mainDining.iconName, "w-5 h-5 text-brand-gold")}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-brand-primary group-hover:text-brand-gold transition-colors duration-200">
                    {mainDining.name}
                  </h3>
                  <p className="font-sans text-brand-cream-dim text-xs md:text-sm font-light leading-relaxed">
                    {mainDining.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-brand-gold font-sans text-xs uppercase tracking-widest font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>View Details</span> <span>&rarr;</span>
                </div>
              </motion.div>
            )}

            {/* Wellness Spa Card (White bg, gold leaf logo) */}
            {mainSpa && (
              <motion.div 
                whileHover={{ y: -4 }}
                onClick={() => setSelectedFacility(mainSpa)}
                className="bg-brand-charcoal/60 backdrop-blur-md text-brand-primary p-6 md:p-8 flex-1 flex flex-col justify-between cursor-pointer border border-brand-gold/30 hover:border-brand-gold transition-colors duration-300 group relative"
                id="facility-wellness-spa"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-charcoal border border-brand-gold/30 flex items-center justify-center">
                    {renderIcon(mainSpa.iconName, "w-5 h-5 text-brand-gold")}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-brand-primary group-hover:text-brand-gold transition-colors duration-200">
                    {mainSpa.name}
                  </h3>
                  <p className="font-sans text-brand-cream-dim text-xs md:text-sm font-light leading-relaxed">
                    {mainSpa.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-brand-gold font-sans text-xs uppercase tracking-widest font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Book Treatment</span> <span>&rarr;</span>
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Bottom Row grid (Lounge + Wifi + Gym + Secure Parking + Concierge) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Executive Lounge (Image bg, wide card) */}
          {mainLounge && (
            <motion.div 
              whileHover={{ y: -4 }}
              onClick={() => setSelectedFacility(mainLounge)}
              className="lg:col-span-2 relative min-h-[160px] bg-brand-charcoal overflow-hidden p-6 flex flex-col justify-end group cursor-pointer border border-brand-gold/30 shadow-md"
              id="facility-executive-lounge"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/70 to-transparent z-10" />
              <img 
                src={mainLounge.image} 
                alt={mainLounge.name} 
                className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-20 space-y-1.5">
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">24H Access</span>
                <h4 className="font-serif text-lg text-brand-primary group-hover:text-brand-gold transition-colors duration-200">{mainLounge.name}</h4>
                <p className="font-sans text-brand-cream-dim text-[11px] leading-relaxed max-w-sm font-light truncate">
                  {mainLounge.description}
                </p>
              </div>
            </motion.div>
          )}

          {/* Sub Row standard cards */}
          {bottomGridItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedFacility(item)}
              className="bg-brand-charcoal/40 p-6 flex flex-col justify-between min-h-[160px] cursor-pointer border border-brand-gold/15 hover:border-brand-gold/40 transition-all duration-300 group"
              id={`facility-small-${item.id}`}
            >
              <div className="w-10 h-10 bg-brand-charcoal border border-brand-cream-dark flex items-center justify-center">
                {renderIcon(item.iconName, "w-5 h-5 text-brand-gold")}
              </div>
              <div className="space-y-1 mt-4">
                <h4 className="font-serif text-sm font-medium text-brand-primary group-hover:text-brand-gold transition-colors duration-200">
                  {item.name}
                </h4>
                <p className="font-sans text-brand-cream-dim text-[10px] leading-relaxed font-light line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>

      {/* Facility Specs Detail Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <div className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-brand-charcoal border border-brand-gold/40 w-full max-w-2xl overflow-hidden relative shadow-2xl text-brand-primary backdrop-blur-md"
              id="facility-detail-modal"
            >
              {/* Image Banner if exists */}
              {selectedFacility.image && (
                <div className="h-56 w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent z-10" />
                  <img 
                    src={selectedFacility.image} 
                    alt={selectedFacility.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Content area */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {renderIcon(selectedFacility.iconName, "w-5 h-5 text-brand-gold")}
                      <span className="font-sans text-[10px] uppercase tracking-widest text-brand-gold font-bold">Premium Amenity Specs</span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-brand-primary">{selectedFacility.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedFacility(null)}
                    className="p-1.5 hover:bg-brand-cream-dark transition-colors duration-200 text-brand-cream-dim hover:text-white rounded-full border border-brand-cream-dark"
                    id="close-facility-modal-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Description */}
                <p className="font-sans text-brand-cream-dim text-sm leading-relaxed font-light">
                  {selectedFacility.description}
                </p>

                {/* Grid of details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-brand-cream-dark">
                  
                  {/* Hours */}
                  <div className="space-y-2">
                    <h5 className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" /> Operating Hours
                    </h5>
                    <p className="font-sans text-sm font-semibold text-brand-primary">
                      {getFacilityExtraInfo(selectedFacility.id).hours}
                    </p>
                  </div>

                  {/* Standard Inclusion */}
                  <div className="space-y-2">
                    <h5 className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-brand-gold" /> Service Standards
                    </h5>
                    <p className="font-sans text-xs text-brand-cream-dim/80 leading-relaxed font-light">
                      Complimentary premium check-in inclusion for all Portland Suites in-house residents.
                    </p>
                  </div>

                </div>

                {/* Bullet details list */}
                <div className="space-y-2">
                  <h5 className="font-sans text-xs uppercase tracking-widest text-brand-gold font-bold">
                    Key Features
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {getFacilityExtraInfo(selectedFacility.id).details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-brand-cream-dim font-sans">
                        <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialty Action CTA Button (e.g. book spa) */}
                {getFacilityExtraInfo(selectedFacility.id).cta && (
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        const cta = getFacilityExtraInfo(selectedFacility.id).cta;
                        if (cta) {
                          cta.action();
                          setSelectedFacility(null);
                        }
                      }}
                      className="bg-brand-gold text-brand-charcoal hover:bg-brand-primary hover:text-brand-charcoal transition-all duration-300 px-6 py-3 text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-brand-gold neon-glow-btn cursor-pointer"
                      id="facility-modal-action-btn"
                    >
                      <CalendarRange className="w-4 h-4" />
                      {getFacilityExtraInfo(selectedFacility.id).cta?.text}
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
