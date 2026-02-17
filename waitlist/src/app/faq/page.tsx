"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "What is Aqwaya and how does it work?",
    answer:
      "Aqwaya is an AI-powered marketing automation platform that helps businesses create, launch, and optimize marketing campaigns without technical expertise. Our AI generates landing pages, email sequences, and marketing copy tailored to your business needs.",
  },
  {
    question: "When will Aqwaya be available?",
    answer:
      "We're currently in the development stage and testing. Beta access will be available to waitlist members in March 2026, with full launch following shortly after. Join our waitlist to be among the first to experience the platform.",
  },
  {
    question: "What makes Aqwaya different from other marketing tools?",
    answer:
      "Unlike traditional marketing platforms that require extensive setup and expertise, Aqwaya uses advanced AI to do the heavy lifting. You simply describe your business goals, and our AI creates complete marketing funnels, writes compelling copy, and optimizes for conversions automatically.",
  },
  {
    question: "Do I need technical skills to use Aqwaya?",
    answer:
      "Not at all! Aqwaya is designed for business owners, marketers, and entrepreneurs without technical backgrounds. Our AI handles all the complex technical aspects, allowing you to focus on growing your business.",
  },
  {
    question: "What type of businesses can benefit from Aqwaya?",
    answer:
      "Aqwaya is perfect for small to medium businesses, consultants, coaches, e-commerce stores, SaaS companies, and any business looking to generate leads and increase sales online. Our AI adapts to various industries and business models.",
  },
  {
    question: "How much will Aqwaya cost?",
    answer:
      "We're committed to making AI-powered marketing accessible to businesses of all sizes. Pricing will be significantly lower than purchasing multiple marketing tools separately. Waitlist members will receive special launch pricing and exclusive bonuses.",
  },
  {
    question: "Will there be a free trial?",
    answer:
      "Yes! We'll offer a comprehensive free trial so you can experience the full power of Aqwaya before committing. Waitlist members will get extended trial periods and premium features included.",
  },
  {
    question: "What marketing channels does Aqwaya support?",
    answer:
      "Aqwaya supports all major marketing channels including landing pages, email marketing, SMS and WhatsApp messaging, social media content, and more. Our AI creates integrated campaigns across multiple channels for maximum impact.",
  },
  {
    question: "How does the AI understand my business?",
    answer:
      "Our AI uses advanced natural language processing to understand your business description, goals, target audience, and industry. It then generates marketing strategies and content specifically tailored to your unique business needs and objectives.",
  },
  {
    question: "Can I customize the AI-generated content?",
    answer:
      "Absolutely! While our AI creates high-quality content automatically, you have full control to edit, customize, and refine everything to match your brand voice and specific requirements. Think of it as having an expert marketing assistant that you can direct.",
  },
  {
    question: "Is my data secure with Aqwaya?",
    answer:
      "Security is our top priority. We use enterprise-grade encryption, secure cloud infrastructure, and comply with all major privacy regulations including GDPR and CCPA. Your data is protected and never shared with third parties without your consent.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "While results vary by business and industry, our beta users have reported significant improvements in lead generation, conversion rates, and overall marketing efficiency. Many see results within the first few weeks of implementation.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes! We provide comprehensive customer support including onboarding assistance, training resources, and ongoing technical support. Waitlist members will receive priority support during the beta phase.",
  },
  {
    question: "Can I integrate Aqwaya with my existing tools?",
    answer:
      "We're building integrations with popular business tools including CRMs, email platforms, analytics tools, and more. Our goal is to seamlessly fit into your existing workflow while dramatically improving your marketing effectiveness.",
  },
  {
    question: "How do I join the waitlist?",
    answer:
      "Simply visit our homepage and enter your name and email address in the waitlist form. You'll receive updates about our progress, early access opportunities, and exclusive bonuses for being an early supporter.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      <div className="max-w-3xl mx-auto pt-15 pb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center flex items-center justify-center space-x-2 mb-4 text-gray-900">
          <HelpCircle className="w-8 h-8 text-blue-600" />
          <span>Frequently Asked Questions</span>
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
          Everything you need to know about Aqwaya and how it can transform your
          marketing
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-md shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="bg-white mt-16 p-6 text-center rounded-md border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-4">
            Can&apos;t find the answer you&apos;re looking for? Our team is here
            to help.
          </p>
          <Button>
            <a
              href="mailto:hello@aqwaya.com"
              className="inline-block bg-[#2C2E66] text-white px-6 py-2 rounded-md font-medium hover:bg-[rgb(44,46,200)] transition"
            >
              Contact Us
            </a>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
