import { Calendar, Cloud, Mountain, Users, Zap } from 'lucide-react';

// --- NEW DETAILED DATA STRUCTURE ---

export interface ItineraryDay {
day: number;
date: string;
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
name: string;
price: number;
duration: string;
departureCity: 'Ahmedabad' | 'Kochi' | 'Mumbai' | 'Baroda/Surat';
availableDates: string[];
}

export interface Destination {
id: string;
name: string;
subtitle: string;
shortDescription: string;
longDescription: string;
imageUrl: string;
category: 'Mountain' | 'Beach' | 'Historical' | 'City';
bestTimeToVisit: string;
thingsToDo: string[];
availableDates: string[];
packages: TravelPackage[];

// New fields for the redesigned UI
keyStats: {
    duration: string;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    ageGroup: string;
    maxAltitude: string;
};
importantUpdate: string;
brochureUrl?: string; // Optional brochure link
inclusions: string[];
exclusions: string[];
itinerary: ItineraryDay[];
attractions: { name: string, imageUrl: string }[];
departureCities: DepartureCity[];
basePrice: number;
}

export const destinations: Destination[] = [
{
    id: '1',
    name: 'Kerala Calling',
    subtitle: 'Venice of the East!',
    shortDescription: 'A symphony of emerald-green hills, spice-scented forests, and tranquil backwaters.',
    longDescription: 'Kerala, famously known as God’s Own Country, is a symphony of emerald-green hills, spice-scented forests, tranquil lakes, and soulful coastal towns. This journey is a handpicked experience that captures the essence of Kerala — from heritage walks in Fort Kochi to tea-covered slopes of Munnar, the wild heart of Thekkady, and the backwater charm of Alleppey.',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b4046249219?q=80&w=2532&auto=format&fit=crop',
    category: 'Beach',
    bestTimeToVisit: 'September to March',
    thingsToDo: ['Backwater Houseboat Cruise', 'Tea Plantation Visit in Munnar', 'Kathakali Performance', 'Explore Fort Kochi'],
    availableDates: ['Sep 26 - Oct 3, 2025', 'Oct 3 - Oct 10, 2025', 'Oct 10 - Oct 17, 2025', 'Oct 31 - Nov 7, 2025', 'Nov 7 - Nov 14, 2025', 'Dec 5 - Dec 12, 2025'],
    packages: [
    { id: 'k1', name: 'Non AC Sleeper Train to Kochi', price: 11800, duration: '8 days / 7 nights', departureCity: 'Ahmedabad', availableDates: ['Sep 26 - Oct 3, 2025', 'Oct 3 - Oct 10, 2025']},
    { id: 'k2', name: 'AC Sleeper Train to Kochi', price: 14400, duration: '8 days / 7 nights', departureCity: 'Ahmedabad', availableDates: ['Sep 26 - Oct 3, 2025', 'Oct 3 - Oct 10, 2025']},
    { id: 'k3', name: 'Non AC Sleeper Train via Mumbai', price: 12000, duration: '8 days / 7 nights', departureCity: 'Mumbai', availableDates: ['Oct 10 - Oct 17, 2025', 'Dec 5 - Dec 12, 2025']},
    { id: 'k4', name: 'AC Sleeper Train via Mumbai', price: 15900, duration: '8 days / 7 nights', departureCity: 'Mumbai', availableDates: ['Oct 10 - Oct 17, 2025', 'Dec 5 - Dec 12, 2025']},
    { id: 'k5', name: 'From Kochi', price: 9999, duration: '6 days / 5 nights', departureCity: 'Kochi', availableDates: ['Nov 7 - Nov 14, 2025']},
    { id: 'k6', name: 'From Baroda/Surat', price: 11800, duration: '8 days / 7 nights', departureCity: 'Baroda/Surat', availableDates: ['Sep 26 - Oct 3, 2025', 'Oct 31 - Nov 7, 2025', 'Dec 5 - Dec 12, 2025']}
    ],
    keyStats: {
    duration: '6 days / 5 nights',
    difficulty: 'Easy',
    ageGroup: '8-40 years',
    maxAltitude: '6,100 ft'
    },
    importantUpdate: 'For Flight Ticket Booking, Kindly WhatsApp on 9091680699.',
    brochureUrl: '#',
    inclusions: ['Traveling as per package', 'Food (Breakfast & Dinner)', 'Stay in Hotel in 3/4 sharing basis', '5% GST', 'First Aid Support', 'And Much more..'],
    exclusions: ['Food during travel duration & Lunch', 'Sightseeing Entry Fees if any', 'Anything not listed above'],
    itinerary: [
    { day: 1, date: 'SEP 27, 2025', title: 'Arrive in Kochi - Free Day for Sightseeing', description: 'Explore Fort Kochi\'s colonial charm, Chinese Fishing Nets, and local spice markets.', imageUrl: 'https://images.unsplash.com/photo-1593651031213-7b3da2b8a145?q=80&w=2574&auto=format&fit=crop' },
    { day: 6, date: 'OCT 02, 2025', title: 'Disperse from Kochi', description: 'Disperse after Breakfast.', imageUrl: 'https://images.unsplash.com/photo-1624555130581-351a0218b060?q=80&w=2574&auto=format&fit=crop' }
    ],
    attractions: [
    { name: 'Kochi', imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7207?q=80&w=2574&auto=format&fit=crop' },
    { name: 'Backwaters', imageUrl: 'https://images.unsplash.com/photo-1593693397640-052a21e4a3c0?q=80&w=2574&auto=format&fit=crop' },
    { name: 'Munnar', imageUrl: 'https://images.unsplash.com/photo-1549923028-595a6332c21c?q=80&w=2574&auto=format&fit=crop' }
    ],
    departureCities: [
        { name: 'Ahmedabad', imageUrl: 'https://images.unsplash.com/photo-1582209539513-4a1b24c30b2c?q=80&w=2532&auto=format&fit=crop', price: 11800, duration: '8 days'},
        { name: 'Kochi', imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7207?q=80&w=2574&auto=format&fit=crop', price: 9999, duration: '6 days'},
        { name: 'Mumbai', imageUrl: 'https://images.unsplash.com/photo-1562979314-1ace75b05474?q=80&w=2574&auto=format&fit=crop', price: 11400, duration: '8 days'},
        { name: 'Baroda/Surat', imageUrl: 'https://images.unsplash.com/photo-1622303273200-2e4532a81878?q=80&w=2574&auto=format&fit=crop', price: 11800, duration: '8 days'}
    ],
    basePrice: 9999
},
// Add other destinations here with the same detailed structure
];

