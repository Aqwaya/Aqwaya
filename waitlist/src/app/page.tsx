"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Zap,
  MessageSquare,
  BarChart3,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Sparkles,
  Bot,
  TrendingUp,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  Rocket,
  Heart,
  Award,
  Lightbulb,
} from "lucide-react";

export default function Landing() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, email }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Waitlist error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const SuccessMessage = () => (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        🎉 Success! You&apos;ve been added to the waitlist.
      </h3>
      <p className="text-sm text-gray-600">
        Thank you for joining our waitlist. We&apos;ll notify you as soon as
        Aqwaya is ready for early access.
      </p>
    </div>
  );

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Campaign Creation",
      description:
        "Generate complete marketing funnels in minutes with our intelligent AI assistant.",
    },
    {
      icon: Zap,
      title: "Landing Page Builder",
      description:
        "Create high-converting landing pages without any coding skills required.",
    },
    {
      icon: Target,
      title: "Email Marketing",
      description:
        "Design and send beautiful email campaigns that convert visitors into customers.",
    },
    {
      icon: BarChart3,
      title: "WhatsApp Marketing",
      description:
        "Reach customers instantly with text and WhatsApp messaging campaigns.",
    },
    {
      icon: MessageSquare,
      title: "Advanced Analytics",
      description:
        "Track performance and optimize your campaigns with detailed insights.",
    },
    {
      icon: Shield,
      title: "Lead Management",
      description:
        "Manage all your leads in one place with our built-in CRM system.",
    },
  ];

  const benefits = [
    "Replace 5+ marketing tools with one AI-powered platform",
    "Generate professional campaigns in minutes, not hours",
    "Increase conversion rates by up to 300%",
    "Save $500+ monthly on marketing software",
    "24/7 AI-powered customer support",
    "No coding or design skills required",
  ];

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
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "E-commerce Owner",
      content:
        "I've been waiting for a tool like this! The AI-generated campaigns in the demo were better than what I could create myself.",
      rating: 5,
    },
    {
      name: "Ade Mohammed",
      role: "Digital Marketing Consultant",
      content:
        "This will completely change how I deliver results for my clients. The speed and quality are impressive.",
      rating: 5,
    },
    {
      name: "Chioma Ifeanyi",
      role: "SaaS Founder",
      content:
        "Finally, a marketing platform that understands my business without endless configuration. Can't wait for launch!",
      rating: 5,
    },
  ];

  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-15 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="flex items-center space-x-1 px-4 py-2 rounded-full bg-purple-100 border border-purple-200">
                <Rocket className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center space-x-1 px-4 py-2 rounded-full bg-green-100 border border-green-200">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  1,200+ on waitlist
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              AI-Powered Marketing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                That Actually Works
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-600">
              Create high-converting landing pages, email campaigns, and
              marketing funnels in minutes. No technical skills required - just
              describe your business and let our AI do the rest.
            </p>

            {/* Waitlist Form */}
            <div id="waitlist-form" className="max-w-md mx-auto mb-12">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center flex items-center justify-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-gray-900">Join the Waitlist</span>
                  </CardTitle>
                  <p className="text-sm text-center text-gray-600">
                    Be the first to experience AI-powered marketing automation
                  </p>
                </CardHeader>

                <CardContent className="p-6">
                  {!isSubmitted ? (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 max-w-md mx-auto"
                    >
                      {/* First and Last Name side by side */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-gray-700">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            placeholder="Enter first name"
                            className="border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-gray-700">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter last name"
                            className="border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-700">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter phone number"
                          className="border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Enter your email"
                          className="border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full text-white font-semibold py-3 bg-[#2C2E66] hover:bg-[rgb(44,46,200)] transition-colors duration-200 cursor-pointer flex items-center justify-center"
                      >
                        Join the Waitlist
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  ) : (
                    <SuccessMessage />
                  )}
                  <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Free forever plan</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Early access</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Beta users report 300% increase in conversions</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>$50K+ in sales generated during testing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-500" />
                <span>Featured in TechCrunch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="px-4 sm:px-6 lg:px-8 bg-gray-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              See Aqwaya in Action
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Get a glimpse of the powerful AI-driven dashboard that will
              transform your marketing
            </p>
          </div>

          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-gray-500">
                  dashboard.aqwaya.com
                </span>
              </div>

              <div className="relative w-full aspect-[16/10] sm:h-[512px] rounded-xl overflow-hidden">
                <Image
                  src="/dashboard.PNG"
                  alt="Aqwaya Dashboard Preview"
                  fill
                  className="object-contain rounded-xl"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-10 rounded-xl" />
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Everything You Need to Grow Your Business
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Replace multiple expensive marketing tools with one AI-powered
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r from-blue-100 to-purple-100">
                    <feature.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Why Smart Businesses Choose Aqwaya
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-green-500">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-current text-yellow-500"
                        />
                      ))}
                    </div>
                    <p className="mb-4 text-gray-700">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Aqwaya
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-100 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h2 className="text-4xl font-bold text-gray-900">
              Ready to Transform Your Marketing?
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses waiting for the future of AI-powered
            marketing automation
          </p>
          <Button
            size="lg"
            className="text-white font-semibold px-8 py-4 text-lg"
            style={{ backgroundColor: "#2C2E66" }}
            onClick={() =>
              document
                .getElementById("waitlist-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Rocket className="w-5 h-5 mr-2" />
            Secure Your Spot Now
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Free forever plan available • No credit card required • Early access
            guaranteed
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
