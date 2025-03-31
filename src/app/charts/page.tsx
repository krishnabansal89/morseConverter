import Image from "next/image";
import { Button } from "@/components/ui/button";


export default function ChartComponent()
{
    return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">
        <Image
            src={"/charts/international-morse-code.jpg"}
            alt="Alphabet Chart"
            width={1000}
            height={1000}
            className=" md:w-2/5  object-cover mt-20 rounded-lg shadow-lg mx-auto"
        />
        <div className="flex gap-2 mx-auto my-10">
        <Button asChild className="bg-[#456359] text-white hover:bg-[#324740]">
          <a href={"charts/morse-code.pdf"} download>
            Download as PDF
          </a>
        </Button>
      </div>

    </div>
    )
}