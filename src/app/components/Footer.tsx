import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { GraduationCap, Send, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#705C53] to-[#382a25] ">
            <div className="container px-4 py-12 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Logo and Description */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Image src="/chip.png" width={50} height={50} alt="Morse Code" />
                        </div>
                        <p className="text-[#f5f5f5]/50">
                            Translate English to Morse code and vice versa instantly with our free Morse Code Translator. Convert, decode, and generate Morse signals easily with audio playback and sharing options.

                        </p>
                    </div>

                    {/* Company Links */}
                    <div className="lg:col-span-1">
                        <h3 className="mb-6 text-lg font-semibold text-white">Company</h3>
                        <ul className="space-y-4">
                            {["About Us", "Privacy Policy", "Contact Us", "Blogs"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-[#f5f5f5]/50  "
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* GPA Links */}
                    <div className="lg:col-span-1">
                        <h3 className="mb-6 text-lg font-semibold text-white">Morse Converter</h3>
                        <ul className="space-y-4">
                            {[
                                "GPA Scale",
                                "Grade Scale",
                                "GPA to Percentage",
                                "Percentage to Grade Calculator",
                                "Test Grade Calculator",
                                "Easy Grader Calculator",
                                "Grading Chart",
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-[#f5f5f5]/50"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t md:flex-row">
                    <p className="text-sm text-[#f5f5f5] ">© 2025 . All rights reserved</p>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">


                        <div className="flex items-center gap-4 ml-4">
                            <Link href="#" className="text-muted-foreground hover:text-blue-600">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-blue-600">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

