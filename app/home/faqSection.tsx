"use client"
import { ChevronDown } from "lucide-react"
import react, { useState } from "react"

 const faqs = [
    {
      question: "How quickly are transactions processed?",
      answer:
        "All transactions are processed instantly. Airtime and data are delivered within seconds, while bill payments are processed immediately with confirmation.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, debit cards, USSD, and wallet funding. All payments are secured with bank-level encryption.",
    },
    {
      question: "Do you offer API integration for businesses?",
      answer:
        "Yes, we provide comprehensive API documentation and support for businesses looking to integrate our VTU services into their platforms.",
    },
    {
      question: "What are your transaction limits?",
      answer:
        "Transaction limits vary by account type. Starter accounts have daily limits of ₦50,000, while Business and Enterprise accounts have higher or custom limits.",
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes, we offer 24/7 customer support via phone, email, and live chat. Business and Enterprise customers get priority support.",
    },
    {
      question: "How secure are my transactions?",
      answer:
        "We use bank-level security with SSL encryption, two-factor authentication, and comply with all Nigerian financial regulations.",
    },
  ]



export function FaqSection (){

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return(
     <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-element">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about DataWise</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm fade-in-element">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )

}