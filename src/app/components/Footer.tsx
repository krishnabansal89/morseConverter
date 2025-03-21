
import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Twitter, Youtube  } from "lucide-react"

export default function Footer() {
    return (
        <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto   rounded-lg rounded-b-none rounded-t-none shadow-lg font-lexend">
     <footer className="md:bg-gradient-to-r bg-gradient-to-b from-[#7f615b] to-[#382a25] rounded-t-sm md:px-16 px-4 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Column 1: My Music Pie Chart */}
          <div>
            <h3 className="text-xl font-semibold mb-8 text-gray-50">Morse Code Translator</h3>
            <p className="text-white">
            Translate English to Morse code and vice versa instantly with our free Morse Code Translator. Convert, decode, and generate Morse signals easily with audio playback and sharing options.
</p>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h3 className="text-xl font-semibold mb-8 text-gray-50">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/spotify-stats" className="text-white hover:text-gray-900">
                Morse Code Alphabets
                </Link>
              </li>
              <li>
                <Link href="/top-artists" className="text-white hover:text-gray-900">
                Morse Code Numbers
                </Link>
              </li>
              <li>
                <Link href="/top-artists" className="text-white hover:text-gray-900">
                International Morse Codes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Glossary */}
          <div>
            <h3 className="text-xl font-semibold mb-8 text-gray-50">Glossary</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/artists-a-z" className="text-white hover:text-gray-900">
                  A to Z Morse Codes
                </Link>
              </li>
              <li>
                <Link href="/genres-a-z" className="text-white hover:text-gray-900">
                  0 to 9 Morse Codes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-xl font-semibold mb-8 text-gray-50">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/data-protection" className="text-white hover:text-gray-900">
                  Data Protection Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <Link href="https://instagram.com" className="text-white hover:text-gray-900">
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          
          <Link href="https://youtube.com" className="text-white hover:text-gray-900">
            <Youtube className="w-6 h-6" />
            <span className="sr-only">YouTube</span>
          </Link>
        </div>

        {/* Footer Credits */}
        <div className="text-center text-white">

          <p>© 2025 Morse Code Translator. All rights reserved</p>
        </div>
      </div>
    </footer>
        </div>
    )
}


