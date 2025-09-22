// components/Header.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Compass, Info, Phone } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home size={20} /> },
  { href: '/destinations', label: 'Destinations', icon: <Compass size={20} /> },
  { href: '/about', label: 'About', icon: <Info size={20} /> },
  { href: '/contact', label: 'Contact', icon: <Phone size={20} /> },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for styling the header (transparent vs. solid)
  const [isScrolled, setIsScrolled] = useState(false);
  
  // New states to control visibility based on scroll direction
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // This part handles the background style change
      setIsScrolled(currentScrollY > 10);

      // This is the new logic for showing/hiding the header
      if (currentScrollY < 400) {
        // Always show header if near the top
        setShowHeader(true);
      } else {
        if (currentScrollY > lastScrollY) {
          // If scrolling down, hide the header
          setShowHeader(false);
        } else {
          // If scrolling up, show the header
          setShowHeader(true);
        }
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Dynamically change style classes based on scroll state
  const headerClasses = isScrolled
    ? 'bg-white top-2 max-w-7xl shadow-md rounded-md' // Scrolled state
    : 'bg-transparent text-white'; // Top of page state (changed to transparent and white text)

  const linkColor = isScrolled ? 'text-gray-800' : 'text-black'; // Text is white at the top

  return (
    <>
      <header
        className={`mx-auto sticky z-30 transition-all duration-300 ${headerClasses} ${
          // Add these classes for the show/hide animation
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <Link href="/" className={`text-2xl font-bold pointer-events-auto ${linkColor}`}>
            TravelBuddy
          </Link>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="pointer-events-auto"
            aria-label="Open menu"
          >
            <Menu size={24} className={linkColor} />
          </button>
        </div>
      </header>

      {/* --- Sidebar and Overlay --- */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex justify-end">
          <button onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
            <X size={24} className="text-gray-800" />
          </button>
        </div>
        <nav className="px-6">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href} className="mb-4">
                <Link
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                >
                  {link.icon}
                  <span className="font-semibold">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Header;