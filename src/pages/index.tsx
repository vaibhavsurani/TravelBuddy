import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard'; // Make sure this is imported
import { destinations } from '@/data/destinations'; // Make sure this is imported

export default function Home() {
  const popularDestinations = destinations.slice(0, 3);

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
          <section className="relative h-[60vh] flex items-center justify-center text-white -top-15">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
              <p className="text-lg md:text-2xl">Explore the beautiful landscapes of India.</p>
            </div>
          </section>

          {/* Popular Destinations Section */}
          <section className="py-16">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-12">Popular Destinations</h2>
              {/* THIS IS THE PART THAT WAS MISSING */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            </div>
          </section>
      </main>

      <Footer />
    </div>
  );
}

