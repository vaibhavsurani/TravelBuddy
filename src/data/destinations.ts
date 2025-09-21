// Define the structure for a travel package
export interface TravelPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  departureCity: 'Ahmedabad' | 'Kochi' | 'Mumbai' | 'Baroda/Surat';
  availableDates: string[];
}

// Update the Destination type to include packages AND the original availableDates
export interface Destination {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  category: 'Mountain' | 'Beach' | 'Historical' | 'City';
  bestTimeToVisit: string;
  thingsToDo: string[];
  availableDates: string[]; // This has been added back
  packages: TravelPackage[]; 
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Manali',
    shortDescription: 'A Himalayan resort town famed for its adventure sports.',
    longDescription: 'Nestled in the mountains of the Indian state of Himachal Pradesh, Manali is a high-altitude Himalayan resort town...',
    imageUrl: 'https://images.unsplash.com/photo-1586622992373-69411786178d?q=80&w=2070&auto=format&fit=crop',
    category: 'Mountain',
    bestTimeToVisit: 'October to June',
    thingsToDo: ['Solang Valley Skiing', 'Trekking in Parvati Valley', 'Visit Hadimba Temple', 'River Rafting in Beas'],
    availableDates: ['Oct 5-12, 2025', 'Nov 15-22, 2025', 'Oct 10-17, 2025', 'Nov 20-27, 2025'], // General dates
    packages: [
        { id: 'm1', name: 'AC Sleeper Train to Manali', price: 15500, duration: '7 days / 6 nights', departureCity: 'Mumbai', availableDates: ['Oct 5-12, 2025', 'Nov 15-22, 2025']},
        { id: 'm2', name: 'Non AC Sleeper Train to Manali', price: 12800, duration: '7 days / 6 nights', departureCity: 'Mumbai', availableDates: ['Oct 5-12, 2025', 'Nov 15-22, 2025']},
        { id: 'm3', name: 'AC Bus from Ahmedabad', price: 13500, duration: '8 days / 7 nights', departureCity: 'Ahmedabad', availableDates: ['Oct 10-17, 2025', 'Nov 20-27, 2025']}
    ]
  },
  {
    id: '2',
    name: 'Goa',
    shortDescription: 'Famous for its beaches, nightlife, and Portuguese culture.',
    longDescription: 'Goa is a state in western India with coastlines stretching along the Arabian Sea...',
    imageUrl: 'https://images.unsplash.com/photo-1560179407-9f0b83ba8b39?q=80&w=2070&auto=format&fit=crop',
    category: 'Beach',
    bestTimeToVisit: 'November to February',
    thingsToDo: ['Relax at Baga Beach', 'Explore Old Goa Churches', 'Dudhsagar Falls', 'Anjuna Flea Market'],
    availableDates: ['Nov 10-15, 2025', 'Dec 20-25, 2025', 'Nov 12-17, 2025', 'Dec 22-27, 2025'], // General dates
    packages: [
        { id: 'g1', name: 'Flight Package from Mumbai', price: 18000, duration: '5 days / 4 nights', departureCity: 'Mumbai', availableDates: ['Nov 10-15, 2025', 'Dec 20-25, 2025']},
        { id: 'g2', name: 'AC Sleeper Train from Ahmedabad', price: 14000, duration: '6 days / 5 nights', departureCity: 'Ahmedabad', availableDates: ['Nov 12-17, 2025', 'Dec 22-27, 2025']}
    ]
  },
  // ... add more destinations with packages as needed
];

