import MorseConverter from "@/components/home/Translator";
import Markdown from "react-markdown";
import { FAQSchemaLD } from "@/components/FAQSchemaLD";
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Breadcrumb from "@/components/breadcrumb";

function Hero() {
    return (
        <div className="hero bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">
            <div className="w-full h-fit md:my-20 my-10 grid md:px-10  md:grid-cols-[65%_35%] grid-cols-1 justify-center ">
                <div className="flex  items-center  ">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-poppins">Código Morse Traductor <br></br> <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text">Convierte & Decodifica Instantáneamente.</span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-[#2d2d2d] tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Traduce texto en inglés a código Morse y viceversa con nuestro traductor gratuito de código Morse. Convierte, decodifica y genera señales Morse fácilmente con reproducción de audio y opciones para compartir.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-[#456359] mr-6 text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Empezar</a>
                            <a href="#converter" className="bg-[#456359] text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Visitar Tienda</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-white rounded-lg shadow-lg">
                    <MorseConverter language="es" />
                </div>
            </div>
        </div>
    );
}

interface FeatureCardProps {
    type: string
    title: string
    description: string
    href: string
    bgColor: string
}

function FeatureCard({ type, title, description, href, bgColor }: FeatureCardProps) {
    return (
        <div className={`rounded-3xl p-8  ${bgColor}  h-full`}>
            <div className="flex flex-col h-full">
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-white rounded-full">{type}</span>
                </div>

                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-[#f5f5f5]/90 ">{title}</h3>
                    <Link href={href} className="bg-[#2d2d2d] rounded-full p-2 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-white" />
                    </Link>
                </div>

                <p className="text-[#ffffff]/70 text-lg font-maitree">{description}</p>
            </div>
        </div>
    )
}

function Features() {
    const features = [
        {
            type: "Producto",
            title: "Traductor de Código Morse Internacional",
            description: "Traduce con precisión del inglés al código Morse internacional y viceversa.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Producto",
            title: "Traductor de Código Morse Americano",
            description: "Traduce con precisión del inglés al código Morse americano y viceversa.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Producto",
            title: "Generador de Código Morse",
            description: "Crea señales de código Morse con velocidad de reproducción ajustable.",
            href: "/morse-code-generator",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Producto",
            title: "Generador de Código Morse",
            description: "Crea señales de código Morse con velocidad de reproducción ajustable.",
            href: "/morse-code-generator",
            bgColor: "bg-[#31304D]"
        },
        {
            type: "Producto",
            title: "Generador de Código Morse",
            description: "Crea señales de código Morse con velocidad de reproducción ajustable.",
            href: "/morse-code-generator",
            bgColor: "bg-[#493628]"
        },
    ]

    return (
        <section id="features" className="bg-[rgb(236,232,228)] w-[98%]  md:px-20 mx-auto p-4 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col font-poppins">
            <div className="container mx-auto px-4 md:mt-20 mt-10">
                <div className=" mx-auto">
                    <div className="text-center mb-12">
                        <h2 className=" md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-bold  mb-4">
                            Prueba Nuestras Herramientas Morse Gratuitas
                        </h2>
                        <p className="text-neutral-600 font-maitree">
                            Descubre nuestras herramientas y servicios de código Morse
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function FeatureBlock({ title, description }: { title: string, description: string }) {
    return (
        <div className="flex flex-col items-center w-[90%] font-poppins py-10 text-center min-h-[30vh] mx-auto space-y-2">
            <div className="flex justify-center space-x-5 items-center  rounded-2xl">
                <h3 className="text-xl font-bold ">{title}</h3>
            </div>

            <p className="text-lg w-[90%] mx-auto mt-5 font-maitree ">{description}</p>
        </div>
    )
}

function Benefits() {
    return (
        <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
            <div className="w-full h-fit md:my-20 my-10 justify-center  ">
                <div className="flex flex-col justify-center items-center text-center ">
                    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">¿Por Qué Elegir Nuestro Traductor de Código Morse?
                    </h2>
                    <p className="text-neutral-600 font-maitree">
                        Descubre las características de nuestro código Morse
                    </p>
                </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-[75%]   flex flex-col gap-4">
                    <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
                            <FeatureBlock title="Conversión Instantánea y Precisa" description="Traduce fácilmente del inglés al código Morse y viceversa con la máxima precisión." />
                        </div>
                        <div className="flex-col flex  bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl ">
                            <FeatureBlock title="Interfaz Simple e Intuitiva" description="No se requieren conocimientos técnicos—simplemente ingresa el texto y haz clic en 'Traducir'." />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl">
                            <FeatureBlock title="Soporta Todas las Variantes del Código Morse" description="Incluye el estándar internacional para una traducción confiable." />
                        </div>
                        <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
                            <FeatureBlock title="100% Gratuito y Accesible" description="Utiliza nuestro generador de código Morse en línea sin costo alguno." />
                        </div>
                    </div>
                </div>
                <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
                    <FeatureBlock title="Compatible con Todos los Dispositivos" description="Funciona perfectamente en teléfonos inteligentes, tabletas y computadoras." />
                </div>
            </div>
        </div>
    )
}

function HowToUse() {
    return (
      <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
        <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
          <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Cómo Utilizar el Traductor de Código Morse</h2>
          <p className="text-neutral-600 font-maitree">
            Mira el video para explorar la herramienta de código Morse
          </p>
          <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
            <iframe src="https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2" loading="lazy" title="Traductor de Código Morse - Convierte y Decodifica Inglés a Morse Instantáneamente" allow="clipboard-write" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} ></iframe>
          </div>
        </div>
      </div>
    )
}

function Content() {
  const content = `## **El Mejor Traductor y Generador de Código Morse en Línea - Codifica y Decodifica de Texto a Inglés**

¿Buscas el mejor **código Morse traductor**? Nuestro avanzado generador de código Morse convierte texto en inglés a código Morse y viceversa con precisión y velocidad excepcionales. Ya sea que necesites un decodificador para interpretar mensajes o un traductor Morse para codificarlos, nuestra herramienta está diseñada para cubrir todas tus necesidades. Con una interfaz intuitiva y procesamiento instantáneo, puedes traducir fácilmente código Morse a inglés o convertir texto a código Morse en segundos.

## **¿Por Qué Elegir Nuestro Código Morse Traductor?**

* **Conversión Instantánea y Precisa:** Traduce fácilmente entre inglés y código Morse con alta precisión.
* **Interfaz Simple e Intuitiva:** No necesitas conocimientos técnicos; solo ingresa el texto y traduce.
* **Compatible con Todas las Variantes de Código Morse:** Incluye estándares internacionales para mayor exactitud.
* **100% Gratis y Accesible:** Usa nuestro generador de código Morse sin pagar nada.
* **Rápido y Compatible con Móviles:** Funciona perfectamente en cualquier dispositivo.

## **Cómo Usar el Traductor de Código Morse**

1. **Ingresa Texto o Código Morse:** Introduce texto en inglés o símbolos Morse.
2. **Haz Clic en "Traducir":** Nuestro decodificador avanzando convertirá tu entrada al instante.
3. **Copia o Comparte:** Copia el resultado o compártelo fácilmente con un solo clic.

## **Generador de Código Morse - Crea Señales Morse Fácilmente**

¿Necesitas una herramienta para generar señales Morse? Nuestro generador de código Morse transforma texto en sonidos de puntos y rayas en tiempo real. Ya sea que estés aprendiendo Morse para radioaficionados, comunicación de emergencia o por interés personal, nuestra herramienta ofrece una forma fácil y eficiente de practicar.

## **Convierte Código Morse a Inglés al Instante**

¿Tienes una serie de puntos y rayas y necesitas un decodificador? Nuestra herramienta ofrece conversión en tiempo real. Simplemente introduce el código Morse y obtendrás la traducción inmediata al inglés.

## **Funciones del Traductor de Código Morse**

* **Traducción Bidireccional:** Cambia fácilmente entre inglés y código Morse.
* **Reproducción de Audio:** Escucha los sonidos del código Morse para reforzar el aprendizaje.
* **Funcionalidad de Copiar y Compartir:** Comparte tus traducciones con facilidad.
* **Uso Educativo y Práctico:** Ideal para aprender, practicar y comunicar en emergencias.

## **Traducciones Comunes en Código Morse**

Algunas conversiones rápidas de palabras comunes al código Morse:

* **Hola:** …. . .-.. .-.. \\---
* **SOS:** … \\--- …
* **Amor:** .-.. \\--- …- .
* **Sí:** \\-.-- . …
* **No:** \\-. \\---
`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:pt-20 pt-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center md:mb-12 mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Código Morse Simplificado</h2>
      <Markdown components={{
        h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-[#2d2d2d] font-medium  my-6   ">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-[#2d2d2d]">{children}</h3>,
        p: ({ children }) => <p className="mt-2 font-maitree  text-[#2d2d2d] ml-4 text-lg/relaxed font-extralight">{children}</p>,
        br: () => <br />,
        li: ({ children }) => <li className="text-[#2d2d2d] list-disc ml-10 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
      }} >{content}</Markdown>
    </div>
  );
}

function Faq() {
  const content = `
### **1. ¿Qué es el Código Morse?**

Es un método para codificar texto mediante puntos (.) y rayas (-) que representan letras y números. Se creó originalmente para la telegrafía y sigue siendo una herramienta esencial en comunicaciones de emergencia.

### **2. ¿Cómo uso un Código Morse Traductor?**

Solo ingresa texto o símbolos Morse en el cuadro de entrada, haz clic en "Traducir" y obtén el resultado al instante en inglés o código Morse.

### **3. ¿Puedo escuchar el audio del Código Morse?**

¡Sí! Nuestro generador permite escuchar los sonidos del código Morse, lo cual facilita el aprendizaje y la práctica.

### **4. ¿El código Morse todavía se usa hoy?**

¡Sí! El código Morse todavía se utiliza activamente en la aviación, la radioafición y las señales de emergencia en todo el mundo.

### **5. ¿Puedo decodificar manualmente el código Morse?**

Sí, pero requiere memorizar los símbolos del código Morse para cada letra y número. Nuestro decodificador de código Morse simplifica este proceso con la conversión instantánea de texto.
`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:py-20 py-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <FAQSchemaLD markup={content} />
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Preguntas Frecuentes (FAQ)</h2>
      <Markdown components={{
        h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-[#2d2d2d]">{children}</h3>,
        p: ({ children }) => <p className="mt-2 text-[#2d2d2d]  font-maitree">{children}</p>,
        br: () => <br />,
      }} >{content}</Markdown>
    </div>
  );
}

export default function Page() {
    return(
        <div className="bg-white h-full w-full m-0 p-0 ">
        <div className="hidden ">
          <Breadcrumb />
        </div>
        <Hero />
        <Features />
        <Benefits />
        <HowToUse />
        <Content />
        <Faq />
      </div>
    )
}
