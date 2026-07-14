import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Star, Compass, Trash2, CheckCircle2, User, 
  MessageSquare, History, PlusCircle, PenSquare, ArrowUpRight 
} from 'lucide-react';
import { Booking, Room, Review } from '../types';

interface DashboardProps {
  bookings: Booking[];
  reviews: Review[];
  rooms: Room[];
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking: (id: string) => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'date'>) => void;
  userEmail?: string;
}

export default function Dashboard({ 
  bookings, reviews, rooms, isOpen, onClose, onCancelBooking, onSubmitReview, userEmail 
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'stays' | 'feedback'>('stays');

  // New review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRoomId, setReviewRoomId] = useState(rooms[0]?.id || '');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Formatting helpers
  const formatNaira = (num: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRoom = rooms.find(r => r.id === reviewRoomId);
    if (!selectedRoom) return;

    onSubmitReview({
      name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      suiteType: selectedRoom.name
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewName('');
      setReviewRating(5);
      setReviewComment('');
      setActiveTab('stays'); // Flip back to stays
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-charcoal/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-charcoal border border-brand-gold/40 w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh] text-brand-primary backdrop-blur-md"
        id="dashboard-container"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 bg-brand-charcoal text-brand-gold hover:bg-brand-gold hover:text-brand-charcoal p-1.5 transition-all duration-200 border border-brand-gold/30 rounded-full"
          id="close-dashboard-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dashboard Header Banner */}
        <div className="bg-brand-charcoal text-brand-cream p-6 md:p-8 shrink-0 relative overflow-hidden border-b border-brand-gold/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin" /> GUEST PORTAL
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold">My Stay & Bookings</h3>
            <p className="font-sans text-[11px] text-brand-cream-dim/75">
              Logged in as: <strong className="text-brand-primary">{userEmail || 'mikhaildike39@gmail.com'}</strong>
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-brand-gold/20 bg-brand-charcoal shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('stays')}
            className={`flex-1 py-3.5 font-sans uppercase tracking-widest font-bold border-b-2 text-center transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'stays' ? 'border-brand-gold text-brand-gold bg-brand-charcoal/80' : 'border-transparent text-brand-cream-dim/50 hover:text-brand-primary'}`}
            id="tab-stays-btn"
          >
            <History className="w-4 h-4" /> Active Reservations ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-3.5 font-sans uppercase tracking-widest font-bold border-b-2 text-center transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'feedback' ? 'border-brand-gold text-brand-gold bg-brand-charcoal/80' : 'border-transparent text-brand-cream-dim/50 hover:text-brand-primary'}`}
            id="tab-feedback-btn"
          >
            <PenSquare className="w-4 h-4" /> Write Premium Review
          </button>
        </div>

        {/* Dynamic Content Pane */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-brand-charcoal/30">
          <AnimatePresence mode="wait">
            
            {/* STAYS TAB */}
            {activeTab === 'stays' && (
              <motion.div
                key="stays"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                id="dashboard-stays-tab"
              >
                {bookings.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-12 h-12 bg-brand-charcoal/85 border border-brand-gold/25 rounded-full flex items-center justify-center mx-auto text-brand-gold">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg font-medium text-brand-primary">No Scheduled Stays</h4>
                      <p className="font-sans text-xs text-brand-cream-dim max-w-sm mx-auto">
                        Your itinerary is empty. Select a room category to lock-in your personalized boutique experience.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div 
                        key={booking.id}
                        className={`border p-5 relative transition-all duration-300 ${booking.status === 'cancelled' ? 'border-brand-cream-dark opacity-40 bg-brand-charcoal/40' : 'border-brand-gold/25 bg-brand-charcoal/80 shadow-2xl'}`}
                      >
                        {/* Status Stamp */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5">
                          {booking.status === 'confirmed' ? (
                            <span className="bg-green-950/80 text-green-400 border border-green-500/40 text-[9px] uppercase tracking-wider font-bold px-2 py-1 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                              CONFIRMED
                            </span>
                          ) : (
                            <span className="bg-red-950/80 text-red-400 border border-red-500/40 text-[9px] uppercase tracking-wider font-bold px-2 py-1 shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                              CANCELLED
                            </span>
                          )}
                        </div>

                        {/* Room header & Price */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-brand-cream-dark/30 pb-3.5 mb-3.5">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Portland Boutique Stay</span>
                            <h4 className="font-serif text-lg font-semibold text-brand-primary flex items-center gap-2">
                              {booking.room.name}
                              <a href="#suites" onClick={onClose} className="text-brand-gold/40 hover:text-brand-gold animate-pulse" title="View details">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </h4>
                          </div>
                          <div className="sm:text-right">
                            <span className="text-[9px] text-brand-cream-dim/60 block font-bold">TOTAL ESCROW</span>
                            <span className="font-serif text-base font-bold text-brand-gold">{formatNaira(booking.totalPrice)}</span>
                          </div>
                        </div>

                        {/* Calendar Dates & Guests */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-[9px] uppercase text-brand-gold/80 block font-bold">Check-in Date</span>
                            <span className="font-sans font-medium text-brand-primary">{booking.checkIn}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase text-brand-gold/80 block font-bold">Check-out Date</span>
                            <span className="font-sans font-medium text-brand-primary">{booking.checkOut}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase text-brand-gold/80 block font-bold">Guest Register</span>
                            <span className="font-sans font-medium text-brand-primary">{booking.guestName}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase text-brand-gold/80 block font-bold">Inhabitants</span>
                            <span className="font-sans font-medium text-brand-primary">{booking.guests} Guests</span>
                          </div>
                        </div>

                        {/* Special request indicators */}
                        {booking.specialRequests && (
                          <div className="mt-3.5 pt-3.5 border-t border-brand-cream-dark/30 text-xs text-brand-cream-dim/80 leading-relaxed font-light font-sans">
                            <strong className="text-brand-primary">Upgrades & Notes:</strong> {booking.specialRequests}
                          </div>
                        )}

                        {/* Cancel stay trigger */}
                        {booking.status === 'confirmed' && (
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => {
                                if (window.confirm('Are you absolutely sure you wish to cancel this booking? This action can only be reversed by calling our 24H desk.')) {
                                  onCancelBooking(booking.id);
                                }
                              }}
                              className="text-red-400 hover:text-red-300 hover:bg-red-950/40 p-2 px-3 text-xs font-sans uppercase tracking-widest font-bold flex items-center gap-1.5 transition-all duration-200 border border-transparent hover:border-red-500/20 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Cancel Reservation
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* FEEDBACK TAB */}
            {activeTab === 'feedback' && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                id="dashboard-feedback-tab"
              >
                {reviewSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-12 h-12 bg-brand-gold/15 border border-brand-gold rounded-full flex items-center justify-center mx-auto text-brand-gold">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg font-medium text-brand-primary">Review Registered Successfully</h4>
                      <p className="font-sans text-xs text-brand-cream-dim">
                        Thank you! Your feedback helps us maintain pristine luxury standards.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-5">
                    
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg font-semibold text-brand-gold">Share Your Portland Experience</h4>
                      <p className="font-sans text-xs text-brand-cream-dim font-light">
                        Your rating and critique will be posted live on our landing feed to guide future premium residents.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-brand-cream-dim/80 block font-bold">Your Name</label>
                        <input
                          type="text"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="E.g., Dr. Chinedu O."
                          className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/20 p-2.5 focus:outline-none focus:border-brand-gold font-medium w-full"
                          required
                        />
                      </div>

                      {/* Suite Selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase text-brand-cream-dim/80 block font-bold">Suite Experienced</label>
                        <select
                          value={reviewRoomId}
                          onChange={(e) => setReviewRoomId(e.target.value)}
                          className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/20 p-2.5 focus:outline-none focus:border-brand-gold font-semibold w-full appearance-none cursor-pointer"
                        >
                          {rooms.map(room => (
                            <option key={room.id} value={room.id} className="text-brand-primary bg-brand-charcoal">{room.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Star Rating selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-brand-cream-dim/80 block font-bold">Gold Star Rating</label>
                      <div className="flex items-center gap-1.5 bg-brand-charcoal border border-brand-gold/20 p-3 w-fit">
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const starVal = idx + 1;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setReviewRating(starVal)}
                              className="p-1 text-brand-gold hover:scale-110 transition-transform duration-100 cursor-pointer"
                            >
                              <Star className={`w-6 h-6 ${starVal <= reviewRating ? 'fill-brand-gold text-brand-gold' : 'text-brand-cream-dark'}`} />
                            </button>
                          );
                        })}
                        <span className="font-sans text-xs font-bold text-brand-gold ml-2">{reviewRating}.0 / 5.0</span>
                      </div>
                    </div>

                    {/* Feedback content */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-brand-cream-dim/80 block font-bold">Detailed Critique</label>
                      <textarea
                        rows={4}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Detail your opinion on our structural elements, room service, pool environment, and personalized desk hospitality..."
                        className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/20 p-3 focus:outline-none focus:border-brand-gold font-medium w-full resize-none"
                        required
                      />
                    </div>

                    {/* Submit Review btn */}
                    <div className="pt-3 flex justify-end">
                      <button
                        type="submit"
                        className="bg-brand-gold hover:bg-brand-primary text-brand-charcoal transition-all duration-300 px-8 py-3.5 text-xs font-sans uppercase tracking-[0.2em] font-bold neon-glow-btn cursor-pointer"
                        id="submit-review-btn"
                      >
                        Publish Live Review
                      </button>
                    </div>

                  </form>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
