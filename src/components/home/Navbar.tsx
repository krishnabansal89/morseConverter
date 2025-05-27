"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize to detect mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header className="flex h-20 bg-white w-[98%] mx-auto items-center justify-between md:px-18 px-4 font-poppins z-50 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" width={50} height={50} alt="Morse Code" />
          <span className="text-[#3D3939] text-lg">
            <span className="font-semibold">Morse Code</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/morse-code-alphabets" className="text-[#3D3939] text-sm hover:text-black transition-colors">
            Alphabets
          </Link>
          <Link href="/morse-code-numbers" className="text-[#3D3939] text-sm hover:text-black transition-colors">
            Numbers
          </Link>
          <Link href="/morse-code-chart" className="text-[#3D3939] text-sm hover:text-black transition-colors">
            Morse Chart
          </Link>
          <Link href="/about-us" className="text-[#3D3939] text-sm hover:text-black transition-colors">
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button className="hover:bg-[#1e534e] hidden md:block text-white bg-[#456359] rounded-md px-4 py-2">Get Started</Button>
          
          {/* Hamburger Menu Button (Mobile Only) */}
          <button 
            className="md:hidden flex flex-col justify-center items-center ml-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#3D3939] transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#3D3939] my-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#3D3939] transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[250px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full px-4 py-6">
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="self-end p-2"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-6 mt-8 font-poppins ">
            <Link 
              href="/morse-code-alphabets" 
              className="text-[#3D3939] text-lg hover:text-black transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Alphabets
            </Link>
            <Link 
              href="/morse-code-numbers" 
              className="text-[#3D3939] text-lg hover:text-black transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Numbers
            </Link>
            <Link 
              href="/morse-code-chart" 
              className="text-[#3D3939] text-lg hover:text-black transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Charts
            </Link>
            <Link 
              href="/#" 
              className="text-[#3D3939] text-lg hover:text-black transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </nav>
          
          {/* Mobile Action Button */}
          <div className="mt-auto font-poppins">
            <Button 
              className="w-full hover:bg-[#1e534e] text-white bg-[#456359] rounded-md px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}
