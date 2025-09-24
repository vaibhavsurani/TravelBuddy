import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // 1. Imported icons

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-8 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 pr-12">
              <img src="/images/TravelBuddy-orange.png" alt="TravelBuddy Logo"></img>
            </h3>
            <p className="text-gray-400">
              Your ultimate guide to exploring the wonders of India. Plan your trip with us and create unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#C2461C]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="/destinations" className="text-gray-400 hover:text-white transition-colors">Packages</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#C2461C]">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@travelbuddy.com</li>
              <li>Phone: +91 12345 67890</li>
              <li>Address: 123 Travel Lane, Vadodara, Gujarat</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#C2461C]">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest travel updates and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#C2461C] hover:bg-[#C2461C]/60 px-4 py-2 rounded-l-xl rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 <span className="text-[#E9743C]">TravelBuddy. </span>All rights reserved.</p>
          
          {/* 2. Replaced text with icon components */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="X" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;