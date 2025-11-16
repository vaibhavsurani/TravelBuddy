import Head from 'next/head';
import Header from '@/components/Header'; // Assuming paths are correct
import Footer from '@/components/Footer'; // Assuming paths are correct
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    // Updated page background
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Head>
        <title>Contact Us - TravelBuddy</title>
        <meta
          name="description"
          content="Get in touch with the TravelBuddy team."
        />
      </Head>

      <Header />

      <main className="flex-grow">
        <div className="container mx-auto -mt-15 flex flex-col w-full items-center ">
          {/* Hero section - kept as is, title color already matches */}
          <div className="h-[65vh] bg-[url('/images/home3.jpg')] w-full bg-cover bg-center flex flex-col justify-center items-center text-white px-4">
            <div className="max-w-6xl px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#C2461C]">
                Get in Touch
              </h1>
              <p className="mt-4 text-lg text-white">
                We'd love to hear from you! Whether you have a question about our
                trips, pricing, or anything else, our team is ready to answer
                all your questions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 max-w-6xl px-6 my-12 md:grid-cols-2 gap-12 items-start w-full">
            {/* Contact Form */}
            {/* Updated card styling */}
            <div className="bg-white px-8 py-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-[#C2461C] mb-6">
                Send us a Message
              </h2>
              <form className="space-y-4">
                <div>
                  {/* Updated label styling */}
                  <label
                    htmlFor="name"
                    className="block text-md font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  {/* Updated input styling */}
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-md font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    required
                  ></textarea>
                </div>
                {/* Updated button styling */}
                <button
                  type="submit"
                  className=" bg-[#C2461C] text-white font-bold py-2 px-3 rounded-lg hover:bg-[#C2461C]/80 transition text-md focus:outline-none focus:ring-4 focus:ring-[#E9743C]/50"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Updated info card styling */}
              <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                {/* Updated icon styling */}
                <div className="bg-[#C2461C]/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-[#C2461C]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-[#C2461C]">
                    Our Office
                  </h3>
                  <p className="text-gray-600 mt-1">
                    123 Travel Lane, New Delhi, India
                  </p>
                </div>
              </div>
              <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="bg-[#C2461C]/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-[#C2461C]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-[#C2461C]">
                    Email Us
                  </h3>
                  <p className="text-gray-600 mt-1">support@travelbuddy.com</p>
                </div>
              </div>
              <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="bg-[#C2461C]/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-[#C2461C]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-[#C2461C]">
                    Call Us
                  </h3>
                  <p className="text-gray-600 mt-1">+91 123 456 7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;