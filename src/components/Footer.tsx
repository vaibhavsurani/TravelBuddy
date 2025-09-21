import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">TravelBuddy</h3>
            <p className="text-gray-400">
              Your ultimate guide to exploring the wonders of India. Plan your trip with us and create unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="/packages" className="text-gray-400 hover:text-white transition-colors">Packages</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@travelbuddy.com</li>
              <li>Phone: +91 12345 67890</li>
              <li>Address: 123 Travel Lane, New Delhi, India</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest travel updates and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 TravelBuddy. All rights reserved.</p>
          {/* Social Media Icons would go here */}
          <div className="flex space-x-4">
             {/* Example with simple text, you can replace with icons */}
            <a href="#" className="text-gray-400 hover:text-white">FB</a>
            <a href="#" className="text-gray-400 hover:text-white">TW</a>
            <a href="#" className="text-gray-400 hover:text-white">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

