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
        <section className="relative h-[65vh] flex items-center justify-center text-white -top-15">
          <Image
            src="/images/home2.jpg"
            alt="Team planning a trip"
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="relative z-20 w-full px-6 max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold">About <img src="/images/TravelBuddy-orange.png" className="inline-block h-14"></img></h1>
            <p className="mt-4 text-lg">Your trusted partner in exploring the wonders of India.</p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-4 bg-white -mt-15">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-[#C2461C] mb-4">Our Mission</h2>
            <p className="max-w-3xl text-gray-600 leading-relaxed">
              At TravelBuddy, our mission is to simplify travel planning and inspire unforgettable journeys across the diverse landscapes of India. We believe that travel is not just about seeing new places, but about creating lasting memories. We are dedicated to providing curated experiences, reliable information, and seamless booking to help you discover the magic of India, one destination at a time.
            </p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-4 bg-gray-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-[#C2461C] mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* Team Member 1 */}
              <div className="flex flex-col">
                <div className="h-[150px] w-[150px] overflow-hidden">
                  <Image
                    src="/images/Dev1.jpg"
                    alt="Team Member"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mt-4">Vaibhav Surani</h3>
                <p className="text-[#C2461C]">Developer</p>
              </div>
              {/* Team Member 2 */}
              <div className="flex flex-col items-center">
                <div className="h-[150px] w-[150px] overflow-hidden">
                  <Image
                    src="/images/Dev2.jpg"
                    alt="Team Member"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mt-4">Yash Sorathiya</h3>
                <p className="text-[#C2461C]">Developer</p>
              </div>
              {/* Team Member 3 */}
              {/* <div className="flex flex-col items-center">
                <Image
                  src="https://placehold.co/150x150/ed8936/ffffff?text=RC"
                  alt="Team Member Avatar"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Rohan Chauhan</h3>
                <p className="text-gray-500">Lead Travel Consultant</p>
              </div> */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
