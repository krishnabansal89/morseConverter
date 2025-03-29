import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import Tools from "./components/home/Tools";
import HowToUse from "./components/home/HowToUse";
import BlogGrid from "./components/home/Blogs";
import Faq from "./components/home/FAQ";
import Content from "./components/home/Content";
export default function Home() {
  return (
    <div className="bg-white h-full w-full m-0 p-0 ">
      <Hero />
      <Tools />
      <Features />
      <HowToUse />
      <Content />
      <BlogGrid />
      <Faq />
    </div>
  );

}
