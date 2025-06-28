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
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-poppins">Mors Alfabesi Çeviri <br></br> <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text">Anında Dönüştürün & Çözün</span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-[#2d2d2d] tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Ücretsiz Mors Alfabesi Çeviri aracımızla Türkçeyi anında mors koduna çevirin veya mors kodunu çözün. Sesli oynatma ve paylaşım seçenekleriyle kolayca mors sinyalleri üretin, dönüştürün ve okuyun.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-[#456359] mr-6 text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Başlat</a>
                            <a href="#converter" className="bg-[#456359] text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Mağaza</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-white rounded-lg shadow-lg">
                    <MorseConverter language="tr" />
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
            type: "Ürün",
            title: "Uluslararası Mors Alfabesi Çevirisi",
            description: "Türkçeyi uluslararası mors koduna ve tersine hassas şekilde çevirin.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Ürün",
            title: "Amerikan Mors Kodu Çevirisi",
            description: "Türkçeyi Amerikan mors koduna ve tersine hassas şekilde çevirin.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Ürün",
            title: "Mors Kodu Makinesi",
            description: "Yazmayı anında Mors koduna dönüştürün. Mors hızı yapılandırılabilir ve bip sesleri, yanıpönen bir ışık veya titreşim olabilir.",
            href: "/morse-code-machine",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Ürün",
            title: "Mors Kodu Üretici",
            description: "Ayarlanabilir oynatma hızıyla mors kod sinyalleri oluşturun.",
            href: "/morse-code-generator",
            bgColor: "bg-[#31304D]"
        },
        {
            type: "Ürün",
            title: "Mors Kodu Üretici",
            description: "Ayarlanabilir oynatma hızıyla mors kod sinyalleri oluşturun.",
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
                            Ücretsiz Mors Araçlarımızı Keşfedin
                        </h2>
                        <p className="text-neutral-600 font-maitree">
                            Mors kod araçlarını ve hizmetlerini keşfedin
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
                    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Neden Bizim Mors Alfabesi Çeviri Aracımızı Tercih Etmelisiniz?
                    </h2>
                    <p className="text-neutral-600 font-maitree">
                        Mors kodumuzun özelliklerini keşfedin
                    </p>
                </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-[75%]   flex flex-col gap-4">
                    <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
                            <FeatureBlock title="Anında ve Doğru Dönüştürme" description="İngilizceyi mors alfabesine ve tam tersini yüksek doğrulukla çevirin." />
                        </div>
                        <div className="flex-col flex  bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl ">
                            <FeatureBlock title="Basit ve Sezgisel Arayüz" description="Teknik bilgi gerekmeden yalnızca metni girin ve 'Çevir' butonuna tıklayın." />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl">
                            <FeatureBlock title="Tüm Mors Kodu Varyantlarını Destekler" description="Uluslararası mors kodu standartlarıyla tam uyumlu." />
                        </div>
                        <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
                            <FeatureBlock title="Tamamen Ücretsiz ve Erişilebilir" description="Online olarak herhangi bir ücret ödemeden kullanın." />
                        </div>
                    </div>
                </div>
                <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
                    <FeatureBlock title="Tüm Cihazlarla Uyumlu" description="Akıllı telefon, tablet ve bilgisayarlarda kusursuz çalışır." />
                </div>
            </div>
        </div>
    )
}

function HowToUse() {
    return (
      <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
        <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
          <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Mors Alfabesi Çeviri Aracı Nasıl Kullanılır?</h2>
          <p className="text-neutral-600 font-maitree">
            Mors kodu aracını keşfetmek için videoyu izleyin
          </p>
          <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
            <iframe src="https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2" loading="lazy" title="Mors Alfabesi Çeviri - İngilizceyi Anında Mors Koduna Dönüştürün ve Çözün" allow="clipboard-write" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} ></iframe>
          </div>
        </div>
      </div>
    )
}

function Content() {
  const content = `## **En Gelişmiş Online Mors Alfabesi Çeviri ve Kod Üretici Aracı - Metinden İngilizceye Kodlama ve Kod Çözme**

En iyi **mors alfabesi çeviri** aracını mı arıyorsunuz? Gelişmiş Mors Kod Üreticimiz, İngilizceyi yüksek doğruluk ve hızla mors koduna çevirir ve aynı şekilde geri çözer. Mesajları çözmek için bir Mors Kod Çözücü ya da metinleri kodlamak için bir Mors Çeviri aracına ihtiyacınız varsa, bu araç tam size göre. Kullanıcı dostu arayüzü sayesinde, mors kodunu İngilizceye çevirmek veya metni mors alfabesine dönüştürmek sadece saniyeler sürer.

## **Neden Bizim Mors Alfabesi Çeviri Aracımızı Tercih Etmelisiniz?**

* **Anında ve Doğru Dönüştürme:** İngilizceyi mors alfabesine ve tam tersini yüksek doğrulukla çevirin.
* **Basit ve Sezgisel Arayüz:** Teknik bilgi gerekmeden yalnızca metni girin ve anında çeviri alın.
* **Tüm Mors Kodu Varyantlarını Destekler:** Uluslararası mors kodu standartlarıyla tam uyumlu.
* **Tamamen Ücretsiz ve Erişilebilir:** Online olarak herhangi bir ücret ödemeden kullanın.
* **Mobil Uyumlu ve Hızlı:** Tüm cihazlarda sorunsuz çalışır, her yerden erişilebilir.

## **Mors Alfabesi Çeviri Aracı Nasıl Kullanılır?**

1. **Metin veya Mors Kodu Girin:** İngilizce metni ya da mors sembollerini (nokta ve tire) yazın.
2. **'Çevir' Butonuna Tıklayın:** Gelişmiş Mors Kod Çözücümüz anında dönüşüm yapacaktır.
3. **Kopyalayın veya Paylaşın:** Çevirilen metni tek tıkla kopyalayın ya da paylaşın.

## **Mors Kod Üretici - Kolayca Mors Sinyalleri Oluşturun**

Mors kodu sinyalleri üretmek mi istiyorsunuz? Mors Kod Üreticimiz, metni gerçek zamanlı olarak mors bip seslerine dönüştürür. İster amatör telsiz (ham radio), ister acil durum iletişimi, isterse kişisel öğrenim için olsun, mors alfabesi çeviri aracımız etkili bir uygulama sunar.

## **Mors Kodunu Anında İngilizceye Çevirin**

Elinizde nokta ve tirelerden oluşan bir mors kodu mu var? Mors Kod Çözücümüz gerçek zamanlı çeviri yapar. Kodunuzu girin, sistem otomatik olarak İngilizceye çevirsin.

## **Mors Alfabesi Çeviri Aracımızın Özellikleri**

* **Çift Yönlü Çeviri:** Mors Kodundan İngilizceye ve İngilizceden Mors Koduna kolayca geçiş yapın.
* **Sesli Oynatma:** Mors kodunu bip sesleriyle dinleyerek öğrenmeyi pekiştirin.
* **Kopyala & Paylaş Özelliği:** Çevirilerinizi kolayca paylaşın veya kaydedin.
* **Eğitimsel ve Pratik Kullanım:** Öğrenim, sınav ve acil durum iletişimi için idealdir.

## **Yaygın Mors Kod Çevirileri**

Aşağıda bazı yaygın kelimelerin mors kodu karşılıkları verilmiştir:

* **Hello:** …. . .-.. .-.. \\---
* **SOS:** … \\--- …
* **Love:** .-.. \\--- …- .
* **Yes:** \\-.-- . …
* **No:** \\-. \\---
`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:pt-20 pt-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center md:mb-12 mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Basitleştirilmiş Mors Kodu</h2>
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
### **1. Mors Alfabesi Nedir?**

Mors alfabesi, harfleri ve sayıları nokta (.) ve tire (-) kullanarak kodlayan bir sistemdir. İlk olarak telgraf sistemlerinde kullanılmış olup günümüzde hâlâ acil durum iletişimi için önemlidir.

### **2. Mors Alfabesi Çeviri Aracı Nasıl Kullanılır?**

Metni veya mors kodunu giriş alanına yazın, 'Çevir' butonuna tıklayın ve anında İngilizce ya da mors çıktısını alın.

### **3. Mors Kodunu Sesli Dinleyebilir miyim?**

Evet! Mors Kod Üreticimiz sayesinde mors kodlarını bip sesleriyle dinleyebilir, öğrenmenizi kolaylaştırabilirsiniz.

### **4. Mors Kodu Günümüzde Hâlâ Kullanılıyor mu?**

Evet! Mors kodu hâlâ havacılık, amatör telsiz ve dünya çapında acil durum sinyalleri için aktif olarak kullanılmaktadır.

### **5. Mors Kodunu Manuel Olarak Çözebilir miyim?**

Evet, ancak bu her harf ve rakam için mors sembollerini ezberlemeyi gerektirir. Mors kod çözücümüz bu süreci anlık metin dönüşümüyle basitleştirir.
`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:py-20 py-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <FAQSchemaLD markup={content} />
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Sıkça Sorulan Sorular</h2>
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
