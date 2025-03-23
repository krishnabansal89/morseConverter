
function FeatureBlock({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-col items-center w-[90%] font-poppins py-10 text-center min-h-[30vh] mx-auto space-y-2">
      <div className="flex justify-center space-x-5 items-center  rounded-2xl">
        <h3 className="text-xl font-bold ">{title}</h3>
      </div>

      <p className="text-lg w-[90%] mx-auto mt-5 font-roboto ">{description}</p>
    </div>
  )

}

export default function Benefits() {
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">

      <div className="w-full h-fit my-20 justify-center  ">
        <div className="flex justify-center items-center text-center ">
          <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 font-poppins">Why Choose Our Morse Code Translator?
          </h1>
        </div>


      </div>

      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-[75%]   flex flex-col gap-4">
          <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
              <FeatureBlock title="Instant & Accurate Conversion " description="Easily translate English to Morse Code and back with precision." />
            </div>

            <div className="flex-col flex  bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl ">
              <FeatureBlock title="Simple & Intuitive Interface" description="No technical knowledge required—just enter text and translate instantly." />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex justify-center items-center bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl">
              <FeatureBlock title="Supports All Morse Code Variants" description="Includes international Morse code standards for accuracy."  />
            </div>

            <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
              <FeatureBlock title="100% Secured & Accessible" description="  Use our Morse code generator with 100% security and it's completely accessible to all" />
            </div>
          </div>

        </div>
        <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
          <FeatureBlock title="Mobile-Friendly & Fast" description="Works flawlessly on all devices, ensuring accessibility anywhere."  />
        </div>

      </div>

    </div>
  )
}

