import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface FeatureCardProps {
    type: string
    title: string
    description: string
    href: string
    bgColor: string
}

function FeatureCard({ type, title, description, href, bgColor }: FeatureCardProps) {

    return (
        <div className={`rounded-3xl p-8  ${bgColor}  h-full`}>
            <div className="flex flex-col h-full">
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-card rounded-full">{type}</span>
                </div>  


                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-[#f5f5f5]/90 ">{title}</h3>
                    <Link href={href} className="bg-[#2d2d2d] rounded-full p-2 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-white" />
                    </Link>
                </div>
                    

                <p className="text-[#ffffff]/70 dark:text-foreground/80 text-lg font-maitree">{description}</p>
            </div>
        </div>
    )
}

export default function Features() {

    const features = [
        {
            type: "Product",
            title: "International Code Translator",
            description: "Translate English to International Morse Code and back with precision.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Product",
            title: "American Code Translator",
            description: "Translate English to American Morse Code and back with precision.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Product",
            title: "Morse Code Machine",
            description: "Instantly convert typing to Morse Code. The Morse speed is configurable and can be beeps, a flashing light or vibration.",
            href: "/morse-code-machine",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Product",
            title: "Morse Code Translator Audio",
            description: "Listen to Morse code audio signals for any text.",
            href: "/morse-code-translator-audio",
            bgColor: "bg-[#31304D]"
        },
        {
            type: "Product",
            title: "Morse Code Translator Picture",
            description: "Upload a picture with text. We’ll run OCR in your browser and translate the extracted text into Morse code. Copy, listen, or download as audio.",
            href: "/morse-code-translator-picture",
            bgColor: "bg-[#493628]"
        },
        {
            type: "Product",
            title: "Morse Code Keyer and Sounder",
            description: "Explore the history, function, and modern uses of Morse code keyers and sounders. Learn how they shaped communication, how they work, and their relevance today in ham radio, learning, and hobby projects",
            href: "/morse-code-keyer",
            bgColor: "bg-[#5D4E37]"
        },
        {
            type: "Product",
            title: "Morse Code Game",
            description: "Test your listening skills with our interactive game. Improve your WPM speed, learn to decode dots and dashes, and challenge yourself with adaptive difficulty levels.",
            href: "/morse-code-game",
            bgColor: "bg-[#4A4458]"
        },
        {
            type: "Product",
            title: "Binary to Morse Converter",
            description: "Convert binary code to Morse code and vice versa. Bridge computer language with Morse code, perfect for learning encoding systems.",
            href: "/binary-to-morse-code-translator",
            bgColor: "bg-[#3D5A5C]"
        },
    ]

    return (
        <section id="features" className="bg-background w-[98%]  md:px-20 mx-auto p-4 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col font-poppins">
            <div className="container mx-auto px-4 md:mt-20 mt-10">
                <div className=" mx-auto">
                    <div className="text-center mb-12">
                        <h2 className=" md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-bold  mb-4">
                            Try our Free Morse Tools 
                        </h2>
                        <p className="text-muted-foreground font-maitree">
                            Explore our Morse code tools and services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature,index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
