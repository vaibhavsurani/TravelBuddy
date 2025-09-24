// components/Header.js

import Image from 'next/image';
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
  
  // This state remains for the background change at 10px
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 1. NEW state specifically for the logo change at 400px
  const [isPast400px, setIsPast400px] = useState(false);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Original logic for background style (unchanged)
      setIsScrolled(currentScrollY > 10);

      // 2. NEW logic to update the state for the logo change
      setIsPast400px(currentScrollY > 400);

      // Original logic for showing/hiding header (unchanged)
      if (currentScrollY < 400) {
        setShowHeader(true);
      } else {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // This logic is unchanged and still uses 'isScrolled'
  const headerClasses = isScrolled
    ? ' shadow-md rounded-md'
    : 'bg-transparent text-white';

  const headerClasses2 = isPast400px
    ? 'bg-white'
    : 'bg-transparent text-white';

  // This logic is also unchanged
  const linkColor = isPast400px ? 'text-[#C2461C]' : 'text-white';

  // 3. CHANGED: The logo source now depends on the new 'isPast400px' state
  const logoSrc = isPast400px 
    ? '/images/TravelBuddy-orange.png' 
    : '/images/TravelBuddy-white.png';

  return (
    <>
      <header
        className={`top-2 max-w-6xl mx-auto sticky w-full z-30 transition-all duration-300 ${headerClasses} ${headerClasses2} ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src={logoSrc}
              alt="TravelBuddy Logo"
              width={150}
              height={40}
              className="pointer-events-auto"
              priority
            />
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