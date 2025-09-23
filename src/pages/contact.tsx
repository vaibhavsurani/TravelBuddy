import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Contact Us - TravelBuddy</title>
        <meta name="description" content="Get in touch with the TravelBuddy team." />
      </Head>

      <Header />

      <main className="flex-grow">
        <div className="container mx-auto -mt-15 flex flex-col w-full items-center ">
          <div className="h-[65vh] bg-[url('/images/home3.jpg')] w-full bg-cover bg-center flex flex-col justify-center items-center text-white px-4">
            <div className="max-w-6xl">
              <h1 className="text-4xl md:text-5xl font-bold text-[#C2461C]">Get in Touch</h1>
              <p className="mt-4 text-lg text-white">We'd love to hear from you! Whether you have a question about our trips, pricing, or anything else, our team is ready to answer all your questions.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 max-w-6xl my-4 md:grid-cols-2 gap-12 items-start w-full">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
                  Submit
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
                <div className="flex items-start p-6 bg-white rounded-lg shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
                        <p className="text-gray-600 mt-1">123 Travel Lane, New Delhi, India</p>
                    </div>
                </div>
                 <div className="flex items-start p-6 bg-white rounded-lg shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                        <p className="text-gray-600 mt-1">support@travelbuddy.com</p>
                    </div>
                </div>
                 <div className="flex items-start p-6 bg-white rounded-lg shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
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
