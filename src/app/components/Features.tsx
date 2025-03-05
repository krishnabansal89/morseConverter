interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

export default function Features() {
  const features: FeatureCard[] = [
    {
      title: "Instant & Accurate Conversion",
      description: "Easily translate English to Morse Code and back with precision and lightning speed.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Simple & Intuitive Interface",
      description: "No technical knowledge required—just enter text and translate instantly.",
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    },
    {
      title: "Supports All Morse Variants",
      description: "Includes international Morse code standards for complete accuracy.",
      icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    },
    {
      title: "100% Free & Accessible",
      description: "Use our Morse Code Generator online without any cost or limitations.",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      title: "Mobile-Friendly & Fast",
      description: "Works flawlessly on all devices, ensuring accessibility anywhere.",
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    },
    {
      title: "Audio Playback",
      description: "Listen to your Morse code with customizable speed and tone settings.",
      icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Translation Accuracy" },
    { value: "50+", label: "Special Characters Supported" },
    { value: "0.5s", label: "Average Translation Time" }
  ];

  return (
    <section id="features" className="py-20 bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Roboto_Mono']">
            Why Choose Our <span className="text-[#4CAF50]">Morse Code Translator</span>
          </h2>
          <p className="text-neutral-300 max-w-3xl mx-auto text-lg font-['Roboto']">
            Our advanced tool delivers exceptional performance with military-grade precision and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-neutral-900 p-6 rounded-lg border border-neutral-700 shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-[#1B5E20] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center font-['Roboto_Mono']">
                {feature.title}
              </h3>
              <p className="text-neutral-400 text-center font-['Roboto']">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-neutral-900 p-8 rounded-lg border border-neutral-700"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="text-4xl font-bold text-[#4CAF50] mb-2 font-['Roboto_Mono']">
                {stat.value}
              </div>
              <p className="text-neutral-300 font-['Roboto']">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
