// components/ui/morse-tattoo-gallery.tsx
"use client";

import * as React from "react";
import Image from "next/image";

/**
 * Minimal, content-free placeholder grid for images.
 * (No extra text beyond the markdown directive is rendered.)
 */
export default function MorseTattooGallery() {
    const images = [
        "/tattoo-images/morse-tattoo-1.jpg",
        "/tattoo-images/morse-tattoo-2.jpg",
        "/tattoo-images/morse-tattoo-3.jpg",
        "/tattoo-images/morse-tattoo-4.jpg",
        "/tattoo-images/morse-tattoo-5.jpg",
        "/tattoo-images/morse-tattoo-6.jpg",
    ];
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10"
      aria-label="Morse Tattoo Inspiration Gallery"
    >
      {images.map((image, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl border border-dashed border-[#c9c4bf] bg-white"
          aria-hidden="true"
        >
          <Image 
            src={image} 
            alt="Morse Tattoo" 
            width={1000} 
            height={1000} 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
