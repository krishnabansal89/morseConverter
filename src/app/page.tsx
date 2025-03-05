import HeroSection from "./components/HeroSection";
import Translator from "./components/Translator";

import Features from "./components/Features";
import HowToUse from "./components/HowToUse";
import CommonTranslations from "./components/CommonTranslations";
export default function Home() {
  return (
    <>
   <HeroSection />
   <Translator />
    <Features />
    <HowToUse />
    <CommonTranslations />
    
   </>
  );
}
