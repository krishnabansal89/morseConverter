"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VercelBacklinkBanner() {
  const [isVercelPreview, setIsVercelPreview] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if running on Vercel preview/deployment (not production domain)
    const hostname = window.location.hostname;
    const isVercel =
      hostname.includes("vercel.app") ||
      (hostname !== "morsecodeholistic.com" &&
        hostname !== "www.morsecodeholistic.com" &&
        hostname !== "localhost");

    setIsVercelPreview(isVercel);

    // Check if user dismissed the banner in this session
    const dismissed = sessionStorage.getItem("backlink-banner-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("backlink-banner-dismissed", "true");
  };

  if (!isVercelPreview || isDismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-[100]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm md:text-base font-medium">
              You&apos;re viewing a preview version. Visit the official site for the best
              experience!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://morsecodeholistic.com"
              className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-colors duration-200 whitespace-nowrap"
              rel="noopener noreferrer"
            >
              Go to Official Site →
            </Link>
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-200 p-1 transition-colors"
              aria-label="Dismiss banner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

