import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, Quote, Heart, Calendar, Clock, MapPin } from 'lucide-react';

import { Room, Booking, Review } from './types';
import { ROOMS, FACILITIES, REVIEWS } from './data';

import Header from './components/Header';
import Hero from './components/Hero';
import Story from './components/Story';
import Facilities from './components/Facilities';
import Suites from './components/Suites';
import BookingModal from './components/BookingModal';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

export default function App() {
  // State for persistent data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // UI state managers
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);

  // Initialize data from LocalStorage
  useEffect(() => {
    // Seed data generator for bookings
    const getSeedBooking = (): Booking => ({
      id: 'booking-seed-1',
      room: ROOMS[0], // Royal Executive Suite
      checkIn: '2026-07-20',
      checkOut: '2026-07-23',
      guests: 2,
      guestName: 'Mikhail Dike',
      guestEmail: 'mikhaildike39@gmail.com',
      guestPhone: '+234 800 123 4567',
      specialRequests: 'Prefers city skyline views and extra down-feather pillows. Airport pickup requested.',
      totalPrice: 435000,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    });

    // 1. Safe Get Bookings
    try {
      const storedBookings = localStorage.getItem('portland_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        const seed = getSeedBooking();
        setBookings([seed]);
        localStorage.setItem('portland_bookings', JSON.stringify([seed]));
      }
    } catch (e) {
      console.warn("Failed to parse bookings from localStorage, resetting...", e);
      const seed = getSeedBooking();
      setBookings([seed]);
      localStorage.setItem('portland_bookings', JSON.stringify([seed]));
    }

    // 2. Safe Get Reviews
    try {
      const storedReviews = localStorage.getItem('portland_reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        setReviews(REVIEWS);
        localStorage.setItem('portland_reviews', JSON.stringify(REVIEWS));
      }
    } catch (e) {
      console.warn("Failed to parse reviews from localStorage, resetting...", e);
      setReviews(REVIEWS);
      localStorage.setItem('portland_reviews', JSON.stringify(REVIEWS));
    }
  }, []);

  // Sync state helpers to write back to local storage
  const saveBookingsToStorage = (updatedBookings: Booking[]) => {
    setBookings(updatedBookings);
    localStorage.setItem('portland_bookings', JSON.stringify(updatedBookings));
  };

  const saveReviewsToStorage = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('portland_reviews', JSON.stringify(updatedReviews));
  };

  // ACTIONS
  const handleQuickSearch = (checkIn: string, checkOut: string, guests: number, roomId: string) => {
    const matchedRoom = ROOMS.find(r => r.id === roomId) || ROOMS[0];
    setBookingRoom(matchedRoom);
    setIsBookingOpen(true);
  };

  const handleBookRoom = (room: Room) => {
    setBookingRoom(room);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: 'PS-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const newBookingsList = [newBooking, ...bookings];
    saveBookingsToStorage(newBookingsList);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b);
    saveBookingsToStorage(updated);
  };

  const handleSubmitReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newReview: Review = {
      ...reviewData,
      id: 'rev-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: formattedDate
    };

    const updatedReviewsList = [newReview, ...reviews];
    saveReviewsToStorage(updatedReviewsList);
  };

  // Header & Navigation Scroll actions
  const scrollToSuites = () => {
    const el = document.getElementById('suites');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFacilities = () => {
    const el = document.getElementById('facilities');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeBookingCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal selection:bg-brand-gold selection:text-brand-cream flex flex-col justify-between">
      
      {/* 1. Header Navigation Bar */}
      <Header 
        onBookClick={() => {
          setBookingRoom(ROOMS[0]);
          setIsBookingOpen(true);
        }}
        onDashboardClick={() => setIsDashboardOpen(true)}
        bookingCount={activeBookingCount}
      />

      {/* Main Page Layout modules */}
      <main className="flex-grow">
        
        {/* 2. Hero Interactive Greeting & Quick Calendar Engine */}
        <Hero 
          rooms={ROOMS}
          onReserveClick={() => {
            setBookingRoom(ROOMS[0]);
            setIsBookingOpen(true);
          }}
          onQuickSearch={handleQuickSearch}
        />

        {/* 3. Story Section with Est. 2024 decoration */}
        <Story />

        {/* 4. Premium Facilities Details & Modal specs */}
        <Facilities 
          facilities={FACILITIES}
          onBookSpaClick={() => {
            // Pre-select room and open booking modal, pre-set spa requests
            setBookingRoom(ROOMS[1]); // Diplomatic Suite fits Spa vibe
            setIsBookingOpen(true);
          }}
          onBookDiningClick={() => {
            setBookingRoom(ROOMS[0]); // Royal Executive
            setIsBookingOpen(true);
          }}
        />

        {/* 5. Accommodations and Royal Suites Showcase Grid */}
        <Suites 
          rooms={ROOMS}
          reviews={reviews}
          onBookRoom={handleBookRoom}
        />

        {/* 6. Testimonials Feedback live feed showcase */}
        <section id="reviews" className="bg-brand-cream-low py-20 px-6 md:px-12 lg:px-24 border-b border-brand-cream-dark relative overflow-hidden">
          {/* Decorative subtle visual */}
          <div className="absolute left-10 bottom-10 w-44 h-44 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header copy */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-6 bg-brand-gold"></span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold font-bold">GUEST OPINIONS</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-primary">
                  Published Resident Reviews
                </h2>
              </div>

              <button
                onClick={() => setIsDashboardOpen(true)}
                className="bg-brand-charcoal text-brand-cream hover:bg-brand-gold transition-colors duration-200 px-5 py-3 text-[10px] uppercase tracking-widest font-bold self-start flex items-center gap-2"
                id="testimonial-add-feedback-btn"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-gold" /> Post Live Review
              </button>
            </div>

            {/* Testimonials Grid (Staggered or masonry layout style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
              {reviews.slice(0, 6).map((rev) => (
                <div 
                  key={rev.id}
                  className="bg-brand-cream-lowest border border-brand-gold/10 p-6 flex flex-col justify-between shadow-sm relative group hover:border-brand-gold/30 transition-all duration-300"
                >
                  <Quote className="absolute right-6 top-6 w-8 h-8 text-brand-gold/10" />
                  
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-4 h-4 ${idx < Math.floor(rev.rating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-cream-dim'}`} 
                        />
                      ))}
                    </div>

                    <p className="font-sans text-brand-charcoal/85 text-xs md:text-sm leading-relaxed font-light italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Reviewer info row */}
                  <div className="mt-6 pt-4 border-t border-brand-cream-dark flex items-center justify-between">
                    <div>
                      <p className="font-serif text-sm font-semibold text-brand-primary">{rev.name}</p>
                      <p className="font-sans text-[10px] text-brand-gold uppercase tracking-wider font-bold">
                        Stayed in {rev.suiteType}
                      </p>
                    </div>
                    <span className="font-sans text-[10px] text-brand-charcoal/40 font-medium">
                      {rev.date}
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* 7. Beautiful Luxury Footer */}
      <Footer 
        onSuiteClick={scrollToSuites}
        onFacilitiesClick={scrollToFacilities}
        onAboutClick={scrollToAbout}
        onDashboardClick={() => setIsDashboardOpen(true)}
      />

      {/* OVERLAY WIDGETS & MODAL CHEST */}

      {/* 8. Booking Engine Reservation checkout panel */}
      <BookingModal 
        room={bookingRoom}
        rooms={ROOMS}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* 9. Guest Dashboard (stays record cancellation, submit critiques) */}
      <Dashboard 
        bookings={bookings}
        reviews={reviews}
        rooms={ROOMS}
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onCancelBooking={handleCancelBooking}
        onSubmitReview={handleSubmitReview}
      />

    </div>
  );
}
