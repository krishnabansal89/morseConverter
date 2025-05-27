import MorseConverter from "@/components/home/Translator";
import Markdown from "react-markdown";
import { FAQSchemaLD } from "@/components/FAQSchemaLD";


function Hero() {
    return (
        <div className="hero bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">
            <div className="w-full h-fit md:my-20 my-10 grid md:px-10  md:grid-cols-[65%_35%] grid-cols-1 justify-center ">
                <div className="flex  items-center  ">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-poppins">Переводчик Азбуки Морзе <br></br> Мгновенное<span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text"> Преобразование и Расшифровка. </span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-[#2d2d2d] tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Мгновенно переводите английский текст в азбуку Морзе и обратно с помощью бесплатного онлайн-переводчика. Генерируйте сигналы Морзе с озвучкой и функцией обмена.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-[#456359] mr-6 text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Начать</a>
                            <a href="#converter" className="bg-[#456359] text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740]">Посетить магазин</a>
                        </button>
                    </div>
                </div>

            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-white rounded-lg shadow-lg">
                    <MorseConverter language="ru" />
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
            type: "Продукт",
            title: "Международный код-переводчик",
            description: "Точный перевод с английского на международный код Морзе и обратно.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Продукт",
            title: "Американский код-переводчик",
            description: "Точный перевод с английского на американский код Морзе и обратно.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Продукт",
            title: "Генератор азбуки Морзе",
            description: "Создавайте сигналы Морзе с настраиваемой скоростью воспроизведения.",
            href: "/morse-code-generator",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Продукт",
            title: "Генератор азбуки Морзе",
            description: "Создавайте сигналы Морзе с настраиваемой скоростью воспроизведения.",
            href: "/morse-code-generator",
            bgColor: "bg-[#31304D]"
        },
        {
            type: "Продукт",
            title: "Генератор азбуки Морзе",
            description: "Создавайте сигналы Морзе с настраиваемой скоростью воспроизведения.",
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
                            Испытайте наши бесплатные инструменты азбуки Морзе
                        </h2>
                        <p className="text-neutral-600 font-maitree">
                            Откройте для себя наши инструменты и сервисы азбуки Морзе
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
                    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Почему выбирают наш Переводчик Азбуки Морзе?
                    </h2>
                    <p className="text-neutral-600 font-maitree">
                        Откройте для себя особенности нашей азбуки Морзе
                    </p>
                </div>


            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-[75%]   flex flex-col gap-4">
                    <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
                            <FeatureBlock title="Мгновенное и Точное Преобразование" description="Переводите английский в азбуку Морзе и обратно без задержек." />
                        </div>
                        <div className="flex-col flex  bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl ">
                            <FeatureBlock title="Простой и Удобный Интерфейс" description="Не требует технических навыков — просто введите текст и нажмите «Перевести»." />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center bg-[#f5f5f5] text-[#2d2d2d] rounded-2xl">
                            <FeatureBlock title="Поддержка Всех Вариантов Морзе" description="Используются международные стандарты для максимальной точности." />
                        </div>

                        <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
                            <FeatureBlock title="100% Безопасно и Доступно" description="Используйте наш генератор азбуки Морзе со 100% безопасностью и полной доступностью для всех." />
                        </div>
                    </div>

                </div>
                <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
                    <FeatureBlock title="Мобильная Совместимость и Скорость" description="Работает на всех устройствах — от ПК до смартфона." />
                </div>

            </div>

        </div>
    )
}

function HowToUse() {
    return (
      <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
        <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
        <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Как использовать Переводчик Азбуки Морзе</h2>
        <p className="text-neutral-600 font-maitree">
          Посмотрите видео о работе с инструментами азбуки Морзе
        </p>
        <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
          <iframe src="https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2" loading="lazy" title="Переводчик Азбуки Морзе — Мгновенное Преобразование и Расшифровка Текста" allow="clipboard-write" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} ></iframe>
          </div>
      </div>
    </div>
    )
  }


function Content() {
  const content = `## **Лучший Онлайн Переводчик Азбуки Морзе — Переводите и Генерируйте Сигналы Мгновенно**
Ищете надежный **переводчик азбуки Морзе**? Наш продвинутый онлайн-инструмент точно и быстро переводит текст с английского на азбуку Морзе и наоборот. Хотите расшифровать сообщение с помощью декодера Морзе или закодировать текст с помощью генератора? Мы предлагаем всё в одном — удобно, быстро и абсолютно бесплатно.

С интуитивно понятным интерфейсом вы можете перевести азбуку Морзе в английский язык или наоборот за считаные секунды.

## **Почему выбирают наш Переводчик Азбуки Морзе?**

* **Мгновенное и Точное Преобразование:** Переводите английский в азбуку Морзе и обратно без задержек.  
* **Простой и Удобный Интерфейс:** Не требует технических навыков — просто введите текст и нажмите «Перевести».  
* **Поддержка Всех Вариантов Морзе:** Используются международные стандарты для максимальной точности.  
* **Абсолютно Бесплатно:** Используйте онлайн без регистрации и оплаты.  
* **Мобильная Совместимость:** Работает на всех устройствах — от ПК до смартфона.

## **Как пользоваться Переводчиком Азбуки Морзе**

1. **Введите текст или код:** Впишите английские слова или символы азбуки Морзе.  
2. **Нажмите «Перевести»:** Мгновенный перевод с помощью умного декодера.  
3. **Скопируйте или Поделитесь:** Готовый результат можно скопировать или отправить другим пользователям одним кликом.

## **Генератор Азбуки Морзе — Создавайте Сигналы за Секунды**
Нужен инструмент для создания сигналов азбуки Морзе? Наш онлайн **переводчик азбуки Морзе** превращает текст в звуковые сигналы в реальном времени. Идеален для изучения радиосвязи, экстренных случаев и личной практики.

## **Перевод Азбуки Морзе в Английский — Мгновенный Результат**
Если у вас есть последовательность точек и тире, наш декодер азбуки Морзе мгновенно преобразует их в читаемый английский текст. Просто введите код и получите результат сразу.

## **Возможности нашего Переводчика Азбуки Морзе**

* **Двунаправленный Перевод:** Из английского в Морзе и обратно — одним нажатием.  
* **Звуковое Воспроизведение:** Слушайте сигналы для лучшего понимания и запоминания.  
* **Копирование и Обмен:** Делитесь результатами с друзьями и коллегами.  
* **Образовательное и Практическое Применение:** Подходит для учебы, тестирования и аварийной связи.

## **Популярные Примеры Перевода Азбуки Морзе**

Вот несколько часто используемых слов:

* **Привет:** …. . .-.. .-.. ---  
* **SOS:** … --- …  
* **Любовь:** .-.. --- …- .  
* **Да:** \-.-- . …  
* **Нет:** \-. \---

`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:pt-20 pt-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center md:mb-12 mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Азбука Морзе — проще простого</h2>
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
### **1. Что такое азбука Морзе?**

Азбука Морзе — это способ кодирования текста с помощью точек (.) и тире (-), которые представляют буквы и цифры. Разработанная для телеграфии, она до сих пор используется для экстренной связи.

### **2. Как использовать переводчик азбуки Морзе?**

Введите текст или код, нажмите «Перевести» и сразу получите результат в нужном формате.

### **3. Можно ли прослушать сигналы азбуки Морзе?**

Да! Наш **генератор азбуки Морзе** воспроизводит звуковые сигналы, что упрощает изучение и практику.

### **4. Используется ли азбука Морзе сегодня?**

Да! Азбука Морзе до сих пор активно используется в авиации, любительском радио и для экстренных сигналов по всему миру.

### **5. Можно ли вручную декодировать азбуку Морзе?**

Да, но для этого требуется запомнить символы Морзе для каждой буквы и цифры. Наш **декодер азбуки Морзе** упрощает этот процесс, мгновенно преобразуя символы в текст.

`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:py-20 py-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <FAQSchemaLD markup={content} />
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Часто задаваемые вопросы</h2>
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
