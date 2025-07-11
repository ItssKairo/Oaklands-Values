'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    

    window.addEventListener('scroll', handleScroll);
    

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>

      {showBanner && (
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white text-center py-2 px-4 relative">
          <p className="text-sm font-semibold">
            Oakland Values – Early Beta: Some if not all API data may be incorrect compared to real in-game values.
          </p>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
            aria-label="Dismiss banner"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      

      <nav 
        className={`sticky top-0 z-40 bg-[var(--card-bg)] border-b border-[var(--border-color)] px-6 transition-all duration-[var(--animation-duration-fast)] ${scrolled ? 'py-2' : 'py-4'}`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className={`font-bold mb-4 sm:mb-0 transition-all duration-[var(--animation-duration-fast)] ${scrolled ? 'text-xl' : 'text-2xl'}`} aria-label="Go to home page">
            Oaklands Values
          </Link>
          
          <div className="flex space-x-8">
            <Link 
              href="/stock-market" 
              className={`text-base font-medium ${pathname === '/stock-market' ? 'text-[var(--accent-purple)] border-b-2 border-[var(--accent-purple)]' : 'text-gray-300 hover:text-white'} transition-all duration-[var(--animation-duration-fast)] py-2`}
              aria-label="Go to Stock Market page"
            >
              Stock Market
            </Link>
            <Link 
              href="/leaderboard" 
              className={`text-base font-medium ${pathname === '/leaderboard' ? 'text-[var(--accent-purple)] border-b-2 border-[var(--accent-purple)]' : 'text-gray-300 hover:text-white'} transition-all duration-[var(--animation-duration-fast)] py-2`}
              aria-label="Go to Leaderboard page"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}