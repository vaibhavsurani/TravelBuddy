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
  departureCity: 'Ahmedabad' | 'Kochi' | 'Mumbai' | 'Baroda/Surat' | 'Polo Forest' | 'Delhi' | 'Chandigarh';
  availableDates: string[];
  itinerary: ItineraryDay[]; // <-- Separate itinerary per package
}

export interface Destination {
  id: string;
  name: string;
  imageUrl: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  carouselImages: { src: string; alt: string }[];
  category: 'Mountain' | 'Beach' | 'Historical' | 'City' | 'Trekking' | 'Adventure';
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
    imageUrl: '/images/KeralaHome.jpg',
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

  {
  id: 'polo-forest',
  name: 'Polo Forest',
  imageUrl: '/images/PoloForest/poloforestHome.jpg',
  subtitle: "Gujarat's Hidden Paradise!",
  shortDescription: 'A serene blend of ancient temples, lush greenery, and adventure-filled experiences.',
  longDescription: 'Polo Forest, also known as Vijaynagar Forest, is nestled in the foothills of the Aravalli range in North Gujarat. This destination is a treasure trove of nature, history, and adventure. It offers a perfect weekend escape with its dense forests, ancient temple ruins, and the perennial Harnav River. This journey is designed to let you experience guided treks, exciting adventure activities, and the tranquility of a night under the stars.',
  carouselImages: [{
      src: '/images/PoloForest/poloforest1.jpg',
      alt: 'Ancient temple ruins in Polo Forest'
    }, {
      src: '/images/PoloForest/poloforest2.jpg',
      alt: 'A group trekking through the lush greenery of Polo Forest'
    }, {
      src: '/images/PoloForest/poloforest3.jpg',
      alt: 'Harnav River flowing through the forest'
    }, {
      src: '/images/PoloForest/poloforest4.jpg',
      alt: 'A group enjoying a bonfire at a campsite'
    },{
      src: '/images/PoloForest/poloforest5.jpg',
      alt: 'Ancient temple ruins in Polo Forest'
    }, {
      src: '/images/PoloForest/poloforest6.jpg',
      alt: 'A group trekking through the lush greenery of Polo Forest'
    }],
  category: 'Trekking',
  bestTimeToVisit: 'September to February (Monsoon & Winter)',
  availableDates: ['Sep 27 - Sep 28, 2025', 'Oct 4 - Oct 5, 2025', 'Oct 11 - Oct 12, 2025', 'Oct 18 - Oct 19, 2025', 'Oct 25 - Oct 26, 2025', 'Nov 1 - Nov 2, 2025', 'Nov 8 - Nov 9, 2025', 'Nov 15 - Nov 16, 2025', 'Dec 6 - Dec 7, 2025'],
  packages: [{
      id: 'p1',
      destinationId: 'polo-forest',
      name: 'From Ahmedabad',
      price: 2000,
      duration: '2 days / 1 night',
      departureCity: 'Ahmedabad',
      availableDates: ['Sep 27 - Sep 28, 2025', 'Oct 4 - Oct 5, 2025', 'Oct 11 - Oct 12, 2025'],
      itinerary: [{
          day: 1,
          title: 'Departure & Forest Trek',
          description: 'Depart from Ahmedabad early morning. Arrive at Polo Forest and check in. Enjoy a guided trek through the forest to ancient temple ruins and explore the Harnav River.',
          imageUrl: '/images/PoloForest/poloforestday1.jpg'
        }, {
          day: 2,
          title: 'Adventure Activities & Return',
          description: 'Morning adventure activities like rappelling or rock climbing (subject to weather). After lunch, depart for Ahmedabad, arriving in the evening.',
          imageUrl: '/images/PoloForest/poloforestday2.jpg'
        }]
    }, {
      id: 'p2',
      destinationId: 'polo-forest',
      name: 'Polo to Polo (Own Vehicle)',
      price: 1799,
      duration: '2 days / 1 night',
      departureCity: 'Polo Forest',
      availableDates: ['Nov 1 - Nov 2, 2025', 'Nov 8 - Nov 9, 2025', 'Nov 15 - Nov 16, 2025'],
      itinerary: [{
          day: 1,
          title: 'Arrival at Polo Forest & Campfire',
          description: 'Arrive at the campsite in the afternoon. Check-in and relax before a guided trek. Enjoy a campfire with music and group activities in the evening.',
          imageUrl: '/images/PoloForest/poloforestday1.jpg'
        }, {
          day: 2,
          title: 'Trekking & Departure',
          description: 'Early morning trek to Sunrise Point and Vireshwar temple. Return for breakfast and adventure activities before check-out and departure.',
          imageUrl: '/images/PoloForest/poloforestday2.jpg'
        }]
    }],
  keyStats: {
    duration: '2 days / 1 night',
    difficulty: 'Easy',
    ageGroup: '6-40 years',
    maxAltitude: '600 ft'
  },
  importantUpdate: 'For more information on customized camps or special batches, please contact us directly.',
  brochureUrl: '#',
  inclusions: ['Traveling as per package', 'Food (Breakfast & Dinner)', 'Accommodation in Tents/Rooms (as per package)', 'Forest Trekking & Site Seeing', 'Adventure Activities (Rappelling, Rock Climbing)', 'First Aid Support'],
  exclusions: ['Personal expenses', 'Food during travel duration & Lunch', 'Sightseeing Entry Fees if any', 'Anything not listed in inclusions'],
  attractions: [{
      name: 'Sharneshwar Temple',
      imageUrl: '/images/PoloForest/poloforestA1.jpg'
    }, {
      name: 'Harnav River & Dam',
      imageUrl: '/images/PoloForest/poloforestA2.jpg'
    }, {
      name: "Lakhera's Dera (Jain Temple)",
      imageUrl: '/images/PoloForest/poloforestA3.jpg'
    },{
      name: 'Sharneshwar Temple',
      imageUrl: '/images/PoloForest/poloforestA4.jpg'
    }, {
      name: 'Harnav River & Dam',
      imageUrl: '/images/PoloForest/poloforestA5.jpg'
    }, {
      name: "Lakhera's Dera (Jain Temple)",
      imageUrl: '/images/PoloForest/poloforestA6.jpg'
    }],
  departureCities: [{
      name: 'Ahmedabad',
      imageUrl: '/images/PoloForest/dAhmedabad.jpg',
      price: 2000,
      duration: '2 days'
    }, {
      name: 'Polo Forest',
      imageUrl: '/images/PoloForest/dPoloForest.jpg',
      price: 1799,
      duration: '2 days'
    }],
  basePrice: 1799
},
{
  id: 'matheran',
  name: 'Marvelous Matheran',
  imageUrl: '/images/Matheran/MatheranHome.jpg',
  subtitle: 'A walk through the clouds!',
  shortDescription: 'An enchanting hill station in Maharashtra, known for its lush green forests and a complete ban on vehicles.',
  longDescription: "Matheran, a quaint and tranquil hill station, is a true marvel of nature. It's Asia's only automobile-free hill station, which means you'll explore its scenic trails and lush forests by foot or on horseback. This trip takes you through the most mesmerizing parts of Matheran, from sunrise at Panorama Point to the echoing sounds at Echo Point, all while enjoying the serene and misty environment that makes it a perfect escape from city life.",
  carouselImages: [{
      src: '/images/Matheran/Matheran1.jpg',
      alt: 'A group trekking through the misty trails of Matheran'
    }, {
      src: '/images/Matheran/Matheran2.jpg',
      alt: 'Panorama Point viewpoint in Matheran'
    }, {
      src: '/images/Matheran/Matheran3.jpg',
      alt: 'The iconic toy train of Matheran'
    }, {
      src: '/images/Matheran/Matheran4.jpg',
      alt: 'A group enjoying a serene morning in Matheran'
    }],
  category: 'Trekking',
  bestTimeToVisit: 'September to February',
  availableDates: ['Sep 27 - Sep 29, 2025', 'Oct 4 - Oct 6, 2025', 'Oct 11 - Oct 13, 2025', 'Oct 18 - Oct 20, 2025', 'Oct 25 - Oct 27, 2025', 'Nov 1 - Nov 3, 2025', 'Nov 8 - Nov 10, 2025', 'Nov 15 - Nov 17, 2025', 'Dec 6 - Dec 8, 2025'],
  packages: [{
      id: 'm1',
      destinationId: 'matheran',
      name: 'From Ahmedabad',
      price: 3700,
      duration: '3 days / 2 nights',
      departureCity: 'Ahmedabad',
      availableDates: ['Sep 27 - Sep 29, 2025', 'Oct 4 - Oct 6, 2025', 'Oct 11 - Oct 13, 2025'],
      itinerary: [{
          day: 1,
          title: 'Departure from Ahmedabad',
          description: 'Overnight bus or train journey to Mumbai/Neral. Meet fellow travelers and get ready for the adventure!',
          imageUrl: '/images/Matheran/MatheranDay1.jpg'
        }, {
          day: 2,
          title: 'Arrival & Matheran Exploration',
          description: 'Arrive at Neral in the morning. Take the scenic toy train ride to Matheran. After check-in, explore Panorama Point and other nearby viewpoints.',
          imageUrl: '/images/Matheran/MatheranDay2.jpg'
        }, {
          day: 3,
          title: 'Trekking & Return Journey',
          description: 'Start the day with a trek to famous viewpoints like Echo Point and Louisa Point. Enjoy the serene beauty before beginning the return journey to Ahmedabad in the evening.',
          imageUrl: '/images/Matheran/MatheranDay3.jpg'
        }]
    }, {
      id: 'm2',
      destinationId: 'matheran',
      name: 'From Mumbai',
      price: 3200,
      duration: '3 days / 2 nights',
      departureCity: 'Mumbai',
      availableDates: ['Nov 1 - Nov 3, 2025', 'Nov 8 - Nov 10, 2025', 'Nov 15 - Nov 17, 2025'],
      itinerary: [{
          day: 1,
          title: 'Arrival at Neral & Toy Train Ride',
          description: 'Assemble at Neral railway station. Board the toy train for a picturesque journey to Matheran. Check into your hotel and enjoy a local sightseeing walk.',
          imageUrl: '/images/Matheran/MatheranDay1.jpg'
        }, {
          day: 2,
          title: 'Trekking to Viewpoints',
          description: "A full day of trekking to explore Matheran's famous points including Echo Point and Charlotte Lake. Enjoy the tranquility of this no-vehicle zone.",
          imageUrl: '/images/Matheran/MatheranDay2.jpg'
        }, {
          day: 3,
          title: 'Sunrise & Departure',
          description: 'Witness a beautiful sunrise from Panorama Point. Enjoy a final walk and breakfast before checking out and beginning your journey back to Mumbai.',
          imageUrl: '/images/Matheran/MatheranDay3.jpg'
        }]
    },{
      id: 'm3',
      destinationId: 'matheran',
      name: 'From Surat/Baroda',
      price: 3600,
      duration: '3 days / 2 nights',
      departureCity: 'Baroda/Surat',
      availableDates: ['Oct 18 - Oct 20, 2025', 'Oct 25 - Oct 27, 2025', 'Dec 6 - Dec 8, 2025'],
      itinerary: [{
          day: 1,
          title: 'Departure from Surat/Baroda',
          description: 'Overnight bus or train journey to Mumbai/Neral. Meet the group and begin the adventure!',
          imageUrl: '/images/Matheran/MatheranDay1.jpg'
        }, {
          day: 2,
          title: 'Arrival & Matheran Exploration',
          description: 'Arrive at Neral in the morning. Enjoy the famous toy train ride to Matheran. After check-in, explore Panorama Point and other nearby viewpoints.',
          imageUrl: '/images/Matheran/MatheranDay2.jpg'
        }, {
          day: 3,
          title: 'Trekking & Return Journey',
          description: 'Start the day with a trek to famous viewpoints like Echo Point and Louisa Point. Enjoy the serene beauty before beginning the return journey to Surat/Baroda in the evening.',
          imageUrl: '/images/Matheran/MatheranDay3.jpg'
        }]
    }],
  keyStats: {
    duration: '3 days / 2 nights',
    difficulty: 'Easy',
    ageGroup: '6-40 years',
    maxAltitude: '2,625 ft'
  },
  importantUpdate: 'The toy train schedule is subject to change. Please contact us for the latest updates.',
  brochureUrl: '#',
  inclusions: ['Traveling as per package', 'Food (Breakfast & Dinner)', 'Stay in Hotel in 3/4 sharing basis', '5% GST', 'First Aid Support', 'And Much more..'],
  exclusions: ['Food during travel duration & Lunch', 'Sightseeing Entry Fees if any', 'Anything not listed above'],
  attractions: [{
      name: 'Panorama Point',
      imageUrl: '/images/Matheran/MatheranA1.jpg'
    }, {
      name: 'Echo Point',
      imageUrl: '/images/Matheran/MatheranA2.jpg'
    }],
  departureCities: [{
      name: 'Ahmedabad',
      imageUrl: '/images/Matheran/dAhmedabad.jpg',
      price: 3700,
      duration: '3 days'
    }, {
      name: 'Mumbai',
      imageUrl: '/images/Matheran/dMumbai.jpg',
      price: 3200,
      duration: '3 days'
    },{
      name: 'Baroda/Surat',
      imageUrl: '/images/Matheran/dBaroda.jpg',
      price: 3600,
      duration: '3 days'
    }],
  basePrice: 3200
},
{
  id: 'spiti-valley',
  name: 'Explore and Adore Spiti Valley',
  imageUrl: '/images/SpitiValley/SpitiValleyHome.jpg',
  subtitle: 'The Cold Desert Mountains!',
  shortDescription: 'A thrilling expedition to a high-altitude cold desert, a land of ancient monasteries and breathtaking landscapes.',
  longDescription: "Embark on an unforgettable adventure through Spiti Valley, a region known as the 'Middle Land' between India and Tibet. This journey takes you through Manali and over the majestic Kunzum Pass, leading to the remote and stunning landscapes of Kaza, Langza, and Hikkim. Discover ancient Buddhist monasteries, serene high-altitude lakes, and witness the unique culture of this cold desert. This trip is a perfect blend of natural beauty, spiritual tranquility, and raw adventure.",
  carouselImages: [{
      src: '/images/SpitiValley/SpitiValley1.jpg',
      alt: 'A mesmerizing view of Spiti Valley landscapes'
    }, {
      src: '/images/SpitiValley/SpitiValley2.jpg',
      alt: 'Breathtaking Kunzum Pass covered in snow'
    }, {
      src: '/images/SpitiValley/SpitiValley3.jpg',
      alt: 'The iconic Key Monastery perched on a hill'
    }, {
      src: '/images/SpitiValley/SpitiValley4.jpg',
      alt: 'A traditional Spitian village in the mountains'
    },{
      src: '/images/SpitiValley/SpitiValley5.jpg',
      alt: 'A mesmerizing view of Spiti Valley landscapes'
    }, {
      src: '/images/SpitiValley/SpitiValley6.jpg',
      alt: 'Breathtaking Kunzum Pass covered in snow'
    }, {
      src: '/images/SpitiValley/SpitiValley7.jpg',
      alt: 'The iconic Key Monastery perched on a hill'
    }, {
      src: '/images/SpitiValley/SpitiValley8.jpg',
      alt: 'A traditional Spitian village in the mountains'
    },{
      src: '/images/SpitiValley/SpitiValley9.jpg',
      alt: 'A traditional Spitian village in the mountains'
    }],
  category: 'Adventure',
  bestTimeToVisit: 'June to September',
  availableDates: ['Jun 8 - Jun 16, 2025', 'Jun 15 - Jun 23, 2025', 'Jun 22 - Jun 30, 2025', 'Jul 6 - Jul 14, 2025', 'Jul 20 - Jul 28, 2025', 'Aug 3 - Aug 11, 2025', 'Aug 17 - Aug 25, 2025', 'Sep 7 - Sep 15, 2025', 'Sep 14 - Sep 22, 2025', 'Sep 21 - Sep 29, 2025'],
  packages: [{
      id: 's1',
      destinationId: 'spiti-valley',
      name: 'From Ahmedabad',
      price: 26000,
      duration: '10 days / 9 nights',
      departureCity: 'Ahmedabad',
      availableDates: ['Jun 22 - Jun 30, 2025', 'Jul 20 - Jul 28, 2025', 'Sep 14 - Sep 22, 2025'],
      itinerary: [{
          day: 1,
          title: 'Departure from Ahmedabad',
          description: 'Start your overnight journey from Ahmedabad to Manali.',
          imageUrl: '/images/SpitiValley/SpitiValleyD1.jpg'
        }, {
          day: 2,
          title: 'Arrival in Manali & Rest Day',
          description: 'Arrive in Manali, check into your hotel and relax to acclimatize to the altitude.',
          imageUrl: ''
        }, {
          day: 3,
          title: 'Manali to Batal/Losar',
          description: 'Join the group and start your journey to Spiti. Overnight stay at Batal/Losar.',
          imageUrl: '/images/SpitiValley/SpitiValleyD3.jpg'
        }, {
          day: 4,
          title: 'Batal/Losar to Kaza',
          description: 'Drive over Kunzum Pass and reach Kaza, the sub-divisional headquarters of Spiti. Check into your hotel for the night.',
          imageUrl: '/images/SpitiValley/SpitiValleyD4.jpg'
        }, {
          day: 5,
          title: 'Kaza Local Sightseeing',
          description: 'Explore the highest villages and post office in the world, including Langza, Komik, Hikkim, and the magnificent Key Monastery.',
          imageUrl: '/images/SpitiValley/SpitiValleyD5.jpg'
        }, {
          day: 6,
          title: 'Pin Valley Exploration',
          description: 'Visit Mud Village and the Pin Valley National Park. Experience the serene beauty of the Pin River.',
          imageUrl: '/images/SpitiValley/SpitiValleyD6.jpg'
        }, {
          day: 7,
          title: 'Dhankar, Lhalung & Tabo',
          description: 'Travel to the ancient Dhankar Monastery, Lhalung Monastery, and the stunning Tabo Monastery.',
          imageUrl: '/images/SpitiValley/SpitiValleyD7.jpg'
        }, {
          day: 8,
          title: 'Tabo to Kalpa',
          description: 'Start your journey to Kinnaur. Visit Nako Lake and drive to Kalpa for an overnight stay with a view of the Kinnaur Kailash range.',
          imageUrl: '/images/SpitiValley/SpitiValleyD8.jpg'
        }, {
          day: 9,
          title: 'Kalpa to Shimla',
          description: 'Depart from Kalpa and begin the scenic drive to Shimla via the old Hindustan-Tibet road. Overnight stay at Shimla.',
          imageUrl: '/images/SpitiValley/SpitiValleyD9.jpg'
        }, {
          day: 10,
          title: 'Shimla Departure',
          description: 'After breakfast, your incredible Spiti adventure concludes. Depart from Shimla for your return journey to Ahmedabad.',
          imageUrl: '/images/SpitiValley/SpitiValleyD10.jpg'
        }]
    }, {
      id: 's2',
      destinationId: 'spiti-valley',
      name: 'From Chandigarh',
      price: 24500,
      duration: '10 days / 9 nights',
      departureCity: 'Chandigarh',
      availableDates: ['Jun 8 - Jun 16, 2025', 'Aug 17 - Aug 25, 2025', 'Sep 21 - Sep 29, 2025'],
      itinerary: [{
          day: 1,
          title: 'Departure from Chandigarh',
          description: 'Start your journey from Chandigarh to Manali. Overnight travel.',
          imageUrl: '/images/SpitiValley/SpitiValleyD1.jpg'
        }, {
          day: 2,
          title: 'Arrival in Manali & Rest Day',
          description: 'Arrive in Manali, check into your hotel and relax to acclimatize to the altitude.',
          imageUrl: ''
        }, {
          day: 3,
          title: 'Manali to Batal/Losar',
          description: 'Join the group and start your journey to Spiti. Overnight stay at Batal/Losar.',
          imageUrl: '/images/SpitiValley/SpitiValleyD3.jpg'
        }, {
          day: 4,
          title: 'Batal/Losar to Kaza',
          description: 'Drive over Kunzum Pass and reach Kaza, the sub-divisional headquarters of Spiti. Check into your hotel for the night.',
          imageUrl: '/images/SpitiValley/SpitiValleyD4.jpg'
        }, {
          day: 5,
          title: 'Kaza Local Sightseeing',
          description: 'Explore the highest villages and post office in the world, including Langza, Komik, Hikkim, and the magnificent Key Monastery.',
          imageUrl: '/images/SpitiValley/SpitiValleyD5.jpg'
        }, {
          day: 6,
          title: 'Pin Valley Exploration',
          description: 'Visit Mud Village and the Pin Valley National Park. Experience the serene beauty of the Pin River.',
          imageUrl: '/images/SpitiValley/SpitiValleyD6.jpg'
        }, {
          day: 7,
          title: 'Dhankar, Lhalung & Tabo',
          description: 'Travel to the ancient Dhankar Monastery, Lhalung Monastery, and the stunning Tabo Monastery.',
          imageUrl: '/images/SpitiValley/SpitiValleyD7.jpg'
        }, {
          day: 8,
          title: 'Tabo to Kalpa',
          description: 'Start your journey to Kinnaur. Visit Nako Lake and drive to Kalpa for an overnight stay with a view of the Kinnaur Kailash range.',
          imageUrl: '/images/SpitiValley/SpitiValleyD8.jpg'
        }, {
          day: 9,
          title: 'Kalpa to Shimla',
          description: 'Depart from Kalpa and begin the scenic drive to Shimla via the old Hindustan-Tibet road. Overnight stay at Shimla.',
          imageUrl: '/images/SpitiValley/SpitiValleyD9.jpg'
        }, {
          day: 10,
          title: 'Shimla Departure',
          description: 'After breakfast, your incredible Spiti adventure concludes. Depart from Shimla for your return journey to Chandigarh.',
          imageUrl: '/images/SpitiValley/SpitiValleyD10.jpg'
        }]
    }, {
      id: 's3',
      destinationId: 'spiti-valley',
      name: 'From Delhi',
      price: 25500,
      duration: '10 days / 9 nights',
      departureCity: 'Delhi',
      availableDates: ['Jun 15 - Jun 23, 2025', 'Jul 20 - Jul 28, 2025', 'Sep 7 - Sep 15, 2025'],
      itinerary: [{
          day: 1,
          title: 'Departure from Delhi',
          description: 'Start your overnight journey from Delhi to Manali.',
          imageUrl: '/images/SpitiValley/SpitiValleyD1.jpg'
        }, {
          day: 2,
          title: 'Arrival in Manali & Rest Day',
          description: 'Arrive in Manali, check into your hotel and relax to acclimatize to the altitude.',
          imageUrl: ''
        }, {
          day: 3,
          title: 'Manali to Batal/Losar',
          description: 'Join the group and start your journey to Spiti. Overnight stay at Batal/Losar.',
          imageUrl: '/images/SpitiValley/SpitiValleyD3.jpg'
        }, {
          day: 4,
          title: 'Batal/Losar to Kaza',
          description: 'Drive over Kunzum Pass and reach Kaza, the sub-divisional headquarters of Spiti. Check into your hotel for the night.',
          imageUrl: '/images/SpitiValley/SpitiValleyD4.jpg'
        }, {
          day: 5,
          title: 'Kaza Local Sightseeing',
          description: 'Explore the highest villages and post office in the world, including Langza, Komik, Hikkim, and the magnificent Key Monastery.',
          imageUrl: '/images/SpitiValley/SpitiValleyD5.jpg'
        }, {
          day: 6,
          title: 'Pin Valley Exploration',
          description: 'Visit Mud Village and the Pin Valley National Park. Experience the serene beauty of the Pin River.',
          imageUrl: '/images/SpitiValley/SpitiValleyD6.jpg'
        }, {
          day: 7,
          title: 'Dhankar, Lhalung & Tabo',
          description: 'Travel to the ancient Dhankar Monastery, Lhalung Monastery, and the stunning Tabo Monastery.',
          imageUrl: '/images/SpitiValley/SpitiValleyD7.jpg'
        }, {
          day: 8,
          title: 'Tabo to Kalpa',
          description: 'Start your journey to Kinnaur. Visit Nako Lake and drive to Kalpa for an overnight stay with a view of the Kinnaur Kailash range.',
          imageUrl: '/images/SpitiValley/SpitiValleyD8.jpg'
        }, {
          day: 9,
          title: 'Kalpa to Shimla',
          description: 'Depart from Kalpa and begin the scenic drive to Shimla via the old Hindustan-Tibet road. Overnight stay at Shimla.',
          imageUrl: '/images/SpitiValley/SpitiValleyD9.jpg'
        }, {
          day: 10,
          title: 'Shimla Departure',
          description: 'After breakfast, your incredible Spiti adventure concludes. Depart from Shimla for your return journey to Delhi.',
          imageUrl: '/images/SpitiValley/SpitiValleyD10.jpg'
        }]
    }],
  keyStats: {
    duration: '10 days / 9 nights',
    difficulty: 'Moderate',
    ageGroup: '16-45 years',
    maxAltitude: '15,000 ft'
  },
  importantUpdate: 'The Manali-Rohtang Pass route is seasonal and depends on weather conditions. Please check with us before booking.',
  brochureUrl: '#',
  inclusions: ['Transportation as per the itinerary', 'All meals (Breakfast & Dinner) as mentioned', 'Accommodation in camps/hotels on a sharing basis', 'Experienced tour leader', 'First aid kit', 'Permits & Toll Taxes'],
  exclusions: ['Personal expenses', 'Food during travel & Lunch', 'Sightseeing Entry Fees', 'Any extra expenses due to unexpected circumstances', 'Anything not listed in inclusions'],
  attractions: [{
      name: 'Kunzum Pass',
      imageUrl: '/images/SpitiValley/SpitiValleyA1.jpg'
    }, {
      name: 'Key Monastery',
      imageUrl: '/images/SpitiValley/SpitiValleyA2.jpg'
    }, {
      name: 'Pin Valley',
      imageUrl: '/images/SpitiValley/SpitiValleyA3.jpg'
    },{
      name: 'Kunzum Pass',
      imageUrl: '/images/SpitiValley/SpitiValleyA4.jpg'
    }, {
      name: 'Key Monastery',
      imageUrl: '/images/SpitiValley/SpitiValleyA5.jpg'
    }, {
      name: 'Pin Valley',
      imageUrl: '/images/SpitiValley/SpitiValleyA6.jpg'
    },{
      name: 'Kunzum Pass',
      imageUrl: '/images/SpitiValley/SpitiValleyA7.jpg'
    }, {
      name: 'Key Monastery',
      imageUrl: '/images/SpitiValley/SpitiValleyA8.jpg'
    }, {
      name: 'Pin Valley',
      imageUrl: '/images/SpitiValley/SpitiValleyA9.jpg'
    }],
  departureCities: [{
      name: 'Ahmedabad',
      imageUrl: '/images/SpitiValley/dAhmedabad.jpg',
      price: 26000,
      duration: '12 days'
    }, {
      name: 'Chandigarh',
      imageUrl: '/images/SpitiValley/dChandigarh.jpg',
      price: 24500,
      duration: '12 days'
    }, {
      name: 'Delhi',
      imageUrl: '/images/SpitiValley/dDelhi.jpg',
      price: 25500,
      duration: '12 days'
    }],
  basePrice: 24500
}
];

