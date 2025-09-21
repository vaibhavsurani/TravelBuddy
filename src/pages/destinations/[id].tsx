import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { destinations, Destination } from '@/data/destinations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingFlowModal from '@/components/BookingFlowModal';
import BookingModal from '@/components/BookingModal';
import { CheckCircle, Calendar, Briefcase } from 'lucide-react';

interface DestinationPageProps {
  destination: Destination | null;
}

const DestinationPage = ({ destination }: DestinationPageProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Head>
          <title>{destination.name} - TravelBuddy</title>
          <meta name="description" content={destination.shortDescription} />
        </Head>
        <Header />

        <main className="flex-grow">
          <div className="relative h-96">
            <Image
              src={destination.imageUrl}
              alt={destination.name}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center drop-shadow-lg">
                {destination.name}
              </h1>
            </div>
          </div>

          <div className="container mx-auto px-6 py-12 max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-lg -mt-20 relative z-10">
              <p className="text-lg text-gray-700 mb-6">{destination.longDescription}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md">
                      <div className="flex items-center">
                          <Calendar className="h-6 w-6 mr-3 flex-shrink-0"/>
                          <div>
                              <h3 className="font-bold">Best Time to Visit</h3>
                              <p>{destination.bestTimeToVisit}</p>
                          </div>
                      </div>
                  </div>
                   <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-md">
                      <div className="flex items-center">
                          <Briefcase className="h-6 w-6 mr-3 flex-shrink-0"/>
                          <div>
                              <h3 className="font-bold">Category</h3>
                              <p>{destination.category}</p>
                          </div>
                      </div>
                  </div>
              </div>


              <h2 className="text-3xl font-bold text-gray-800 mb-4">Things to Do</h2>
              <ul className="space-y-3 mb-8">
                {destination.thingsToDo.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center pt-6 border-t">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                  >
                    Book Your Adventure Now
                  </button>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>

      {isModalOpen && destination && (
        <BookingFlowModal
          destination={destination}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = destinations.map(destination => ({
    params: { id: destination.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: { params?: { id?: string } }) => {
  const destination = destinations.find(d => d.id === params?.id);
  return {
    props: {
      destination: destination || null,
    },
  };
};

export default DestinationPage;

