import Link from "next/link"
import { SocialIcon } from 'react-social-icons'
import LangSwitcher from "@/components/langSwitcher"
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MAIN_DOMAIN } from "@/lib/env";
export default function Footer() {
  return (
    <div className="bg-background-secondary w-[98%] mx-auto   rounded-lg rounded-b-none rounded-t-none shadow-lg font-poppins">
      <footer className="md:bg-gradient-to-r bg-gradient-to-b from-[#7f615b] to-[#382a25] dark:from-[#2a1f1b] dark:to-[#0f1210] rounded-t-sm md:px-16 px-4 py-16">
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
                <Link href="/morse-code-alphabets" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                  Morse Code Alphabets
                </Link>
              </li>
                <li>
                  <Link href="/morse-code-numbers" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    Morse Code Numbers
                  </Link>
                </li>
                <li>
                  <Link href="/international-morse-code" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    International Morse Code
                  </Link>
                </li>
                <li>
                  <Link href="/american-morse-code-translator" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    American Morse Code
                  </Link>
                </li>
                <li>
                  <Link href="/morse-code-machine" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    Morse Code Machine
                  </Link>
                </li>
                <li>
                  <Link href="/morse-code-chart" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    Morse Code Chart
                  </Link>
                </li>
                <li>
                  <Link href="/morse-code-translator-audio" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    Morse Code Translator Audio
                  </Link>
                </li>
                  <li>
                    <Link href="/morse-code-translator-picture" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                      Morse Code Translator Picture
                    </Link>
                  </li>
                  <li>
                    <Link href="/morse-code-punctuation" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                      Morse Code Punctuation
                    </Link>
                  </li>
                  <li>
                    <Link href="/morse-code-tattoo" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                      Morse Code Tattoo
                    </Link>
                  </li>
                  <li>
                    <Link href="/morse-code-key" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                      Morse Code Keyer
                    </Link>
                  </li>
              </ul>
            </div>

            {/* Column 3: Glossary */}
            <div>
              <h3 className="text-xl font-semibold mb-8 text-gray-50">Glossary</h3>
              <ul className="space-y-2 font-maitree">
                <li>
                  <Link href="/morse-code-alphabets" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    A to Z Morse Codes
                  </Link>
                </li>
                <li>
                  <Link href="/morse-code-numbers" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    0 to 9 Morse Codes
                  </Link>
                </li>
                <li>
                  <Link href="/morse-code-word" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    Morse Code Words
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
                  <Link href="/about-us" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    About Us
                  </Link>
                </li>
                <li>
                  {/* Corrected href */}
                  <Link href="/privacy-policy" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  {/* Corrected href */}
                  <Link href="/data-protection-policy" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    Data Protection Policy
                  </Link>
                </li>
                <li>
                  {/* Corrected href */}
                  <Link href="/contact-us" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    Contact Us
                  </Link>
                </li>
                {/* Added How It Works link */}
                <li>
                  <Link href="/how-it-works" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    How It Works
                  </Link>
                </li>
                {/* Added FAQ link */}
                <li>
                  <Link href="/faq" className="text-white hover:text-gray-900 dark:hover:text-gray-200">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-8">



            <SocialIcon target="_blank" url="https://www.pinterest.com/morsecodde/" className="text-white hover:text-gray-900 dark:hover:text-gray-200" ></SocialIcon>


            <SocialIcon target="_blank" url="http://www.youtube.com/@LearnMorseCode-l4u" />


            <SocialIcon target="_blank" url="https://www.reddit.com/user/Western_Hunter821/" />
          </div>

          {/* Footer Credits */}
          <div className="text-center text-white font-maitree">
            <p>© 2025 <Link href={MAIN_DOMAIN} className="hover:underline" rel="noopener">Morse Code Translator</Link>. All rights reserved</p>
            <p className="text-sm mt-2">Official website: <Link href={MAIN_DOMAIN} className="hover:underline font-semibold" rel="noopener">{MAIN_DOMAIN.replace('https://', '')}</Link></p>
          </div>
          <div className="text-center text-white font-maitree mt-4 flex justify-center items-center gap-x-4">
            <LangSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </footer>
    </div>
  )
}


