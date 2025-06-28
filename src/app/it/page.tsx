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
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-poppins">Codice Morse Traduttor <br></br> <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text">Converti & Decodifica Istantaneamente.</span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-[#2d2d2d] tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Traduci istantaneamente dall&apos;italiano al codice Morse e viceversa con il nostro Codice Morse Traduttor gratuito. Converti, decodifica e genera segnali Morse facilmente, con riproduzione audio e opzioni di condivisione.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-[#456359] mr-6 text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Iniziare</a>
                            <a href="#converter" className="bg-[#456359] text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Visita Negozio</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-white rounded-lg shadow-lg">
                    <MorseConverter language="it" />
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
            type: "Prodotto",
            title: "Traduttore Codice Internazionale",
            description: "Traduci precisamente dall'italiano al codice Morse internazionale e viceversa.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Prodotto",
            title: "Traduttore Codice Americano",
            description: "Traduci precisamente dall'italiano al codice Morse americano e viceversa.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Prodotto",
            title: "Macchina per Codice Morse",
            description: "Converti istantaneamente la digitazione in codice Morse. La velocità del Morse è configurabile e può essere segnali acustici, una luce lampeggiante o vibrazione.",
            href: "/morse-code-machine",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Prodotto",
            title: "Generatore di Codice Morse",
            description: "Crea segnali in codice Morse con velocità di riproduzione regolabile.",
            href: "/morse-code-generator",
            bgColor: "bg-[#31304D]"
        },
        {
            type: "Prodotto",
            title: "Generatore di Codice Morse",
            description: "Crea segnali in codice Morse con velocità di riproduzione regolabile.",
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
                            Prova i nostri strumenti Morse gratuiti
                        </h2>
                        <p className="text-neutral-600 font-maitree">
                            Scopri i nostri strumenti e servizi di codice Morse
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
                    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Perché Scegliere il Nostro Codice Morse Traduttor?
                    </h2>
                    <p className="text-neutral-600 font-maitree">
                        Scopri le nostre funzionalità del codice Morse
                    </p>
                </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-[75%]   flex flex-col gap-4">
                    <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
                            <FeatureBlock title="Conversione Istantanea e Precisa" description="Traduci facilmente dall'inglese al codice Morse e viceversa con la massima accuratezza." />
                        </div>
                        <div className="flex-col flex  bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl ">
                            <FeatureBlock title="Interfaccia Semplice e Intuitiva" description="Nessuna competenza tecnica richiesta—basta inserire il testo e cliccare su 'Traduci'." />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl">
                            <FeatureBlock title="Supporta Tutte le Varianti del Codice Morse" description="Include lo standard internazionale per una traduzione affidabile." />
                        </div>
                        <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
                            <FeatureBlock title="100% Gratuito e Accessibile" description="Utilizza il nostro generatore di codice Morse online senza costi." />
                        </div>
                    </div>
                </div>
                <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
                    <FeatureBlock title="Compatibile con Tutti i Dispositivi" description="Funziona perfettamente su smartphone, tablet e computer." />
                </div>
            </div>
        </div>
    )
}

function HowToUse() {
    return (
      <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
        <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
          <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Come Utilizzare il Codice Morse Traduttor</h2>
          <p className="text-neutral-600 font-maitree">
            Guarda il video per esplorare lo strumento del codice Morse
          </p>
          <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
            <iframe src="https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2" loading="lazy" title="Traduttore di Codice Morse - Converti e Decodifica Istantaneamente Inglese in Codice Morse" allow="clipboard-write" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} ></iframe>
          </div>
        </div>
      </div>
    )
}

function Content() {
  const content = `## **Il Miglior Traduttore e Generatore Online di Codice Morse – Codifica e Decodifica da Testo a Inglese**

Cerchi il miglior **codice morse traduttor** online? Il nostro avanzato generatore di codice Morse converte con precisione e rapidità dall'inglese al codice Morse e viceversa. Che tu abbia bisogno di un decodificatore Morse per interpretare messaggi o di un traduttore Morse per codificarli, il nostro strumento è progettato per soddisfare ogni esigenza. Grazie a un'interfaccia intuitiva e a una conversione istantanea, puoi tradurre da codice Morse a inglese o da testo a codice Morse in pochi secondi.

## **Perché Scegliere il Nostro Codice Morse Traduttor?**

* **Conversione Istantanea e Precisa:** Traduci facilmente dall'inglese al codice Morse e viceversa con la massima accuratezza.
* **Interfaccia Semplice e Intuitiva:** Nessuna competenza tecnica richiesta—basta inserire il testo e cliccare su "Traduci".
* **Supporta Tutte le Varianti del Codice Morse:** Include lo standard internazionale per una traduzione affidabile.
* **100% Gratuito e Accessibile:** Utilizza il nostro generatore di codice Morse online senza costi.
* **Compatibile con Tutti i Dispositivi:** Funziona perfettamente su smartphone, tablet e computer.

## **Come Utilizzare il Codice Morse Traduttor**

1. **Inserisci Testo o Codice Morse:** Digita il testo in inglese o i simboli in codice Morse.
2. **Clicca su "Traduci":** Il nostro decodificatore avanzato convertirà istantaneamente il contenuto.
3. **Copia o Condividi:** Copia la traduzione ottenuta o condividila facilmente con un clic.

## **Generatore di Codice Morse – Crea Segnali Morse in Tempo Reale**

Hai bisogno di uno strumento per generare segnali in codice Morse? Il nostro **codice morse traduttor** ti consente di convertire il testo in suoni Morse in tempo reale. Che tu stia imparando il codice per radioamatori, comunicazione d'emergenza o interesse personale, il nostro strumento è l'ideale per esercitarsi in modo semplice ed efficace.

## **Converti Codice Morse in Inglese Istantaneamente**

Hai una sequenza di punti e linee da decodificare? Il nostro decodificatore di codice Morse fornisce una traduzione istantanea in inglese. Basta inserire il codice Morse, e il sistema restituirà il testo corrispondente in tempo reale.

## **Funzionalità del Nostro Codice Morse Traduttor**

* **Traduzione Bidirezionale:** Passa facilmente da codice Morse a inglese e viceversa.
* **Riproduzione Audio:** Ascolta i segnali Morse per facilitare l'apprendimento.
* **Funzione di Copia e Condivisione:** Condividi rapidamente le tue traduzioni.
* **Utilizzi Educativi e Pratici:** Perfetto per studio, test ed emergenze.

## **Traduzioni Comuni in Codice Morse**

Ecco alcune conversioni rapide di parole comuni:

* **Hello:** …. . .-.. .-.. \\---
* **SOS:** … \\--- …
* **Love:** .-.. \\--- …- .
* **Yes:** \\-.-- . …
* **No:** \\-. \\---

`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:pt-20 pt-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center md:mb-12 mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Codice Morse Semplificato</h2>
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
### **1. Cos'è il Codice Morse?**

Il codice Morse è un sistema per codificare il testo tramite punti (.) e linee (-) per rappresentare lettere e numeri. Originariamente usato nel telegrafo, è ancora oggi fondamentale nelle comunicazioni d'emergenza.

### **2. Come si usa un Codice Morse Traduttor?**

Inserisci semplicemente il testo o il codice Morse nella casella, clicca su "Traduci" e ottieni immediatamente il risultato in inglese o Morse.

### **3. Posso ascoltare il codice Morse?**

Certo! Il nostro generatore offre la riproduzione audio dei segnali, facilitando l'apprendimento e l'allenamento.

### **4. Il codice Morse viene ancora utilizzato oggi?**

Sì! Il codice Morse è ancora attivamente utilizzato nell'aviazione, nella radio amatoriale e nei segnali di emergenza in tutto il mondo.

### **5. Posso decodificare manualmente il codice Morse?**

Sì, ma richiede la memorizzazione dei simboli in codice Morse per ogni lettera e numero. Il nostro decodificatore di codice Morse semplifica questo processo con la conversione istantanea del testo.
`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:py-20 py-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <FAQSchemaLD markup={content} />
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Domande Frequenti (FAQ)</h2>
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
