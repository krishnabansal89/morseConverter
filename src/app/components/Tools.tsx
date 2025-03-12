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
        <div className={`rounded-3xl p-8  bg-[${bgColor}]  h-full`}>
            <div className="flex flex-col h-full">
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-white rounded-full">{type}</span>
                </div>

                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-[#2d2d2d]/90 ">{title}</h3>
                    <Link href={href} className="bg-[#2d2d2d] rounded-full p-2 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-white" />
                    </Link>
                </div>

                <p className="text-[#ffffff]/70 text-lg">{description}</p>
            </div>
        </div>
    )
}

export default function Features() {

    const features = [
        {
            type: "Product",
            title: "Morse Code Translator",
            description: "Translate English to Morse Code and back with precision.",
            href: "/morse-code-translator",
            bgColor: "#85ad85"
        },
        {
            type: "Product",
            title: "Morse Code Generator",
            description: "Create Morse signals with adjustable playback speed.",
            href: "/morse-code-generator",
            bgColor: "#99ad85"
        },
        {
            type: "Product",
            title: "Morse Code Generator",
            description: "Create Morse signals with adjustable playback speed.",
            href: "/morse-code-generator",
            bgColor: "#adad85"
        },
        {
            type: "Product",
            title: "Morse Code Generator",
            description: "Create Morse signals with adjustable playback speed.",
            href: "/morse-code-generator",
            bgColor: "#99ad85"
        },
        {
            type: "Product",
            title: "Morse Code Generator",
            description: "Create Morse signals with adjustable playback speed.",
            href: "/morse-code-generator",
            bgColor: "#85ad85"
        },
    ]

    return (
        <section id="features" className="bg-[rgb(236,232,228)] w-[98%] py-20 md:px-20 mx-auto p-4 rounded-lg rounded-b-none shadow-lg h-fit flex flex-col font-lexend">
            <div className="container mx-auto px-4">
                <div className=" mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
                            Try our Free Morse Tools 
                        </h2>
                        <p className="text-neutral-600">
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
