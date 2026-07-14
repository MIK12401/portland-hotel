import { Room, Facility, Review } from './types';

export const ROOMS: Room[] = [
  {
    id: 'royal-executive-suite',
    name: 'Royal Executive Suite',
    type: 'Executive Suite',
    description: 'Designed for corporate leaders and discerning travelers, featuring contemporary African craftsmanship, a dedicated ergonomic working area, custom marble bath, and panoramic views of the Wuse II skyline.',
    bed: 'King Bed',
    view: 'City View',
    size: 45,
    price: 120000,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200',
    amenities: [
      'Automated climate control',
      '55" Smart TV with streaming apps',
      'In-suite espresso bar & selection of teas',
      'Plush Egyptian cotton linens & custom pillows',
      'Rain shower & standalone marble soaking tub',
      'High-speed premium Fiber Wi-Fi'
    ],
    maxGuests: 2,
    featured: true,
    tag: 'PREMIUM'
  },
  {
    id: 'diplomatic-suite',
    name: 'Diplomatic Suite',
    type: 'Luxury Suite',
    description: 'A masterfully curated escape featuring an expansive private terrace overlooking the tranquil embassy green belt, a separated luxury living lounge, custom walk-in closet, and bespoke designer furnishings.',
    bed: 'King Bed',
    view: 'Private Terrace',
    size: 55,
    price: 150000,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
    amenities: [
      'Expansive private terrace with lounge chairs',
      'Separated living area with customized designer sofa',
      'Walk-in wardrobe & elegant vanity',
      'Integrated surround-sound system',
      'Bespoke luxury bath products',
      'Complimentary mini-bar restocked daily'
    ],
    maxGuests: 2,
    featured: true,
    tag: 'POPULAR'
  },
  {
    id: 'presidential-penthouse',
    name: 'Grand Presidential Penthouse',
    type: 'Penthouse Suite',
    description: 'The absolute pinnacle of Portland Suites elegance. Featuring a private dining room, full chef-standard kitchen, master bedroom with panoramic glass corner walls, personalized 24H butler service, and unrivaled privacy.',
    bed: 'King Bed',
    view: 'Skyline Panorama',
    size: 85,
    price: 250000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    amenities: [
      'Personal 24H butler & private check-in service',
      'Chef-grade open-plan kitchen & spacious dining area',
      'Private keycard lift access directly to penthouse',
      'Pre-stocked premium cellar with select vintages',
      'Oversized master bathroom with double vanities & outdoor tub',
      'Panoramic floor-to-ceiling soundproof windows'
    ],
    maxGuests: 3,
    featured: true,
    tag: 'EXCLUSIVE'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'azure-pool',
    name: 'The Azure Pool',
    description: 'Our signature kidney-shaped pool, a serene oasis framed by artistic murals and verdant tropical gardens.',
    iconName: 'Waves',
    image: '/src/assets/images/azure_pool_1784044312427.jpg',
    isMain: true
  },
  {
    id: 'gourmet-dining',
    name: 'Gourmet Dining',
    description: 'International flavors curated by our executive chef, combining traditional Nigerian ingredients with modern French culinary techniques.',
    iconName: 'Utensils',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wellness-spa',
    name: 'Wellness Spa',
    description: 'Bespoke treatments, hot-stone therapy, and biological facials designed for complete physical and mental rejuvenation.',
    iconName: 'Leaf',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'executive-lounge',
    name: 'Executive Lounge',
    description: 'An exclusive, quiet space with leather armchairs, curated books, top-shelf liquor, and meeting pods for corporate residents.',
    iconName: 'Coffee',
    image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fiber-wifi',
    name: 'Fiber Wi-Fi',
    description: 'Ultra-fast dedicated gigabit fiber internet running seamlessly across the entire property bounds.',
    iconName: 'Wifi'
  },
  {
    id: 'fitness-center',
    name: 'Fitness Center',
    description: 'Fully equipped studio featuring state-of-the-art cardiovascular and strength machines by Technogym.',
    iconName: 'Dumbbell'
  },
  {
    id: 'secure-parking',
    name: 'Secure Parking',
    description: 'Gated parking floor with 24/7 security watch, license plate scanning, and complimentary private valet service.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'concierge',
    name: '24H Concierge',
    description: 'Our dedicated front desk staff is always on call to arrange bespoke local transit, bookings, or flight manifests.',
    iconName: 'Bell'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Oluwaseun A.',
    rating: 5,
    comment: 'The level of privacy and detail here is unmatched in Abuja. The staff immediately recognized me and handled all reservations with high professionalism.',
    date: 'June 24, 2026',
    suiteType: 'Diplomatic Suite'
  },
  {
    id: 'rev-2',
    name: 'Charlotte M.',
    rating: 5,
    comment: 'Portland Suites is a masterpiece. The architectural design is pristine, and the bed in the Royal Executive Suite was incredibly comfortable. Highly recommend!',
    date: 'July 2, 2026',
    suiteType: 'Royal Executive Suite'
  },
  {
    id: 'rev-3',
    name: 'Ibrahim K.',
    rating: 4.8,
    comment: 'Stunning pool area and extremely fast fiber connection. Perfect for a working holiday where discretion is crucial.',
    date: 'July 10, 2026',
    suiteType: 'Grand Presidential Penthouse'
  }
];
