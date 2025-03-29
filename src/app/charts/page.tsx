import Image from "next/image";


export default function ChartComponent()
{
    return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">
        <Image
            src={"/charts/alphabet-chart.jpg"}
            alt="Alphabet Chart"
            width={1000}
            height={1000}
            className=" md:w-2/5  object-cover mt-20 rounded-lg shadow-lg mx-auto"
        />
        <Image
            src={"/charts/numbers-chart.png"}
            alt="Alphabet Chart"
            width={1000}
            height={1000}
            className=" md:w-2/5  object-cover mt-20 rounded-lg shadow-lg mx-auto"
        />
    </div>
    )
}