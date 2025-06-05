
export const FAQSchemaLD = (
    {markup}: {markup: string}
) => {
    // console.log("markup :- ",markup.split(('### **')))
    const faqs: { question: string, answer: string }[] = markup.split('### **').map(faq => {
        let [question, answer] = faq.split('\n\n').map(part => part.trim())
        const questionArray = question.split(".").filter(item => item !== "").map(item => item.split("**")[0])
        question = questionArray[1]
        answer = answer? answer.replaceAll("**","") :""

        return {
            question,
            answer
        }
    }) 
    
    
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.slice(1).map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }


    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}>
        </script>

    )
}