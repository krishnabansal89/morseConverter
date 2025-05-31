import Link from "next/link"
import { SocialIcon } from 'react-social-icons'
import LangSwitcher from "@/components/langSwitcher"
export default function Footer() {
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto   rounded-lg rounded-b-none rounded-t-none shadow-lg font-poppins">
      <footer className="md:bg-gradient-to-r bg-gradient-to-b from-[#7f615b] to-[#382a25] rounded-t-sm md:px-16 px-4 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Column 1: My Music Pie Chart */}
            <div>
              <h3 className="text-xl font-semibold mb-8 text-gray-50">Morse Code Translator</h3>
              <p className="text-white font-maitree">
                Translate English to Morse code and vice versa instantly with our free Morse Code Translator. Convert, decode, and generate Morse signals easily with audio playback and sharing options.
              </p>
            </div>

            {/* Column 2: Pages */}
            <div>
              <h3 className="text-xl font-semibold mb-8 text-gray-50">Pages</h3>
              <ul className="space-y-2 font-maitree">                <li>
                  <Link href="/morse-code-alphabets"  className="text-white hover:text-gray-900">
                    Morse Code Alphabets
                  </Link>
                </li>
                <li>
                  <Link href="/morse-code-numbers" className="text-white hover:text-gray-900">
                    Morse Code Numbers
                  </Link>
                </li>
                <li>
                  <Link href="/international-morse-code" className="text-white hover:text-gray-900">
                    International Morse Code
                  </Link>
                </li>
                <li>
                  <Link href="/american-morse-code-translator" className="text-white hover:text-gray-900">
                    American Morse Code
                  </Link>
                </li>
                                <li>
                  <Link href="/morse-code-machine" className="text-white hover:text-gray-900">
                    Morse Code Machine
                  </Link>
                </li>
                <li>
                  <Link href="/morse-code-chart" className="text-white hover:text-gray-900">
                    Morse Code Chart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Glossary */}
            <div>
              <h3 className="text-xl font-semibold mb-8 text-gray-50">Glossary</h3>
              <ul className="space-y-2 font-maitree">
                <li>
                  <Link href="/morse-code-alphabets" className="text-white hover:text-gray-900">
                    A to Z Morse Codes
                  </Link>
                </li>
                <li>
                  <Link href="/morse-code-numbers" className="text-white hover:text-gray-900">
                    0 to 9 Morse Codes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div>
              <h3 className="text-xl font-semibold mb-8 text-gray-50">Company</h3>
              <ul className="space-y-2 font-maitree">
                <li>
                  {/* Corrected href */}
                  <Link href="/about-us" className="text-white hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li>
                  {/* Corrected href */}
                  <Link href="/privacy-policy" className="text-white hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  {/* Corrected href */}
                  <Link href="/data-protection-policy" className="text-white hover:text-gray-900">
                    Data Protection Policy
                  </Link>
                </li>
                <li>
                  {/* Corrected href */}
                  <Link href="/contact-us" className="text-white hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                {/* Added How It Works link */}
                <li>
                  <Link href="/how-it-works" className="text-white hover:text-gray-900">
                    How It Works
                  </Link>
                </li>
                {/* Added FAQ link */}
                <li>
                  <Link href="/faq" className="text-white hover:text-gray-900">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-8">



            <SocialIcon target="_blank" url="https://www.pinterest.com/morsecodde/" className="text-white hover:text-gray-900" ></SocialIcon>


            <SocialIcon target="_blank" url="http://www.youtube.com/@LearnMorseCode-l4u" />


            <SocialIcon target="_blank" url="https://www.reddit.com/user/Western_Hunter821/" />
          </div>

          {/* Footer Credits */}
          <div className="text-center text-white font-maitree">

            <p>© 2025 Morse Code Translator. All rights reserved</p>
          </div>
          <div className="text-center text-white font-maitree mt-4">
            <LangSwitcher />
          </div>
        </div>
      </footer>
    </div>
  )
}


