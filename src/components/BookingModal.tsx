import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Users, MapPin, CheckSquare, Square, CreditCard, 
  Sparkles, Shield, Compass, CheckCircle, Car, Sparkle, Loader2 
} from 'lucide-react';
import { Room, Booking } from '../types';

interface BookingModalProps {
  room: Room | null;
  rooms: Room[];
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
}

export default function BookingModal({ room, rooms, isOpen, onClose, onConfirmBooking }: BookingModalProps) {
  // Booking states
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(room);
  
  // Setup dates
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const initialCheckOut = new Date();
  initialCheckOut.setDate(today.getDate() + 3);
  const initialCheckOutStr = initialCheckOut.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(tomorrowStr);
  const [checkOut, setCheckOut] = useState(initialCheckOutStr);
  const [guests, setGuests] = useState(1);

  // Luxury Add-ons
  const [addOnAirportPickup, setAddOnAirportPickup] = useState(false);
  const [addOnChampagne, setAddOnChampagne] = useState(false);
  const [addOnButler, setAddOnButler] = useState(false);

  // Guest Info
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Sync selected room when prop changes
  useEffect(() => {
    if (room) {
      setSelectedRoom(room);
    }
  }, [room]);

  // Calculations
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const roomCost = selectedRoom ? selectedRoom.price * nights : 0;
  
  // Add-on calculations (flat or nightly depending on type)
  const airportCost = addOnAirportPickup ? 45000 : 0; // Flat
  const champagneCost = addOnChampagne ? 60000 : 0; // Flat
  const butlerCost = addOnButler ? 80000 * nights : 0; // Nightly

  const subtotal = roomCost + airportCost + champagneCost + butlerCost;
  const vatRate = 0.075; // 7.5% Nigerian VAT
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  // Formatting helpers
  const formatNaira = (num: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Reset form states
  const handleReset = () => {
    setIsSuccess(false);
    setGeneratedBookingId('');
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialRequests('');
    setAddOnAirportPickup(false);
    setAddOnChampagne(false);
    setAddOnButler(false);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    setIsSubmitting(true);

    // Simulate luxury booking processing animation (very pleasing!)
    setTimeout(() => {
      const code = 'PS-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      onConfirmBooking({
        room: selectedRoom,
        checkIn,
        checkOut,
        guests,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests: [
          specialRequests,
          addOnAirportPickup ? 'Requested Luxury SUV Airport Pickup (+N45,000)' : '',
          addOnChampagne ? 'Requested Premium Champagne Welcome Spray (+N60,000)' : '',
          addOnButler ? 'Requested Dedicated Butler Service' : ''
        ].filter(Boolean).join('. '),
        totalPrice: total
      });

      setGeneratedBookingId(code);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-charcoal/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <AnimatePresence mode="wait">
        
        {/* SUCCESS PANEL */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-brand-charcoal border border-brand-gold/40 w-full max-w-lg p-8 md:p-10 text-center space-y-6 shadow-2xl relative text-brand-primary backdrop-blur-md"
            id="booking-success-panel"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-brand-gold/15 border border-brand-gold flex items-center justify-center rounded-full text-brand-gold animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold">RESERVATION SECURED</span>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-brand-primary">Your Private Escape Awaits</h3>
              <p className="font-sans text-xs text-brand-cream-dim/85">
                A booking confirmation receipt has been issued and sent directly to <strong className="text-brand-primary">{guestEmail}</strong>.
              </p>
            </div>

            {/* Booking Slip Card */}
            <div className="bg-brand-charcoal/60 border border-brand-gold/20 p-5 text-left space-y-3.5 relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-gold/30" />
              
              <div className="flex justify-between items-center border-b border-brand-cream-dark pb-3">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-brand-gold/70 block font-bold">RESERVATION ID</span>
                  <span className="font-mono text-sm font-bold text-brand-gold">{generatedBookingId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-brand-gold/70 block font-bold">TOTAL CHARGE</span>
                  <span className="font-serif text-sm font-bold text-brand-primary">{formatNaira(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[9px] uppercase text-brand-cream-dim/60 block font-bold">SUITE SELECTION</span>
                  <span className="font-sans font-medium text-brand-primary">{selectedRoom?.name}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-brand-cream-dim/60 block font-bold">GUESTS</span>
                  <span className="font-sans font-medium text-brand-primary">{guests} Guests</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-brand-cream-dim/60 block font-bold">CHECK-IN</span>
                  <span className="font-sans font-medium text-brand-primary">{checkIn}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-brand-cream-dim/60 block font-bold">CHECK-OUT</span>
                  <span className="font-sans font-medium text-brand-primary">{checkOut}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-cream-dark flex items-start gap-2 text-[10px] text-brand-cream-dim/80 leading-relaxed font-light">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                <span>No. 3 Alkhum Close, off Lingu Crescent, Wuse II, Abuja. Complimentary Valet check-in opens at 2:00 PM.</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                className="flex-1 bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-charcoal transition-colors duration-200 py-3 text-xs uppercase tracking-widest font-bold neon-glow-btn cursor-pointer"
                id="success-close-btn"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        ) : (
          
          /* BOOKING FORM BODY */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-brand-charcoal border border-brand-gold/40 w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative text-brand-primary backdrop-blur-md"
            id="checkout-form-container"
          >
            {/* Close button on absolute top-right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-35 bg-brand-charcoal hover:bg-brand-gold text-brand-gold hover:text-brand-charcoal p-1.5 transition-all duration-200 border border-brand-gold/30 rounded-full"
              id="close-booking-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LEFT SIDE: PRICE CALCULATION SUMMARY */}
            <div className="w-full md:w-[42%] bg-brand-charcoal/95 text-brand-primary p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-gold/20 overflow-y-auto">
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> RESERVATION ESTIMATE
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold">Booking Details</h3>
                </div>

                {/* Dropdown to switch suite directly inside reservation */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-brand-gold font-bold block">Suite Category</label>
                  <select
                    value={selectedRoom?.id || ''}
                    onChange={(e) => {
                      const found = rooms.find(r => r.id === e.target.value);
                      if (found) setSelectedRoom(found);
                    }}
                    className="bg-brand-charcoal text-brand-primary border border-brand-gold/30 p-2.5 text-xs focus:outline-none focus:border-brand-gold w-full appearance-none cursor-pointer font-semibold"
                  >
                    {rooms.map(r => (
                      <option key={r.id} value={r.id} className="text-brand-primary bg-brand-charcoal font-semibold">
                        {r.name} — {formatNaira(r.price)}/night
                      </option>
                    ))}
                  </select>
                </div>

                {/* Specific features brief info */}
                {selectedRoom && (
                  <div className="p-3 bg-brand-charcoal border border-brand-gold/20 space-y-1.5 text-xs text-brand-cream-dim">
                    <p className="font-semibold text-brand-primary">{selectedRoom.name}</p>
                    <p className="font-light text-[11px] leading-relaxed line-clamp-2">{selectedRoom.description}</p>
                    <div className="flex gap-4 text-[10px] font-mono text-brand-gold pt-1">
                      <span>{selectedRoom.bed}</span>
                      <span>{selectedRoom.size}sqm</span>
                      <span>{selectedRoom.view}</span>
                    </div>
                  </div>
                )}

                {/* Date Check-ins overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] uppercase text-brand-gold/80 block font-bold">CHECK-IN</span>
                    <span className="font-sans text-xs text-brand-primary font-medium">{checkIn}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-brand-gold/80 block font-bold">CHECK-OUT</span>
                    <span className="font-sans text-xs text-brand-primary font-medium">{checkOut}</span>
                  </div>
                </div>

                {/* Line Item Pricing breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-brand-cream-dark text-xs">
                  
                  {/* Suite Cost */}
                  <div className="flex justify-between">
                    <span className="text-brand-cream-dim">
                      {selectedRoom?.name} ({nights} {nights === 1 ? 'night' : 'nights'})
                    </span>
                    <span>{formatNaira(roomCost)}</span>
                  </div>

                  {/* Airport pickup */}
                  {addOnAirportPickup && (
                    <div className="flex justify-between text-brand-gold font-semibold">
                      <span>Airport Pickup (Luxury SUV)</span>
                      <span>+ {formatNaira(airportCost)}</span>
                    </div>
                  )}

                  {/* Champagne Greeting */}
                  {addOnChampagne && (
                    <div className="flex justify-between text-brand-gold font-semibold">
                      <span>Champagne Welcome Amenity</span>
                      <span>+ {formatNaira(champagneCost)}</span>
                    </div>
                  )}

                  {/* Butler service */}
                  {addOnButler && (
                    <div className="flex justify-between text-brand-gold font-semibold">
                      <span>Dedicated Butler Service ({nights} nights)</span>
                      <span>+ {formatNaira(butlerCost)}</span>
                    </div>
                  )}

                  {/* VAT */}
                  <div className="flex justify-between pt-1 text-[11px] text-brand-cream-dim/50">
                    <span>Nigerian Hospitality VAT (7.5%)</span>
                    <span>{formatNaira(vat)}</span>
                  </div>

                </div>
              </div>

              {/* Sticky bottom total box */}
              <div className="pt-6 border-t border-brand-cream-dark space-y-2 mt-6 md:mt-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-brand-gold font-sans text-xs font-bold uppercase tracking-widest">Grand Total</span>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-brand-primary">
                    {formatNaira(total)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-brand-cream-dim/50 uppercase tracking-widest">
                  <Shield className="w-3.5 h-3.5 text-brand-gold" /> No booking fees. Free cancellation.
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: CUSTOMER INFO & ADD-ONS FORM */}
            <form 
              onSubmit={handleSubmit}
              className="w-full md:w-[58%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-brand-charcoal/40 text-brand-primary"
              id="booking-checkout-form"
            >
              <div className="space-y-6">
                
                {/* Section Header */}
                <div className="space-y-1 pt-4 md:pt-0">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">SECURE BOOKING PORTAL</span>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-brand-primary">Guest Registration</h3>
                </div>

                {/* Grid Inputs: Check-in, Check-out, Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-brand-cream-dark">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-brand-gold font-bold block">Check-in</label>
                    <input 
                      type="date" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={tomorrowStr}
                      className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/30 p-2 focus:outline-none focus:border-brand-gold font-semibold w-full"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-brand-gold font-bold block">Check-out</label>
                    <input 
                      type="date" 
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || tomorrowStr}
                      className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/30 p-2 focus:outline-none focus:border-brand-gold font-semibold w-full"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-brand-gold font-bold block">Guests count</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/30 p-2 focus:outline-none focus:border-brand-gold font-semibold w-full appearance-none cursor-pointer"
                    >
                      <option value="1" className="bg-brand-charcoal text-brand-primary">1 Resident</option>
                      <option value="2" className="bg-brand-charcoal text-brand-primary">2 Residents</option>
                      {selectedRoom && selectedRoom.maxGuests >= 3 && (
                        <option value="3" className="bg-brand-charcoal text-brand-primary">3 Residents</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-serif text-xs uppercase tracking-widest text-brand-gold font-bold">Resident Details</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-brand-cream-dim/80 block font-semibold">Full Name</label>
                      <input 
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Mikhail Dike"
                        className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/20 p-2.5 focus:outline-none focus:border-brand-gold font-medium w-full"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-brand-cream-dim/80 block font-semibold">Phone Number</label>
                      <input 
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+234 (0) 800 123 4567"
                        className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/20 p-2.5 focus:outline-none focus:border-brand-gold font-medium w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase text-brand-cream-dim/80 block font-semibold">Email Address</label>
                    <input 
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="mikhaildike39@gmail.com"
                      className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/20 p-2.5 focus:outline-none focus:border-brand-gold font-medium w-full"
                      required
                    />
                  </div>
                </div>

                {/* Exclusive Add-ons checklist */}
                <div className="space-y-3.5 pt-4 border-t border-brand-cream-dark">
                  <h4 className="font-serif text-xs uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
                    <Sparkle className="w-4 h-4 text-brand-gold animate-spin" /> Luxury Upgrades (Optional)
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Valet pickup */}
                    <div 
                      onClick={() => setAddOnAirportPickup(!addOnAirportPickup)}
                      className={`p-3 border cursor-pointer select-none transition-all duration-200 flex flex-col justify-between h-24 ${addOnAirportPickup ? 'border-brand-gold bg-brand-gold/15 shadow-[0_0_15px_rgba(0,229,255,0.15)]' : 'border-brand-gold/15 bg-brand-charcoal/50 hover:bg-brand-charcoal/80'}`}
                    >
                      <div className="flex items-start justify-between">
                        <Car className="w-4 h-4 text-brand-gold" />
                        {addOnAirportPickup ? <CheckSquare className="w-4 h-4 text-brand-gold" /> : <Square className="w-4 h-4 text-brand-cream-dim/30" />}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-sans text-[10px] font-bold text-brand-primary">Airport Pickup</p>
                        <p className="font-mono text-[9px] text-brand-gold">+N45,000</p>
                      </div>
                    </div>

                    {/* Champagne */}
                    <div 
                      onClick={() => setAddOnChampagne(!addOnChampagne)}
                      className={`p-3 border cursor-pointer select-none transition-all duration-200 flex flex-col justify-between h-24 ${addOnChampagne ? 'border-brand-gold bg-brand-gold/15 shadow-[0_0_15px_rgba(0,229,255,0.15)]' : 'border-brand-gold/15 bg-brand-charcoal/50 hover:bg-brand-charcoal/80'}`}
                    >
                      <div className="flex items-start justify-between">
                        <Sparkles className="w-4 h-4 text-brand-gold" />
                        {addOnChampagne ? <CheckSquare className="w-4 h-4 text-brand-gold" /> : <Square className="w-4 h-4 text-brand-cream-dim/30" />}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-sans text-[10px] font-bold text-brand-primary">Champagne greeting</p>
                        <p className="font-mono text-[9px] text-brand-gold">+N60,000</p>
                      </div>
                    </div>

                    {/* Private Butler */}
                    <div 
                      onClick={() => setAddOnButler(!addOnButler)}
                      className={`p-3 border cursor-pointer select-none transition-all duration-200 flex flex-col justify-between h-24 ${addOnButler ? 'border-brand-gold bg-brand-gold/15 shadow-[0_0_15px_rgba(0,229,255,0.15)]' : 'border-brand-gold/15 bg-brand-charcoal/50 hover:bg-brand-charcoal/80'}`}
                    >
                      <div className="flex items-start justify-between">
                        <Compass className="w-4 h-4 text-brand-gold" />
                        {addOnButler ? <CheckSquare className="w-4 h-4 text-brand-gold" /> : <Square className="w-4 h-4 text-brand-cream-dim/30" />}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-sans text-[10px] font-bold text-brand-primary">Private Butler</p>
                        <p className="font-mono text-[9px] text-brand-gold">+N80,000/nt</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-brand-cream-dim/80 block font-semibold">Special Accommodations / Dietary Demands</label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="E.g., early check-in, dietary constraints, feather-free pillows..."
                    className="bg-brand-charcoal text-brand-primary text-xs border border-brand-gold/20 p-2.5 focus:outline-none focus:border-brand-gold font-medium w-full resize-none"
                  />
                </div>

              </div>

              {/* Bottom Sticky Submit Block */}
              <div className="pt-6 border-t border-brand-cream-dark mt-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="text-xs text-brand-cream-dim/70 leading-relaxed font-light text-center sm:text-left">
                  By clicking "Confirm Stay", you authorize Portland Suites to register your credentials. Charges are fully settled upon physical desk check-out.
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedRoom}
                  className="w-full sm:w-auto bg-brand-gold hover:bg-brand-primary text-brand-charcoal transition-all duration-300 px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold shrink-0 flex items-center justify-center gap-2 neon-glow-btn cursor-pointer"
                  id="booking-confirm-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-brand-charcoal" />
                      Securing Stay...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 text-brand-charcoal" />
                      Confirm Stay
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
