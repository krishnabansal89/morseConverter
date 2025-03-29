export default function HowToUse() {
  return(
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
      <div className="mt-20  flex flex-col items-center justify-center ">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-12 tracking-tight md:px-10 font-poppins">How to use Morse Code Translator</h2>
      <div className="md:w-[64vw] w-[80vw]   rounded-2xl overflow-hidden bg-amber-300 md:h-[36vw] h-[45vw] mx-auto mt-10 relative" >
        <iframe src="https://www.youtube.com/embed/lgsD_wSZ0hI" style={{
            width: '100%',
            height: '100%',
          }}
></iframe>

      </div>
      </div>
    </div>
  )
}