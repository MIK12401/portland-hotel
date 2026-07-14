export interface Room {
  id: string;
  name: string;
  description: string;
  type: string;
  bed: string;
  view: string;
  size: number; // in sqm
  price: number; // in NGN per night
  image: string;
  amenities: string[];
  maxGuests: number;
  featured?: boolean;
  tag?: string;
}

export interface Booking {
  id: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  suiteType: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image?: string;
  isMain?: boolean;
}
