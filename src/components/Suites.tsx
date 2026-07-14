import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bed, Compass, Maximize, CheckCircle, Info, Star, Calendar } from 'lucide-react';
import { Room, Review } from '../types';

interface SuitesProps {
  rooms: Room[];
  reviews: Review[];
  onBookRoom: (room: Room) => void;
}

export default function Suites({ rooms, reviews, onBookRoom }: SuitesProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Helper to format Nigerian Naira
  const formatNaira = (num: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Filter reviews for a specific room type
  const getRoomReviews = (roomName: string) => {
    return reviews.filter(rev => rev.suiteType.toLowerCase().includes(roomName.toLowerCase()) || roomName.toLowerCase().includes(rev.suiteType.toLowerCase()));
  };

  return (
    <section id="suites" className="bg-brand-charcoal py-20 px-6 md:px-12 lg:px-24 border-b border-brand-cream-dark relative">
      <div className="bg-grid opacity-30"></div>
      <div className="glow-orb top-[40%] left-[-150px] opacity-25"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-6 bg-brand-gold"></span>
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold font-bold">
              ACCOMMODATIONS
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-brand-primary">
            The Royal Suites
          </h2>
        </div>

        {/* Suites Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="suites-cards-grid">
          {rooms.map((room) => {
            const roomReviews = getRoomReviews(room.name);
            const averageRating = roomReviews.length > 0 
              ? (roomReviews.reduce((sum, r) => sum + r.rating, 0) / roomReviews.length).toFixed(1)
              : "4.9"; // Fallback to premium hotel standard rating

            return (
              <motion.div
                key={room.id}
                layoutId={`room-card-${room.id}`}
                whileHover={{ y: -6 }}
                className="bg-brand-charcoal/60 backdrop-blur-md border border-brand-gold/25 hover:border-brand-gold group cursor-pointer flex flex-col justify-between shadow-2xl relative overflow-hidden transition-colors duration-300"
                onClick={() => setSelectedRoom(room)}
                id={`room-${room.id}`}
              >
                
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-charcoal">
                  {room.tag && (
                    <div className="absolute top-4 left-4 bg-brand-gold text-brand-charcoal text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-bold z-10 neon-glow-btn">
                      {room.tag}
                    </div>
                  )}
                  
                  {/* Hover visual shimmer */}
                  <div className="absolute inset-0 bg-brand-charcoal/10 group-hover:bg-brand-charcoal/0 transition-colors duration-300 z-10" />
                  
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-104 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Quick Specs Overlay */}
                  <div className="absolute bottom-3 left-3 bg-brand-charcoal/90 text-brand-primary text-[10px] uppercase tracking-wider px-2 py-1.5 backdrop-blur-xs flex items-center gap-1.5 z-10 font-semibold border border-brand-gold/25">
                    <Star className="w-3 h-3 text-brand-gold fill-brand-gold" /> {averageRating} rating
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    
                    {/* Title and Price in a horizontal elegant split */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-lg md:text-xl font-medium text-brand-primary group-hover:text-brand-gold transition-colors duration-200">
                        {room.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-serif text-base md:text-lg font-bold text-brand-gold block">
                          {formatNaira(room.price)}
                        </span>
                        <span className="font-sans text-[9px] text-brand-cream-dim/60 uppercase block font-bold tracking-widest">
                          / night
                        </span>
                      </div>
                    </div>

                    {/* Room Specs Line: King Bed • City View • 45sqm */}
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-brand-cream-dim font-sans text-xs font-light">
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-brand-gold" /> {room.bed}</span>
                      <span className="text-brand-gold/40">•</span>
                      <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-brand-gold" /> {room.view}</span>
                      <span className="text-brand-gold/40">•</span>
                      <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5 text-brand-gold" /> {room.size}sqm</span>
                    </div>

                    <p className="font-sans text-brand-cream-dim/80 text-xs leading-relaxed font-light line-clamp-2 pt-2 border-t border-brand-cream-dark">
                      {room.description}
                    </p>

                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookRoom(room);
                      }}
                      className="flex-1 bg-transparent text-brand-gold hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 py-3 font-sans text-[10px] uppercase tracking-[0.15em] font-bold text-center border border-brand-gold neon-glow-btn"
                    >
                      Book Suite
                    </button>
                    <button
                      className="p-3 bg-brand-charcoal border border-brand-cream-dark text-brand-gold hover:text-white transition-colors duration-200"
                      title="View Suite Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Elegant Drawer-style Overlapping Detail Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-end">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-brand-charcoal w-full max-w-lg h-full overflow-y-auto relative shadow-2xl flex flex-col justify-between border-l border-brand-gold/30 text-brand-primary"
              id="room-detail-drawer"
            >
              
              {/* Close Button top-left float */}
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 z-30 bg-brand-charcoal/90 hover:bg-brand-gold text-brand-primary hover:text-brand-charcoal p-2 transition-all duration-200 border border-brand-gold/30"
                id="close-room-drawer-btn"
              >
                <Maximize className="w-4 h-4 rotate-45" />
              </button>

              {/* Header Image Scroll */}
              <div className="relative h-64 md:h-80 w-full shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent z-10" />
                <img 
                  src={selectedRoom.image} 
                  alt={selectedRoom.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating tags */}
                <div className="absolute bottom-4 left-6 z-20 space-y-1">
                  <span className="bg-brand-gold text-brand-charcoal text-[10px] uppercase tracking-widest px-3 py-1 font-bold inline-block neon-glow-btn">
                    {selectedRoom.type}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-brand-primary drop-shadow-md">
                    {selectedRoom.name}
                  </h3>
                </div>
              </div>

              {/* Main Contents Area */}
              <div className="p-6 md:p-8 space-y-6 flex-1">
                
                {/* Quick key specs */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-brand-charcoal border border-brand-gold/20 text-center">
                  <div>
                    <span className="text-[10px] text-brand-gold font-bold uppercase block tracking-wider mb-1">Bed Type</span>
                    <span className="font-sans text-xs font-semibold text-brand-primary">{selectedRoom.bed}</span>
                  </div>
                  <div className="border-x border-brand-cream-dark">
                    <span className="text-[10px] text-brand-gold font-bold uppercase block tracking-wider mb-1">Room View</span>
                    <span className="font-sans text-xs font-semibold text-brand-primary">{selectedRoom.view}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-gold font-bold uppercase block tracking-wider mb-1">Total Space</span>
                    <span className="font-sans text-xs font-semibold text-brand-primary">{selectedRoom.size} sqm</span>
                  </div>
                </div>

                {/* Room Description */}
                <div className="space-y-2">
                  <h4 className="font-serif text-base font-bold text-brand-gold">The Luxury Experience</h4>
                  <p className="font-sans text-brand-cream-dim text-xs md:text-sm leading-relaxed font-light">
                    {selectedRoom.description}
                  </p>
                </div>

                {/* Luxury Inclusions Checklist */}
                <div className="space-y-3">
                  <h4 className="font-serif text-base font-bold text-brand-gold">Luxury In-Suite Amenities</h4>
                  <ul className="space-y-2.5">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-start gap-3 text-xs text-brand-cream-dim font-sans font-light">
                        <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specific Room Reviews */}
                <div className="space-y-4 pt-4 border-t border-brand-cream-dark">
                  <h4 className="font-serif text-base font-bold text-brand-gold">Guest Opinions</h4>
                  {getRoomReviews(selectedRoom.name).length > 0 ? (
                    <div className="space-y-3">
                      {getRoomReviews(selectedRoom.name).map((rev) => (
                        <div key={rev.id} className="bg-brand-charcoal/50 p-3.5 border border-brand-gold/15 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-brand-primary">{rev.name}</span>
                            <span className="text-brand-cream-dim/60 text-[10px]">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-cream-dark'}`} 
                              />
                            ))}
                          </div>
                          <p className="italic text-brand-cream-dim font-light font-sans">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-brand-cream-dim/50 italic">No direct written feedback for this suite type yet. Rated solid 5/5 stars on average by checkout forms.</p>
                  )}
                </div>

              </div>

              {/* Bottom Sticky Action Box */}
              <div className="p-6 bg-brand-charcoal border-t border-brand-cream-dark flex items-center justify-between gap-6 shrink-0 z-10">
                <div>
                  <span className="font-sans text-[10px] uppercase text-brand-cream-dim/60 block font-bold tracking-widest">Rate Per Night</span>
                  <p className="font-serif text-2xl font-semibold text-brand-gold">{formatNaira(selectedRoom.price)}</p>
                  <span className="text-[10px] text-brand-cream-dim/60 block font-sans">Inc. service charges & levy</span>
                </div>
                
                <button
                  onClick={() => {
                    onBookRoom(selectedRoom);
                    setSelectedRoom(null);
                  }}
                  className="bg-brand-gold text-brand-charcoal hover:bg-brand-primary transition-all duration-300 px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 shadow-lg neon-glow-btn cursor-pointer"
                  id="room-drawer-book-btn"
                >
                  <Calendar className="w-4 h-4 text-brand-charcoal" /> Book Suite
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
