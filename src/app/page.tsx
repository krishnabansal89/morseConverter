import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import Tools from "./components/home/Tools";
import HowToUse from "./components/home/HowToUse";
import BlogGrid from "./components/home/Blogs";
import Faq from "./components/home/FAQ";
import Content from "./components/home/Content";
import Breadcrumb from "@/components/breadcrumb";

export const revalidate = 86400; //24hrs

export default function Home() {
  return (
    <div className="bg-white h-full w-full m-0 p-0 ">
      <div className="hidden ">
        <Breadcrumb />
      </div>
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
