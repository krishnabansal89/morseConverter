import Hero from "./components/Hero";
import Features from "./components/Features";
import Tools from "./components/Tools";
import HowToUse from "./components/HowToUse";
import BlogGrid from "./components/Blogs";
import Faq from "./components/FAQ";
export default function Home() {
  return (
    <div className="bg-white h-full w-full m-0 p-0 ">
      <Hero />
      <Tools />
      <Features />
      <HowToUse />
      <BlogGrid />
      <Faq />
    </div>
  );

}
