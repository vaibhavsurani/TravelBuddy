import { Calendar, Cloud, Mountain, Users, Zap } from 'lucide-react';

// --- TYPES ---

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface DepartureCity {
  name: string;
  imageUrl: string;
  price: number;
  duration: string;
}

export interface TravelPackage {
  id: string;
  destinationId: string; // Link to parent destination
  name: string;
  price: number;
  duration: string;
  departureCity: 'Ahmedabad' | 'Kochi' | 'Mumbai' | 'Baroda/Surat';
  availableDates: string[];
  itinerary: ItineraryDay[]; // <-- Separate itinerary per package
}

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  carouselImages: { src: string; alt: string }[];
  category: 'Mountain' | 'Beach' | 'Historical' | 'City';
  bestTimeToVisit: string;
  availableDates: string[];
  packages: TravelPackage[];
  keyStats: {
    duration: string;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    ageGroup: string;
    maxAltitude: string;
  };

  importantUpdate: string;
  brochureUrl?: string;
  inclusions: string[];
  exclusions: string[];
  attractions: { name: string; imageUrl: string }[];
  departureCities: DepartureCity[];
  basePrice: number;
}

// --- DESTINATIONS (general info) ---

export const destinations: Destination[] = [
  {
    id: 'kerala',
    name: 'Kerala Calling',
    subtitle: 'Venice of the East!',
    shortDescription:
      'A symphony of emerald-green hills, spice-scented forests, and tranquil backwaters.',
    longDescription:
      'Kerala, famously known as God’s Own Country, is a symphony of emerald-green hills, spice-scented forests, tranquil lakes, and soulful coastal towns. This journey is a handpicked experience that captures the essence of Kerala — from heritage walks in Fort Kochi to tea-covered slopes of Munnar, the wild heart of Thekkady, and the backwater charm of Alleppey.',
    carouselImages: [
      {
        src: '/images/kerala1.jpg',
        alt: 'Beautiful scenery of Kerala backwaters',
      },
      {
        src: '/images/kerala2.jpg',
        alt: 'A traditional houseboat in Kerala',
      },
      {
        src: '/images/kerala3.jpg',
        alt: 'Lush green tea plantations in Munnar, Kerala',
      },
      {
        src: '/images/kerala4.jpg',
        alt: 'Kathakali dancer in traditional attire',
      },
    ],
    category: 'Beach',
    bestTimeToVisit: 'September to March',
    availableDates: [
      'Sep 26 - Oct 3, 2025',
      'Oct 3 - Oct 10, 2025',
      'Oct 10 - Oct 17, 2025',
      'Oct 31 - Nov 7, 2025',
      'Nov 7 - Nov 14, 2025',
      'Dec 5 - Dec 12, 2025',
    ],
    packages: [
    {
        id: 'k1',
        destinationId: 'kerala',
        name: 'From Ahmedabad (Non AC Sleeper Train)',
        price: 11800,
        duration: '8 days / 7 nights',
        departureCity: 'Ahmedabad',
        availableDates: ['Sep 26 - Oct 3, 2025', 'Oct 3 - Oct 10, 2025'],
        itinerary: [
        {
            day: 1,
            title: 'Departure from Ahmedabad',
            description: 'Overnight Train Journey to Kochi',
            imageUrl: '',
        },
        {
            day: 2,
            title: 'Arrive at Kochi in Afternoon - Free Day for Sightseeing',
            description:
            'Explore Fort Kochi’s Colonial Charm, Chinese Fishing Nets, and Local Spice Markets!',
            imageUrl: '/images/KeralaDay2.jpg',
        },
        {
            day: 3,
            title: 'Travel from Kochi to Munnar – The Gateway to the Hills',
            description:
            'Visit Cheeyappara & Valara Waterfalls en route to the hill town of Munnar.',
            imageUrl: '/images/KeralaDay3.jpg',
        },
        {
            day: 4,
            title: 'Munnar to Thekkady – Into the Spice Heartland',
            description:
            'Explore Tea Gardens, Mattupetty Dam & Echo Point.',
            imageUrl: '/images/KeralaDay4.jpg',
        },
        {
            day: 5,
            title: 'Thekkady to Alleppey – Backwater Bliss',
            description:
            'Drive through cardamom hills, visit spice plantations, and enjoy Periyar Lake boating.',
            imageUrl: '/images/KeralaDay5.jpg',
        },
        {
            day: 6,
            title: 'Free Time in Alleppey and Return to Kochi in Evening',
            description: 'Enjoy a short houseboat cruise in Alleppey before returning to Kochi',
            imageUrl: '/images/KeralaDay6.jpg',
        },
        {
            day: 7,
            title: 'Departure from Kochi',
            description:
            'Disperse after Breakfast, Overnight Train Journey',
            imageUrl: '',
        },
        {
            day: 8,
            title: 'Arrival at Ahmedabad',
            description:
            'The end of an incredible journey to God\'s Own Country!',
            imageUrl: '',
        },
        ],
    },
    {
        id: 'k2',
        destinationId: 'kerala',
        name: 'From Mumbai',
        price: 11400,
        duration: '8 days / 7 nights',
        departureCity: 'Mumbai',
        availableDates: ['Oct 10 - Oct 17, 2025'],
        itinerary: [
        {
            day: 1,
            title: 'Departure from Mumbai',
            description: 'Overnight train journey to Kochi.',
            imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df',
        },
        {
            day: 2,
            title: 'Arrive in Kochi',
            description:
            'Begin Kerala exploration with Fort Kochi and cultural heritage.',
            imageUrl: 'https://images.unsplash.com/photo-1593651031213-7b3da2b8a145',
        },
        {
            day: 3,
            title: 'Munnar Tea Plantations',
            description:
            'Enjoy panoramic views of tea estates and waterfalls in Munnar.',
            imageUrl: 'https://images.unsplash.com/photo-1549923028-595a6332c21c',
        },
        {
            day: 4,
            title: 'Eravikulam National Park',
            description:
            'Jeep safari and nature trail in the stunning Munnar hills.',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        },
        {
            day: 5,
            title: 'Thekkady',
            description:
            'Spice plantation and Periyar Lake boat safari adventure.',
            imageUrl: 'https://images.unsplash.com/photo-1625244724120-1ed7a959a06d',
        },
        {
            day: 6,
            title: 'Alleppey Backwaters',
            description: 'Relax in a houseboat amidst Kerala’s tranquil backwaters.',
            imageUrl: 'https://images.unsplash.com/photo-1593693397640-052a21e4a3c0',
        },
        {
            day: 7,
            title: 'Kochi Leisure Day',
            description: 'Explore markets, arts, and enjoy Kathakali performance.',
            imageUrl: 'https://images.unsplash.com/photo-1616690710400-4e2cd99b9b91',
        },
        {
            day: 8,
            title: 'Return to Mumbai',
            description: 'Disperse and return by train to Mumbai.',
            imageUrl: 'https://images.unsplash.com/photo-1624555130581-351a0218b060',
        },
        ],
    },
    {
        id: 'k3',
        destinationId: 'kerala',
        name: 'From Baroda/Surat',
        price: 11800,
        duration: '8 days / 7 nights',
        departureCity: 'Baroda/Surat',
        availableDates: ['Oct 31 - Nov 7, 2025'],
        itinerary: [
        {
            day: 1,
            title: 'Departure from Baroda/Surat',
            description: 'Start overnight train journey to Kochi with the group.',
            imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df',
        },
        {
            day: 2,
            title: 'Arrive in Kochi',
            description: 'Local sightseeing including Fort Kochi & Marine Drive.',
            imageUrl: 'https://images.unsplash.com/photo-1593651031213-7b3da2b8a145',
        },
        {
            day: 3,
            title: 'Munnar',
            description: 'Visit Echo Point, Mattupetty Dam and tea gardens.',
            imageUrl: 'https://images.unsplash.com/photo-1549923028-595a6332c21c',
        },
        {
            day: 4,
            title: 'Eravikulam Park',
            description: 'Wildlife spotting and misty trails of the Nilgiris.',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        },
        {
            day: 5,
            title: 'Thekkady',
            description: 'Periyar Lake boating & spice plantation guided tour.',
            imageUrl: 'https://images.unsplash.com/photo-1625244724120-1ed7a959a06d',
        },
        {
            day: 6,
            title: 'Alleppey',
            description: 'Overnight houseboat stay on Kerala backwaters.',
            imageUrl: 'https://images.unsplash.com/photo-1593693397640-052a21e4a3c0',
        },
        {
            day: 7,
            title: 'Kochi Free Day',
            description: 'Shopping, local cuisine and leisure activities.',
            imageUrl: 'https://images.unsplash.com/photo-1616690710400-4e2cd99b9b91',
        },
        {
            day: 8,
            title: 'Return Journey',
            description: 'Depart Kochi and return by train to Baroda/Surat.',
            imageUrl: 'https://images.unsplash.com/photo-1624555130581-351a0218b060',
        },
        ],
    },
    {
        id: 'k4',
        destinationId: 'kerala',
        name: 'From Kochi',
        price: 9999,
        duration: '6 days / 5 nights',
        departureCity: 'Kochi',
        availableDates: ['Nov 7 - Nov 14, 2025'],
        itinerary: [
        {
            day: 1,
            title: 'Welcome to Kochi',
            description: 'Start exploring colonial Kochi and its vibrant streets.',
            imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7207',
        },
        {
            day: 2,
            title: 'Munnar Journey',
            description: 'Drive to Munnar and explore tea plantations.',
            imageUrl: 'https://images.unsplash.com/photo-1549923028-595a6332c21c',
        },
        {
            day: 3,
            title: 'Eravikulam National Park',
            description: 'Enjoy trekking trails and wildlife of Munnar.',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        },
        {
            day: 4,
            title: 'Thekkady',
            description: 'Spice plantation walk and Periyar Lake boating.',
            imageUrl: 'https://images.unsplash.com/photo-1625244724120-1ed7a959a06d',
        },
        {
            day: 5,
            title: 'Alleppey Houseboat',
            description: 'Backwater cruise with traditional Kerala meals.',
            imageUrl: 'https://images.unsplash.com/photo-1593693397640-052a21e4a3c0',
        },
        {
            day: 6,
            title: 'Departure from Kochi',
            description: 'Trip concludes after breakfast. Guests disperse.',
            imageUrl: 'https://images.unsplash.com/photo-1624555130581-351a0218b060',
        },
        ],
    },
    ],
    keyStats: {
      duration: '6 days / 5 nights',
      difficulty: 'Easy',
      ageGroup: '8-40 years',
      maxAltitude: '6,100 ft',
    },
    importantUpdate: 'For Flight Ticket Booking, Kindly WhatsApp on 9091680699.',
    brochureUrl: '#',
    inclusions: [
      'Traveling as per package',
      'Food (Breakfast & Dinner)',
      'Stay in Hotel in 3/4 sharing basis',
      '5% GST',
      'First Aid Support',
      'And Much more..',
    ],
    exclusions: [
      'Food during travel duration & Lunch',
      'Sightseeing Entry Fees if any',
      'Anything not listed above',
    ],
    attractions: [
      {
        name: 'Kochi',
        imageUrl:
          '/images/KeralaAttraction1.jpg',
      },
      {
        name: 'Backwaters',
        imageUrl:
          '/images/KeralaAttraction2.jpg',
      },
      {
        name: 'Munnar',
        imageUrl:
          '/images/KeralaAttraction3.jpg',
      },
    ],
    departureCities: [
      {
        name: 'Ahmedabad',
        imageUrl:
          '/images/dAhmedabad.jpg',
        price: 11800,
        duration: '8 days',
      },
      {
        name: 'Kochi',
        imageUrl:
          '/images/dKochi.jpg',
        price: 9999,
        duration: '6 days',
      },
      {
        name: 'Mumbai',
        imageUrl:
          '/images/dMumbai.jpg',
        price: 11400,
        duration: '8 days',
      },
      {
        name: 'Baroda/Surat',
        imageUrl:
          '/images/dBaroda-Surat.jpg',
        price: 11800,
        duration: '8 days',
      },
    ],
    basePrice: 9999,
  },
];

