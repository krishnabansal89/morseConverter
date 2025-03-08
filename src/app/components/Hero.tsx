import MorseConverter from "./Translator";

export default function Hero() {
    return (
        <div className="hero bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg shadow-lg h-fit flex flex-col ">
            <div className="w-full h-fit my-20 grid  md:grid-cols-[60%_40%] grid-cols-1 justify-center  items-start">
                <div className="flex justify-center items-center ">
                    <h1 className="md:text-6xl/snug text-5xl/snug font-medium text-[#2d2d2d] tracking-tight md:px-20 font-[lexend]">Morse Code Translator</h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-10 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-[#6c6860] tracking-tight w-[90%] font-medium text-justify  text-lg font-lexend">Translate English to Morse code and vice versa instantly with our free Morse Code Translator. Convert, decode, and generate Morse signals easily with audio playback and sharing options.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-[#456359] text-white p-4 rounded-4xl font-lexend hover:bg-[#324740]">Get Started</a>
                        </button>
                    </div>
                </div>

            </div>
            <div className="editor-container w-full h-fit flex justify-center items-center md:pr-10 md:ml-10">
                <div className="editor-window md:w-[90%] h-full bg-[#f5f5f5] rounded-lg shadow-lg">
                    <MorseConverter />
                </div>
            </div>
        </div>
    );
}