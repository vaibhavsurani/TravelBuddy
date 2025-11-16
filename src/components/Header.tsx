import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Compass, Info, Phone, User, LogIn, LogOut } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home size={20} /> },
  { href: '/destinations', label: 'Destinations', icon: <Compass size={20} /> },
  { href: '/about', label: 'About', icon: <Info size={20} /> },
  { href: '/contact', label: 'Contact', icon: <Phone size={20} /> },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPast400px, setIsPast400px] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Auth state
  const { user, profile, logout } = useUser();
  // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // <-- REMOVED

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setIsPast400px(currentScrollY > 400);

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

  // Logout handler
  const handleLogout = async () => {
    await logout();
    setIsSidebarOpen(false); // Close sidebar on logout
  };

  // const openAuthModal = () => {  // <-- REMOVED
  //   setIsSidebarOpen(false);
  //   setIsAuthModalOpen(true);
  // };
  
  const headerClasses = isScrolled
    ? ' shadow-md rounded-md'
    : 'bg-transparent text-white';

  const headerClasses2 = isPast400px
    ? 'bg-white'
    : 'bg-transparent text-white';

  const linkColor = isPast400px ? 'text-[#C2461C]' : 'text-white';
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
            
            <hr className="my-4 border-gray-200" />
            
            {user ? (
              <>
                <li className="mb-4">
                  <Link
                    href="/profile"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                  >
                    <User size={20} />
                    <span className="font-semibold">{profile?.full_name || 'My Profile'}</span>
                  </Link>
                </li>
                <li className="mb-4">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                  >
                    <LogOut size={20} />
                    <span className="font-semibold">Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li className="mb-4">
                {/* --- UPDATED: This is now a Link, not a button --- */}
                <Link
                  href="/auth"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center space-x-4 p-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                >
                  <LogIn size={20} />
                  <span className="font-semibold">Login / Sign Up</span>
                </Link>
              </li>
            )}
            
          </ul>
        </nav>
      </aside>

      {/* --- REMOVED Auth Modal --- */}
      {/* {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />} */}
    </>
  );
};

export default Header;