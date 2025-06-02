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
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-poppins">Código Morse Tradutor <br></br> <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text">Converta & Decodifique Instantaneamente.</span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-[#2d2d2d] tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Traduza instantaneamente do inglês para código Morse e vice-versa com nosso Código Morse Tradutor gratuito. Converta, decodifique e gere sinais de Morse com reprodução de áudio e opções de compartilhamento.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-[#456359] mr-6 text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Começar</a>
                            <a href="#converter" className="bg-[#456359] text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Visitar Loja</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-white rounded-lg shadow-lg">
                    <MorseConverter language="pt" />
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
            type: "Produto",
            title: "Tradutor de Código Morse Internacional",
            description: "Traduza com precisão do inglês para o código Morse internacional e vice-versa.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Produto",
            title: "Tradutor de Código Morse Americano",
            description: "Traduza com precisão do inglês para o código Morse americano e vice-versa.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Produto",
            title: "Máquina de Código Morse",
            description: "Converta instantaneamente a digitação para código Morse. A velocidade do Morse é configurável e pode ser bipes, uma luz piscante ou vibração.",
            href: "/morse-code-machine",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Produto",
            title: "Gerador de Código Morse",
            description: "Crie sinais de código Morse com velocidade de reprodução ajustável.",
            href: "/morse-code-generator",
            bgColor: "bg-[#31304D]"
        },
        {
            type: "Produto",
            title: "Gerador de Código Morse",
            description: "Crie sinais de código Morse com velocidade de reprodução ajustável.",
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
                            Experimente Nossas Ferramentas Morse Gratuitas
                        </h2>
                        <p className="text-neutral-600 font-maitree">
                            Descubra nossas ferramentas e serviços de código Morse
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
                    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Por Que Escolher Nosso Código Morse Tradutor?
                    </h2>
                    <p className="text-neutral-600 font-maitree">
                        Descubra as características do nosso código Morse
                    </p>
                </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-[75%]   flex flex-col gap-4">
                    <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
                            <FeatureBlock title="Conversão Instantânea e Precisa" description="Traduza do inglês para código Morse e vice-versa com exatidão." />
                        </div>
                        <div className="flex-col flex  bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl ">
                            <FeatureBlock title="Interface Simples e Intuitiva" description="Sem necessidade de conhecimentos técnicos—basta digitar e clicar em 'Traduzir'." />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl">
                            <FeatureBlock title="Suporte a Todos os Padrões de Código Morse" description="Compatível com normas internacionais de Morse." />
                        </div>
                        <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
                            <FeatureBlock title="100% Gratuito e Acessível" description="Use nosso gerador de código Morse online sem nenhum custo." />
                        </div>
                    </div>
                </div>
                <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
                    <FeatureBlock title="Compatível com Todos os Dispositivos" description="Funciona perfeitamente em celulares, tablets e computadores." />
                </div>
            </div>
        </div>
    )
}

function HowToUse() {
    return (
      <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
        <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
          <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Como Usar o Código Morse Tradutor</h2>
          <p className="text-neutral-600 font-maitree">
            Assista ao vídeo para explorar a ferramenta de código Morse
          </p>
          <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
            <iframe src="https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2" loading="lazy" title="Código Morse Tradutor – Converta e Decodifique Inglês para Código Morse Instantaneamente" allow="clipboard-write" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} ></iframe>
          </div>
        </div>
      </div>
    )
}

function Content() {
  const content = `## **O Melhor Código Morse Tradutor e Gerador Online – Codifique e Decodifique Texto e Inglês**

Procurando o melhor **código Morse tradutor**? Nosso avançado Gerador de Código Morse converte inglês para código Morse e o contrário com precisão e rapidez impressionantes. Seja para decifrar mensagens com um decodificador de Morse ou criar códigos com um tradutor de Morse, nossa ferramenta foi feita para você. Com uma interface intuitiva e processamento instantâneo, você pode traduzir código Morse para inglês ou converter texto em código Morse em segundos.

## **Por Que Escolher Nosso Código Morse Tradutor?**

* **Conversão Instantânea e Precisa:** Traduza do inglês para código Morse e vice-versa com exatidão.
* **Interface Simples e Intuitiva:** Sem necessidade de conhecimentos técnicos—basta digitar e traduzir.
* **Suporte a Todos os Padrões de Código Morse:** Compatível com normas internacionais de Morse.
* **100% Gratuito e Acessível:** Use nosso gerador de código Morse online sem nenhum custo.
* **Compatível com Celulares e Rápido:** Funciona perfeitamente em qualquer dispositivo.

## **Como Usar o Código Morse Tradutor**

1. **Digite Texto ou Código Morse:** Insira o texto em inglês ou os símbolos do código Morse.
2. **Clique em 'Traduzir':** Nosso decodificador avançado irá converter seu texto instantaneamente.
3. **Copie ou Compartilhe:** Copie o resultado traduzido ou compartilhe com apenas um clique.

## **Gerador de Código Morse – Crie Sinais Morse Facilmente**

Precisa de uma ferramenta para gerar sinais de código Morse? Nosso Gerador de Código Morse transforma texto em bipes de Morse em tempo real. Seja para aprender Morse para rádio amador, comunicação de emergência ou por interesse pessoal, nossa ferramenta oferece uma forma simples e eficiente de praticar.

## **Converta Código Morse para Inglês em Tempo Real**

Tem uma sequência de pontos e traços e precisa de um decodificador? Nosso **código Morse tradutor** faz a conversão em tempo real. Basta digitar o código Morse, e nosso sistema traduz imediatamente para inglês.

## **Recursos do Nosso Código Morse Tradutor**

* **Tradução Bidirecional:** Converta facilmente entre código Morse e inglês.
* **Reprodução de Áudio:** Ouça os bipes para reforçar o aprendizado.
* **Funcionalidade de Copiar e Compartilhar:** Compartilhe suas traduções com facilidade.
* **Uso Educacional e Prático:** Ideal para aprendizado, testes e comunicação de emergência.

## **Traduções Comuns em Código Morse**

Aqui estão algumas traduções rápidas de palavras comuns para código Morse:

* **Olá:** …. . .-.. .-.. \\---
* **SOS:** … \\--- …
* **Amor:** .-.. \\--- …- .
* **Sim:** \\-.-- . …
* **Não:** \\-. \\---
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
### **1. O que é o Código Morse?**

É um método de codificação de texto com pontos (.) e traços (-) para representar letras e números. Originalmente desenvolvido para telégrafos, ainda é essencial para comunicações de emergência.

### **2. Como usar um Código Morse Tradutor?**

Digite o texto ou código Morse na caixa de entrada, clique em 'Traduzir' e veja os resultados instantaneamente em inglês ou código Morse.

### **3. Posso ouvir o áudio do Código Morse?**

Sim! Nosso gerador permite ouvir os bipes do código Morse, facilitando o aprendizado e a prática.

### **4. O Código Morse ainda é usado hoje?**

Sim! O código Morse ainda é ativamente utilizado na aviação, radioamadorismo e sinais de emergência em todo o mundo.

### **5. Posso decodificar o Código Morse manualmente?**

Sim, mas isso requer memorizar os símbolos de código Morse para cada letra e número. Nosso decodificador de código Morse simplifica este processo com a conversão instantânea de texto.
`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:py-20 py-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <FAQSchemaLD markup={content} />
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Perguntas Frequentes (FAQ)</h2>
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
