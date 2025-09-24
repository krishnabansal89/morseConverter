import MorseConverter from "@/components/home/Translator";
import Markdown from "react-markdown";
import { FAQSchemaLD } from "@/components/FAQSchemaLD";
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Breadcrumb from "@/components/breadcrumb";

function Hero() {
    return (
        <div className="hero bg-background w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">
            <div className="w-full h-fit md:my-20 my-10 grid md:px-10  md:grid-cols-[65%_35%] grid-cols-1 justify-center ">
                <div className="flex  items-center  ">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-foreground  tracking-tight md:px-4 font-poppins">Traducteur de Code Morse <br></br> <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text">Convertissez & Décodez Instantanément.</span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-foreground tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Traduisez instantanément le français en code Morse et inversement avec notre traducteur morse gratuit. Convertissez, décodez et générez des signaux Morse facilement, avec lecture audio et options de partage.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-primary mr-6 text-primary-foreground px-4 py-2 rounded-lg font-poppins hover:opacity-90">Commencer</a>
                            <a href="#converter" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-poppins hover:opacity-90">Visiter la Boutique</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-card rounded-lg shadow-lg">
                    <MorseConverter language="fr" />
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
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-card rounded-full">{type}</span>
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
            type: "Produit",
            title: "Traducteur de Code Morse International",
            description: "Traduisez précisément le français vers le code Morse international et inversement.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Produit",
            title: "Traducteur de Code Morse Américain",
            description: "Traduisez précisément le français vers le code Morse américain et inversement.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Produit",
            title: "Machine à Code Morse",
            description: "Convertissez instantanément la frappe en code Morse. La vitesse du Morse est configurable et peut être des bips, une lumière clignotante ou des vibrations.",
            href: "/morse-code-machine",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Produit",
            title: "Générateur de Code Morse",
            description: "Créez des signaux en code Morse avec une vitesse de lecture réglable.",
            href: "/morse-code-generator",
            bgColor: "bg-[#493628]"
        },
        {
            type: "Produit",
            title: "Traducteur de Code Morse Audio",
            description: "Écoutez les signaux audio du code Morse pour n'importe quel texte.",
            href: "/morse-code-translator-audio",
            bgColor: "bg-[#31304D]"
        },
    ]

    return (
        <section id="features" className="bg-background w-[98%]  md:px-20 mx-auto p-4 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col font-poppins">
            <div className="container mx-auto px-4 md:mt-20 mt-10">
                <div className=" mx-auto">
                    <div className="text-center mb-12">
                        <h2 className=" md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-bold  mb-4">
                            Essayez Nos Outils Morse Gratuits
                        </h2>
                        <p className="text-muted-foreground font-maitree">
                            Découvrez nos outils et services de code Morse
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
        <div className="bg-background w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
            <div className="w-full h-fit md:my-20 my-10 justify-center  ">
                <div className="flex flex-col justify-center items-center text-center ">
                    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Pourquoi Choisir Notre Traducteur de Code Morse ?
                    </h2>
                    <p className="text-muted-foreground font-maitree">
                        Découvrez les caractéristiques de notre code Morse
                    </p>
                </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-[75%]   flex flex-col gap-4">
                    <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
                            <FeatureBlock title="Conversion Instantanée et Précise" description="Traduisez facilement l'anglais en code Morse et inversement avec une grande exactitude." />
                        </div>
                        <div className="flex-col flex  bg-card text-foreground rounded-2xl ">
                            <FeatureBlock title="Interface Simple et Intuitive" description="Aucune compétence technique requise — il suffit d'entrer le texte et de cliquer sur 'Traduire'." />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center bg-card text-foreground rounded-2xl">
                            <FeatureBlock title="Compatibilité avec Toutes les Variantes du Code Morse" description="Conforme aux normes internationales pour une traduction fiable." />
                        </div>
                        <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
                            <FeatureBlock title="100% Gratuit et Accessible" description="Utilisez notre générateur de code Morse en ligne sans aucun frais." />
                        </div>
                    </div>
                </div>
                <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
                    <FeatureBlock title="Compatible avec Tous les Appareils" description="Fonctionne parfaitement sur smartphones, tablettes et ordinateurs." />
                </div>
            </div>
        </div>
    )
}

function HowToUse() {
    return (
      <div className="bg-background w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
        <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
          <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Comment Utiliser le Traducteur de Code Morse</h2>
          <p className="text-muted-foreground font-maitree">
            Regardez la vidéo pour explorer l`&apos;`outil de code Morse
          </p>
          <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
            <iframe src="https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2" loading="lazy" title="Traducteur de Code Morse – Convertissez et Décodez l'Anglais en Code Morse Instantanément" allow="clipboard-write" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} ></iframe>
          </div>
        </div>
      </div>
    )
}

function Content() {
  const content = `## **Le Meilleur Traducteur et Générateur de Code Morse en Ligne – Encodez et Décodez le Texte en Anglais**

Vous cherchez le meilleur traducteur de code Morse ? Notre générateur de code Morse avancé convertit l'anglais en code Morse et vice versa avec une précision et une rapidité exceptionnelles. Que vous ayez besoin d'un décodeur Morse pour décrypter des messages ou d'un traducteur Morse pour les encoder, notre outil est conçu pour répondre à vos besoins. Avec une interface intuitive et un traitement instantané, vous pouvez traduire le code Morse en anglais ou convertir du texte en code Morse en quelques secondes.

## **Pourquoi Choisir Notre Traducteur de Code Morse ?**

* **Conversion Instantanée et Précise** : Traduisez facilement l'anglais en code Morse et inversement avec une grande exactitude.
* **Interface Simple et Intuitive** : Aucune compétence technique requise — il suffit d'entrer le texte et de le traduire.
* **Compatibilité avec Toutes les Variantes du Code Morse** : Conforme aux normes internationales pour une traduction fiable.
* **100 % Gratuit et Accessible** : Utilisez notre générateur de code Morse en ligne sans aucun frais.
* **Compatible Mobile et Ultra Rapide** : Fonctionne parfaitement sur tous les appareils pour une accessibilité maximale.

## **Comment Utiliser le Traducteur de Code Morse**

1. **Entrez du Texte ou du Code Morse** : Saisissez du texte en anglais ou des symboles en code Morse.
2. **Cliquez sur « Traduire »** : Notre décodeur Morse avancé convertira instantanément votre contenu.
3. **Copiez ou Partagez** : Copiez le résultat ou partagez-le en un seul clic.

## **Générateur de Code Morse – Créez Facilement des Signaux Morse**

Vous avez besoin d'un outil pour générer des signaux en code Morse ? Notre générateur transforme votre texte en signaux sonores Morse en temps réel. Que vous appreniez le Morse pour la radio amateur, la communication d'urgence ou par intérêt personnel, notre outil offre un moyen simple et efficace de pratiquer.

## **Convertissez le Code Morse en Anglais en Temps Réel**

Vous disposez d'une série de points et de traits à traduire ? Utilisez notre décodeur Morse pour une conversion immédiate. Il vous suffit d'entrer le code Morse, et notre système le traduira instantanément en anglais.

## **Fonctionnalités de Notre Traducteur de Code Morse**

* **Traduction Bidirectionnelle** : Passez facilement du code Morse à l'anglais et vice versa.
* **Lecture Audio** : Écoutez les bips Morse pour mieux mémoriser.
* **Fonction de Copie et Partage** : Partagez facilement vos traductions Morse.
* **Utilisation Éducative et Pratique** : Parfait pour l'apprentissage, les tests et les situations d'urgence.

## **Traductions Courantes en Code Morse**

Voici quelques traductions rapides de mots fréquemment utilisés :

* **Bonjour** : …. . .-.. .-.. \---
* **SOS** : … \--- …
* **Amour** : .-.. \--- …- .
* **Oui** : \-.-- . …
* **Non** : \-. \---
`;
  return (
    <div className="bg-background w-[98%] mx-auto p-4 md:px-20 rounded-lg md:pt-20 pt-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center md:mb-12 mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Code Morse Simplifié</h2>
      <Markdown components={{
        h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-foreground font-medium  my-6   ">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-foreground">{children}</h3>,
        p: ({ children }) => <p className="mt-2 font-maitree  text-foreground ml-4 text-lg/relaxed font-extralight">{children}</p>,
        br: () => <br />,
        li: ({ children }) => <li className="text-foreground list-disc ml-10 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
      }} >{content}</Markdown>
    </div>
  );
}

function Faq() {
  const content = `
### **1. Qu'est-ce que le Code Morse ?**

C'est une méthode de codage de texte à l'aide de points (.) et de traits (-) pour représenter les lettres et les chiffres. Initialement développé pour le télégraphe, il reste un outil essentiel pour la communication d'urgence.

### **2. Comment utiliser un traducteur de Code Morse ?**

Saisissez simplement du texte ou du code Morse dans le champ prévu, cliquez sur « Traduire », et recevez immédiatement la version traduite en anglais ou en code Morse.

### **3. Puis-je écouter le Code Morse en audio ?**

Oui ! Notre générateur permet d'entendre les bips du code Morse, ce qui facilite l'apprentissage et la pratique.

### **4. Le code Morse est-il encore utilisé aujourd'hui ?**

Oui ! Le code Morse est toujours activement utilisé dans l'aviation, la radioamateur et les signaux d'urgence dans le monde entier.

### **5. Puis-je décoder le code Morse manuellement ?**

Oui, mais cela nécessite de mémoriser les symboles du code Morse pour chaque lettre et chiffre. Notre décodeur de code Morse simplifie ce processus avec la conversion instantanée de texte.
`;
  return (
    <div className="bg-background w-[98%] mx-auto p-4 md:px-20 rounded-lg md:py-20 py-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <FAQSchemaLD markup={content} />
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Foire Aux Questions (FAQ)</h2>
      <Markdown components={{
        h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-foreground">{children}</h3>,
        p: ({ children }) => <p className="mt-2 text-foreground  font-maitree">{children}</p>,
        br: () => <br />,
      }} >{content}</Markdown>
    </div>
  );
}

export default function Page() {
    return(
        <div className="bg-background text-foreground h-full w-full m-0 p-0 ">
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
