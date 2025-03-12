import MorseConverter from "./Translator";

export default function Hero() {
    return (
        <div className="hero bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none shadow-lg h-fit flex flex-col ">
            <div className="w-full h-fit my-20 grid  md:grid-cols-[60%_40%] grid-cols-1 justify-center  items-start">
                <div className="flex justify-center items-center ">
                    <h1 className="xl:text-6xl/snug lg:text-5xl/snug  text-4xl/snug  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-[lexend]">Morse Code <br></br> Translator – Instant  <br></br><span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text"> Encoding & Decoding! </span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-10 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-[#6c6860] tracking-tight w-[90%] font-medium text-justify  text-lg font-lexend">Translate English to Morse code and vice versa instantly with our free Morse Code Translator. Convert, decode, and generate Morse signals easily with audio playback and sharing options.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-[#456359] mr-6 text-white p-4 rounded-lg font-lexend hover:bg-[#324740]">Get Started</a>
                            <a href="#converter" className="bg-[#456359] text-white p-4 rounded-lg font-lexend hover:bg-[#324740]">Visit Store</a>

                        </button>
                        
                    </div>
                </div>

            </div>
            <div className="editor-container w-[100%] h-fit flex justify-center items-center ">
                <div className="editor-window w-full h-full bg-[#f5f5f5] rounded-lg shadow-lg">
                    <MorseConverter />
                </div>
            </div>
        </div>
    );
}