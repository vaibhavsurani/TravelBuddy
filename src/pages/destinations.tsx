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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>All Destinations - TravelBuddy</title>
        <meta name="description" content="Explore all the amazing travel destinations in India offered by TravelBuddy." />
      </Head>

      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Explore Our Destinations</h1>
            <p className="mt-4 text-lg text-gray-600">Find your next adventure from our curated list of stunning locations across India.</p>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a destination..."
                className="w-full px-5 py-3 pr-12 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                 <Search className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Category Filter Buttons */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-semibold rounded-full transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>


          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllDestinationsPage;

