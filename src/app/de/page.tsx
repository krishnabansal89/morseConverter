import MorseConverter from "@/components/home/Translator";
import Markdown from "react-markdown";
import { FAQSchemaLD } from "@/components/FAQSchemaLD";


function Hero() {
    return (
        <div className="hero bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">
            <div className="w-full h-fit md:my-20 my-10 grid md:px-10  md:grid-cols-[65%_35%] grid-cols-1 justify-center ">
                <div className="flex  items-center  ">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-poppins">Morsecode-Übersetzer <br></br> Sofortiges<span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text"> Kodieren & Dekodieren. </span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-[#2d2d2d] tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Übersetzen Sie Deutsch in Morsecode und umgekehrt sofort mit unserem kostenlosen Morsecode-Übersetzer. Konvertieren, dekodieren und generieren Sie Morsecodesignale einfach mit Audiowiedergabe und Freigabeoptionen.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-[#456359] mr-6 text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Loslegen</a>
                            <a href="#converter" className="bg-[#456359] text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Shop besuchen</a>

                        </button>

                    </div>
                </div>

            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-white rounded-lg shadow-lg">
                    <MorseConverter language="de" />
                </div>
            </div>
        </div>
    );
}

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Breadcrumb from "@/components/breadcrumb";

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
            type: "Produkt",
            title: "Internationaler Code-Übersetzer",
            description: "Übersetzen Sie Englisch präzise in internationalen Morsecode und zurück.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Produkt",
            title: "Amerikanischer Code-Übersetzer",
            description: "Übersetzen Sie Englisch präzise in amerikanischen Morsecode und zurück.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Produkt",
            title: "Morsecode-Maschine",
            description: "Wandeln Sie das Tippen sofort in Morsecode um. Die Morsegeschwindigkeit ist konfigurierbar und kann Pieptöne, ein Blinklicht oder Vibration sein.",
            href: "/morse-code-machine",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Produkt",
            title: "Morsecode-Übersetzer Audio",
            description: "Hören Sie Morsecode-Audiosignale für jeden Text.",
            href: "/morse-code-translator-audio",
            bgColor: "bg-[#31304D]"
        },
        {
            type: "Produkt",
            title: "Morsecode-Generator",
            description: "Erstellen Sie Morsecodesignale mit einstellbarer Wiedergabegeschwindigkeit.",
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
                            Testen Sie unsere kostenlosen Morse-Tools
                        </h2>
                        <p className="text-neutral-600 font-maitree">
                            Entdecken Sie unsere Morsecode-Tools und -Dienste
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
                    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Warum unseren Morsecode-Übersetzer wählen?
                    </h2>
                    <p className="text-neutral-600 font-maitree">
                        Entdecken Sie unsere Morsecode-Funktionen
                    </p>
                </div>


            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-[75%]   flex flex-col gap-4">
                    <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
                            <FeatureBlock title="Sofortige & genaue Konvertierung" description="Übersetzen Sie Englisch einfach und präzise in Morsecode und zurück." />
                        </div>
                        <div className="flex-col flex  bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl ">
                            <FeatureBlock title="Einfache & intuitive Benutzeroberfläche" description="Keine technischen Kenntnisse erforderlich – einfach Text eingeben und sofort übersetzen." />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl">
                            <FeatureBlock title="Unterstützt alle Morsecode-Varianten" description="Beinhaltet internationale Morsecode-Standards für Genauigkeit." />
                        </div>

                        <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
                            <FeatureBlock title="100% sicher & zugänglich" description="Nutzen Sie unseren Morsecode-Generator mit 100%iger Sicherheit und er ist für alle vollständig zugänglich." />
                        </div>
                    </div>

                </div>
                <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
                    <FeatureBlock title="Mobilfreundlich & Schnell" description="Funktioniert einwandfrei auf allen Geräten und gewährleistet jederzeit Zugänglichkeit." />
                </div>

            </div>

        </div>
    )
}

function HowToUse() {
    return (
      <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
        <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
        <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Wie man den Morsecode-Übersetzer benutzt</h2>
        <p className="text-neutral-600 font-maitree">
          Sehen Sie sich das Morsecode-Tool-Explorationsvideo an
        </p>
        <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
          <iframe src="https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2" loading="lazy" title="Morsecode-Übersetzer - Englisch sofort in Morsecode umwandeln & dekodieren" allow="clipboard-write" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} ></iframe>
          </div>
      </div>
    </div>
    )
  }


function Content() {
  const content = `## **Der ultimative Online-Morsecode-Übersetzer & -Generator – Kodieren & Dekodieren von Text zu Englisch**
Suchen Sie den besten Morsecode-Übersetzer? Unser fortschrittlicher Morsecode-Generator wandelt Englisch mit außergewöhnlicher Genauigkeit und Geschwindigkeit in Morsecode um und umgekehrt. Ob Sie einen Morsecode-Dekodierer zum **Entschlüsseln von Nachrichten** oder einen Morse-Übersetzer zum Kodieren benötigen, unser Tool ist auf Ihre Bedürfnisse zugeschnitten. Mit einer benutzerfreundlichen Oberfläche und sofortiger Verarbeitung können Sie Morsecode nahtlos in Englisch übersetzen oder Text in Sekundenschnelle in Morsecode umwandeln.

## **Warum unseren Morsecode-Übersetzer wählen?**

* **Sofortige & genaue Konvertierung:** Übersetzen Sie **Englisch in Morsecode** und zurück einfach und präzise.  
* **Einfache & intuitive Benutzeroberfläche:** Keine technischen Kenntnisse erforderlich – einfach Text eingeben und sofort übersetzen.  
* **Unterstützt alle Morsecode-Varianten:** Beinhaltet internationale Morsecode-Standards für Genauigkeit.  
* **100% kostenlos & zugänglich:** Nutzen Sie unseren **Morsecode-Generator** online ohne Kosten.  
* **Mobilfreundlich & Schnell:** Funktioniert einwandfrei auf allen Geräten und gewährleistet jederzeit Zugänglichkeit.

## **Wie man den Morsecode-Übersetzer benutzt**

1. **Text oder Morsecode eingeben:** Geben Sie englischen Text oder Morsecode-Symbole ein.  
2. **Klicken Sie auf ‚Übersetzen‘:** Unser fortschrittlicher **Morsecode-Dekodierer** wird Ihren Text sofort umwandeln.  
3. **Kopieren oder Teilen:** Kopieren Sie die übersetzte Ausgabe oder teilen Sie sie mit einem einzigen Klick mit anderen.

## **Morsecode-Generator – Erstellen Sie einfach Morsecodesignale**
Benötigen Sie ein Werkzeug zum Generieren von Morsecodesignalen? Unser **Morsecode-Generator** wandelt Text in Echtzeit in Morse-Pieptöne um. Egal, ob Sie Morsecode für Amateurfunk, Notfallkommunikation oder aus persönlichem Interesse lernen, unser Tool bietet eine einfache und effiziente Möglichkeit, Morsecode zu üben.

## **Morsecode sofort in Englisch umwandeln**
Wenn Sie eine Reihe von Punkten und Strichen haben und einen **Morsecode-Dekodierer** benötigen, bietet unser Tool eine Echtzeitumwandlung. Geben Sie einfach den Morsecode ein, und unser System übersetzt ihn sofort zurück ins Englische.

## **Funktionen unseres Morsecode-Übersetzers**

* **Bidirektionale Übersetzung:** Wechseln Sie einfach zwischen **Morsecode zu Englisch** und **Englisch zu Morsecode**.  
* **Audiowiedergabe:** Hören Sie Morse-Pieptöne, um das Lernen zu verstärken.  
* **Kopier- & Teilfunktion:** Teilen Sie Ihre Morsecode-Übersetzungen einfach.  
* **Pädagogische & praktische Anwendungen:** Ideal zum Lernen, Testen und für die Notfallkommunikation.

## **Gängige Morsecode-Übersetzungen**

Hier sind einige schnelle Morsecode-Umwandlungen für häufig verwendete Wörter:

* **Hallo:** …. . .-.. .-.. ---  
* **SOS:** … --- …  
* **Liebe:** .-.. --- …- .  
* **Ja:** \-.-- . …  
* **Nein:** \-. \---

`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:pt-20 pt-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center md:mb-12 mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Morsecode vereinfacht </h2>
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
### **1. Was ist Morsecode?**

Morsecode ist eine Methode zur Kodierung von Text mithilfe von Punkten (.) und Strichen (-), um Buchstaben und Zahlen darzustellen. Ursprünglich für die Telegrafie entwickelt, bleibt er ein wesentliches Werkzeug für die Notfallkommunikation.

### **2. Wie benutze ich einen Morsecode-Übersetzer?**

Geben Sie einfach Text oder Morsecode in das Eingabefeld ein, klicken Sie auf ‚Übersetzen‘ und erhalten Sie sofort Ergebnisse entweder im englischen oder im Morsecode-Format.

### **3. Kann ich Morsecode-Audio anhören?**

Ja! Unser **Morsecode-Generator** ermöglicht es Ihnen, Morse-Pieptöne zu hören, was das Lernen und Üben erleichtert.

### **4. Wird Morsecode heute noch verwendet?**

Ja! Morsecode wird weltweit immer noch aktiv in der Luftfahrt, im Amateurfunk (Ham Radio) und bei Notrufsignalen eingesetzt.

### **5. Kann ich Morsecode manuell dekodieren?**

Ja, aber es erfordert das Auswendiglernen der Morsecode-Symbole für jeden Buchstaben und jede Zahl. Unser **Morsecode-Dekodierer** vereinfacht dies durch sofortige Textumwandlung.

`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:py-20 py-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <FAQSchemaLD markup={content} />
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Häufig gestellte Fragen</h2>
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
