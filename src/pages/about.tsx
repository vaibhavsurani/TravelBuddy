import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>About Us - TravelBuddy</title>
        <meta name="description" content="Learn more about TravelBuddy and our mission to make Indian travel unforgettable." />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team planning a trip"
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="relative z-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">About TravelBuddy</h1>
            <p className="mt-4 text-lg">Your trusted partner in exploring the wonders of India.</p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
              At TravelBuddy, our mission is to simplify travel planning and inspire unforgettable journeys across the diverse landscapes of India. We believe that travel is not just about seeing new places, but about creating lasting memories. We are dedicated to providing curated experiences, reliable information, and seamless booking to help you discover the magic of India, one destination at a time.
            </p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center">
                <Image
                  src="https://placehold.co/150x150/667eea/ffffff?text=AV"
                  alt="Team Member Avatar"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Alex Vause</h3>
                <p className="text-gray-500">Founder & CEO</p>
              </div>
              {/* Team Member 2 */}
              <div className="flex flex-col items-center">
                <Image
                  src="https://placehold.co/150x150/9f7aea/ffffff?text=PS"
                  alt="Team Member Avatar"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Priya Singh</h3>
                <p className="text-gray-500">Head of Operations</p>
              </div>
              {/* Team Member 3 */}
              <div className="flex flex-col items-center">
                <Image
                  src="https://placehold.co/150x150/ed8936/ffffff?text=RC"
                  alt="Team Member Avatar"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Rohan Chauhan</h3>
                <p className="text-gray-500">Lead Travel Consultant</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
