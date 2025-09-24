import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { destinations } from '@/data/destinations';
import TypingText from '@/components/TypingText'; 
import React, { useState, useEffect } from 'react';


export default function Home() {
  const popularDestinations = destinations.slice(0, 7); // Show only the first 7 destinations for brevity
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroImages: string[] = [
    '/images/home1.jpg',
    '/images/home2.jpg',
    '/images/home3.jpg',
    '/images/home4.jpg',
    '/images/home5.jpg',
  ];
  const typingWords: string[] = ["Adventure", "Nature", "Thrill", "Peace", "Excitement"];

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>TravelBuddy - Your Adventure Awaits</title>
        <meta name="description" content="Plan your next trip to amazing destinations across India." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          style={{
            position: "relative",
            width: "100vw",
            left: "50%",
            marginLeft: "-50vw",
          }}
          className="h-[75vh] overflow-hidden text-left -top-15 "
        >
          {heroImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
                i === idx ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}

          <div className="relative z-30 px-14 w-full max-w-6xl mx-auto h-full flex flex-col items-start justify-center text-white text-left">
            <h1 className="text-xl md:text-2xl font-medium mb-4">
              Experience
              <span className="block text-4xl md:text-6xl font-semibold mt-2">
                <TypingText words={typingWords} />
              </span>
            </h1>
            <p className="text-lg md:text-2xl">
              Discover journeys that resonate with your soul.
            </p>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="bg-gray-50 px-8 py-16 max-w-6xl w-full mx-auto -mt-24">
          <div className="container mx-auto px-6">
            <div className="text-left">
              <h2 className="text-2xl font-normal text-[#C2461C]">Highlighted Events</h2>
              <h2 className="text-lg font-normal text-gray-500 mb-4">Recommended camps by our Instructors</h2>
            </div>

            
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide space-x-2">
              {popularDestinations.map((destination) => (
                <div key={destination.id} className="flex-shrink-0 w-52">
                  <DestinationCard destination={destination} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}