'use client';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <nav className="bg-neutral-900 fixed w-full z-50 px-4 py-3 flex justify-between items-center border-b border-neutral-700">
      <div className="flex items-center">
        <a href="#hero" className="text-white font-bold text-xl flex items-center">
          <span className="text-[#4CAF50] mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" stroke="#1B5E20" fill="#2E7D32" />
              <path d="M8 12h8" stroke="#4CAF50" />
              <path d="M12 8v8" stroke="#4CAF50" />
            </svg>
          </span>
          <span className="font-['Roboto_Mono,_monospace']">MorseCode</span>
        </a>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6 font-['Roboto,_sans-serif']">
        {['Home', 'Features', 'Translator', 'How to Use', 'Common Codes', 'FAQ', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white hover:text-[#4CAF50] transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Button */}
      <button
        id="mobile-menu-button"
        className="md:hidden text-white focus:outline-none"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-neutral-900 bg-opacity-95 z-50 flex-col justify-center items-center ${isMenuOpen ? 'flex' : 'hidden'}`}
      >
        <button
          id="close-menu-button"
          className="absolute top-4 right-4 text-white focus:outline-none"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul className="flex flex-col space-y-6 text-center font-['Roboto,_sans-serif']">
          {['Home', 'Features', 'Translator', 'How to Use', 'Common Codes', 'FAQ', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-white hover:text-[#4CAF50] text-xl transition-colors"
                onClick={closeMenu}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
