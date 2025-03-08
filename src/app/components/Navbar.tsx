import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
export function Navbar() {
  return (
    <header className="flex h-20 bg-white items-center justify-between px-6 ">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/chip.png" width={50} height={50} alt="Morse Code" />
        <span className="text-[#3D3939] text-lg">
          <span className="font-semibold">Morse Code</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/about" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          Alphabet
        </Link>
        <Link href="/platform" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          Letters
        </Link>
        <Link href="/team" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          Numbers
        </Link>
        <Link href="/articles" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          Words
        </Link>
        <Link href="/docs" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          About
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button className="bg-[#3D3939] text-white hover:bg-[#2D2D2D] rounded-md px-4 py-2">Get Started</Button>

      </div>
    </header>
  )
}

