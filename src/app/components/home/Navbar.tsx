import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
export function Navbar() {
  return (
    <header className="flex h-20  bg-white w-[98%] mx-auto items-center justify-between md:px-18 px-4 font-poppins">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" width={50} height={50} alt="Morse Code" />
        <span className="text-[#3D3939] text-lg">
          <span className="font-semibold">Morse Code</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        
        <Link href="/morse-code-alphabets" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          Alphabets
        </Link>
        <Link href="/morse-code-numbers" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          Numbers
        </Link>
        <Link href="/morse-code-chart" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          Charts
        </Link>
        <Link href="/#" className="text-[#3D3939] text-sm hover:text-black transition-colors">
          About
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button className="hover:bg-[#1e534e] text-white bg-[#456359] rounded-md px-4 py-2">Get Started</Button>

      </div>
    </header>
  )
}

