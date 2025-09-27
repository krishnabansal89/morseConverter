import MorseConverter from "./Translator";
import Link from "next/link";
export default function Hero() {
    return (
        <div className="hero bg-background text-foreground w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">
            <div className="w-full h-fit md:my-20 my-10 grid md:px-10  md:grid-cols-[65%_35%] grid-cols-1 justify-center ">
                <div className="flex  items-center  ">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-foreground  tracking-tight md:px-4 font-poppins">Morse Code Translator  <br></br> Instant<span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text"> Encoding & Decoding. </span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-foreground tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Translate English to Morse code and vice versa instantly with our free Morse Code Translator. Convert, decode, and generate Morse signals easily with audio playback and sharing options.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <Link href="/morse-code-machine" className="bg-primary mr-6 text-white px-4 py-2 rounded-lg font-poppins hover:opacity-90">Morse Machine</Link>
                            <a href="#converter" className="bg-primary text-white px-4 py-2 rounded-lg font-poppins hover:opacity-90">Visit Store</a>

                        </button>
                        
                    </div>
                </div>

            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-card rounded-lg shadow-lg">
                    <MorseConverter language="en" />
                </div>
            </div>
        </div>
    );
}