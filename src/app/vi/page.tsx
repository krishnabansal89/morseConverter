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
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-foreground  tracking-tight md:px-4 font-poppins">Dịch Mã Morse <br></br> <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text">Chuyển Đổi & Giải Mã Tức Thì.</span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2 mt-4 md:mt-0 ">
                    <div className="my-4">
                        <p className="text-foreground tracking-tight w-[100%] font-medium text-justify  text-lg font-maitree ">Dịch tiếng Việt sang mã Morse và ngược lại ngay lập tức với công cụ dịch mã Morse miễn phí của chúng tôi. Chuyển đổi, giải mã và tạo tín hiệu Morse dễ dàng, có hỗ trợ phát âm thanh và chia sẻ.
                        </p>
                    </div>

                    <div className="my-4">
                        <button>
                            <a href="#converter" className="bg-primary mr-6 text-primary-foreground px-4 py-2 rounded-lg font-poppins hover:opacity-90">Bắt Đầu</a>
                            <a href="#converter" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-poppins hover:opacity-90">Xem Cửa Hàng</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-card rounded-lg shadow-lg">
                    <MorseConverter language="vi" />
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
            type: "Sản phẩm",
            title: "Dịch Mã Morse Quốc Tế",
            description: "Dịch chính xác giữa tiếng Việt và mã Morse quốc tế.",
            href: "/international-morse-code",
            bgColor: "bg-[#31363F]"
        },
        {
            type: "Sản phẩm",
            title: "Dịch Mã Morse Mỹ",
            description: "Dịch chính xác giữa tiếng Việt và mã Morse Mỹ.",
            href: "/american-morse-code-translator",
            bgColor: "bg-[#41644A]"
        },
        {
            type: "Sản phẩm",
            title: "Máy tạo Mã Morse",
            description: "Chuyển đổi ngay lập tức việc gõ văn bản sang mã Morse. Tốc độ Morse có thể cấu hình và có thể là tiếng bíp, đèn nhấp nháy hoặc rung.",
            href: "/morse-code-machine",
            bgColor: "bg-[#705C53]"
        },
        {
            type: "Sản phẩm",
            title: "Bộ Dịch Mã Morse Âm Thanh",
            description: "Nghe tín hiệu âm thanh mã Morse cho bất kỳ văn bản nào.",
            href: "/morse-code-translator-audio",
            bgColor: "bg-[#31304D]"
        },
        {
            type: "Sản phẩm",
            title: "Bộ Tạo Mã Morse",
            description: "Tạo tín hiệu mã Morse với tốc độ phát lại có thể điều chỉnh.",
            href: "/morse-code-generator",
            bgColor: "bg-[#493628]"
        },
    ]

    return (
        <section id="features" className="bg-background w-[98%]  md:px-20 mx-auto p-4 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col font-poppins">
            <div className="container mx-auto px-4 md:mt-20 mt-10">
                <div className=" mx-auto">
                    <div className="text-center mb-12">
                        <h2 className=" md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-bold  mb-4">
                            Khám Phá Các Công Cụ Mã Morse Miễn Phí Của Chúng Tôi
                        </h2>
                        <p className="text-muted-foreground font-maitree">
                            Khám phá các công cụ và dịch vụ mã Morse của chúng tôi
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
                    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Tại Sao Nên Chọn Công Cụ Dịch Mã Morse Của Chúng Tôi?
                    </h2>
                    <p className="text-muted-foreground font-maitree">
                        Khám phá các đặc điểm của mã Morse của chúng tôi
                    </p>
                </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-[75%]   flex flex-col gap-4">
                    <div className="grid sm:grid-cols-[60%_40%] grid-cols-1 sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center rounded-2xl bg-[#456359]  text-white">
                            <FeatureBlock title="Chuyển Đổi Nhanh & Chính Xác" description="Dịch tiếng Anh sang mã Morse và ngược lại cực kỳ chuẩn xác." />
                        </div>
                        <div className="flex-col flex  bg-card text-foreground rounded-2xl ">
                            <FeatureBlock title="Giao Diện Đơn Giản, Dễ Dùng" description="Không cần kiến thức kỹ thuật—chỉ cần nhập văn bản và nhấn 'Dịch'." />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-[40%_60%] flex flex-col-reverse sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex justify-center items-center bg-card text-foreground rounded-2xl">
                            <FeatureBlock title="Hỗ Trợ Tất Cả Biến Thể Mã Morse" description="Áp dụng tiêu chuẩn mã Morse quốc tế." />
                        </div>
                        <div className="flex-col  flex bg-[#456359]  text-white rounded-2xl ">
                            <FeatureBlock title="Miễn Phí 100% & Dễ Truy Cập" description="Sử dụng trình tạo mã Morse trực tuyến của chúng tôi mà không tốn chi phí." />
                        </div>
                    </div>
                </div>
                <div className="md:w-[25%]  space-x-6  bg-[#456359]  text-white  rounded-2xl ">
                    <FeatureBlock title="Tương Thích Mọi Thiết Bị" description="Hoạt động mượt mà trên điện thoại, máy tính bảng và máy tính." />
                </div>
            </div>
        </div>
    )
}

function HowToUse() {
    return (
      <div className="bg-background w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
        <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
          <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">Cách Sử Dụng Công Cụ Dịch Mã Morse</h2>
          <p className="text-muted-foreground font-maitree">
            Xem video để khám phá công cụ mã Morse
          </p>
          <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
            <iframe src="https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2" loading="lazy" title="Dịch Mã Morse - Chuyển Đổi & Giải Mã Tiếng Anh Sang Mã Morse Tức Thì" allow="clipboard-write" style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} ></iframe>
          </div>
        </div>
      </div>
    )
}

function Content() {
  const content = `## **Công Cụ Dịch Mã Morse Trực Tuyến Tốt Nhất - Mã Hóa & Giải Mã Từ Văn Bản Sang Tiếng Anh**

Bạn đang tìm kiếm công cụ **dịch mã Morse** chính xác và nhanh chóng? Trình tạo mã Morse tiên tiến của chúng tôi cho phép chuyển đổi qua lại giữa tiếng Anh và mã Morse với độ chính xác cao. Dù bạn cần giải mã tín hiệu Morse hay mã hóa văn bản, công cụ này đều đáp ứng mọi nhu cầu của bạn. Với giao diện thân thiện và xử lý tức thì, bạn có thể dễ dàng chuyển đổi văn bản sang mã Morse hoặc ngược lại chỉ trong vài giây.

## **Tại Sao Nên Chọn Công Cụ Dịch Mã Morse Của Chúng Tôi?**

* **Chuyển Đổi Nhanh & Chính Xác:** Dịch tiếng Anh sang mã Morse và ngược lại cực kỳ chuẩn xác.
* **Giao Diện Đơn Giản, Dễ Dùng:** Không cần kiến thức kỹ thuật—chỉ cần nhập văn bản và nhấn dịch.
* **Hỗ Trợ Tất Cả Biến Thể Mã Morse:** Áp dụng tiêu chuẩn mã Morse quốc tế.
* **Miễn Phí 100% & Dễ Truy Cập:** Sử dụng trực tuyến không mất phí.
* **Tương Thích Mọi Thiết Bị:** Hoạt động mượt mà trên điện thoại, máy tính bảng và máy tính.

## **Cách Sử Dụng Công Cụ Dịch Mã Morse**

1. **Nhập Văn Bản hoặc Mã Morse:** Gõ tiếng Anh hoặc các ký hiệu mã Morse (. và -).
2. **Nhấn 'Dịch':** Công cụ dịch mã Morse sẽ xử lý và hiển thị kết quả ngay.
3. **Sao Chép hoặc Chia Sẻ:** Chỉ với một cú nhấp chuột, bạn có thể sao chép hoặc chia sẻ kết quả.

## **Trình Tạo Mã Morse - Dễ Dàng Tạo Tín Hiệu Morse**

Cần tạo tín hiệu mã Morse? Trình tạo mã Morse của chúng tôi sẽ biến văn bản thành âm thanh bíp theo thời gian thực. Dù bạn học Morse cho đài nghiệp dư, truyền tin khẩn cấp hay chỉ vì đam mê, công cụ này giúp bạn luyện tập một cách hiệu quả và dễ dàng.

## **Dịch Mã Morse Sang Tiếng Anh Ngay Lập Tức**

Có một chuỗi chấm và gạch bạn muốn giải mã? Công cụ giải mã Morse này sẽ chuyển đổi mã Morse về tiếng Anh trong tích tắc. Chỉ cần dán mã vào, hệ thống sẽ tự động hiển thị kết quả.

## **Tính Năng Nổi Bật Của Công Cụ Dịch Mã Morse**

* **Dịch Hai Chiều:** Chuyển đổi linh hoạt giữa mã Morse và tiếng Anh.
* **Phát Âm Thanh:** Nghe âm thanh bíp để hỗ trợ ghi nhớ và học tập.
* **Sao Chép & Chia Sẻ Nhanh:** Dễ dàng chia sẻ bản dịch của bạn với người khác.
* **Ứng Dụng Thực Tiễn & Giáo Dục:** Phù hợp cho học tập, kiểm tra, hoặc truyền tin khẩn cấp.

## **Bảng Dịch Mã Morse Cho Một Số Từ Phổ Biến**

* **Hello:** …. . .-.. .-.. ---
* **SOS:** … --- …
* **Love:** .-.. --- …- .
* **Yes:** -.-- . …
* **No:** -. ---
`;
  return (
    <div className="bg-background w-[98%] mx-auto p-4 md:px-20 rounded-lg md:pt-20 pt-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center md:mb-12 mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Mã Morse Đơn Giản Hóa</h2>
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
### **1. Mã Morse là gì?**

Mã Morse là phương pháp mã hóa văn bản bằng dấu chấm (.) và dấu gạch (-) để biểu thị chữ cái và số. Ban đầu được dùng cho điện báo, mã Morse vẫn là công cụ quan trọng trong truyền thông khẩn cấp.

### **2. Cách sử dụng công cụ dịch mã Morse?**

Chỉ cần nhập văn bản hoặc mã Morse vào ô nhập, nhấn 'Dịch' và bạn sẽ nhận được kết quả ngay lập tức bằng tiếng Anh hoặc mã Morse.

### **3. Tôi có thể nghe âm thanh mã Morse không?**

Có! Trình tạo mã Morse của chúng tôi cho phép bạn nghe âm thanh bíp, giúp học và ghi nhớ dễ dàng hơn.

### **4. Mã Morse còn được sử dụng ngày nay không?**

Có! Mã Morse vẫn được sử dụng tích cực trong hàng không, đài vô tuyến nghiệp dư, và tín hiệu khẩn cấp trên toàn thế giới.

### **5. Tôi có thể giải mã mã Morse thủ công không?**

Có, nhưng điều này đòi hỏi phải ghi nhớ các ký hiệu mã Morse cho từng chữ cái và số. Công cụ dịch mã Morse của chúng tôi đơn giản hóa quy trình này với khả năng chuyển đổi văn bản tức thì.
`;
  return (
    <div className="bg-background w-[98%] mx-auto p-4 md:px-20 rounded-lg md:py-20 py-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <FAQSchemaLD markup={content} />
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Câu Hỏi Thường Gặp (FAQ)</h2>
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
