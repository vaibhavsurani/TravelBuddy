import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { destinations, Destination } from '@/data/destinations';
import { Search } from 'lucide-react';

// Get unique categories for the filter buttons, including an "All" option.
const categories = ['All', ...Array.from(new Set(destinations.map(d => d.category)))];

const AllDestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations);

  useEffect(() => {
    let results = destinations;

    // Filter by the selected category first
    if (selectedCategory !== 'All') {
      results = results.filter(destination => destination.category === selectedCategory);
    }

    // Then filter by the search term
    if (searchTerm) {
      results = results.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDestinations(results);
  }, [searchTerm, selectedCategory]); // Re-run the effect when search or category changes

  return (
    // CHANGED: Main background color to match the theme.
    <div className="flex flex-col min-h-screen bg-[#f7f5f2]">
      <Head>
        <title>All Destinations - TravelBuddy</title>
        <meta name="description" content="Explore all the amazing travel destinations in India offered by TravelBuddy." />
      </Head>

      <Header />

      <main className="flex-grow w-full">
        {/* --- 1. Hero Section --- */}
        <section className="relative w-full h-[65vh] bg-[url('/images/home1.jpg')] bg-cover bg-center flex flex-col justify-center items-center text-white px-4 -top-15">
          <div className="absolute inset-0 bg-white/10 bg-opacity-40"></div>
          
          <div className="relative z-10 px-6 w-full max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold">Explore Our Destinations</h1>
            <p className="mt-4 text-lg text-gray-200">Find your next adventure from our curated list of stunning locations across India.</p>
            
            <div className="mt-8 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a destination..."
            
                  className="w-full px-5 py-3 pr-12 text-lg text-gray-600 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C2461C]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. Main Content Section (Filters and Cards) --- */}
        <section className="container mx-auto py-12 px-4 max-w-6xl">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                // CHANGED: Button colors for selected and hover states to match the theme.
                className={`px-6 py-2 font-semibold rounded-full transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#C2461C] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-100 border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Destination Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredDestinations.map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-700">No Destinations Found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllDestinationsPage;