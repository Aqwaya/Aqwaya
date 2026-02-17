"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { MessageSquare, Clock, Info, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const whatsappNumber = "2349021835909";

  const getWhatsAppLink = () => {
    const { name, email, subject, message } = form;
    const text = `Hello, my name is ${name}.\n\nSubject: ${subject}\n\nMessage: ${message}\n\nEmail: ${email}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.message || !form.email) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Message could not be sent.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      <section className="py-15 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Have questions about Aqwaya? Want to provide feedback or request a
              feature? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 text-gray-800">
              <CardHeader className="flex-row gap-3">
                <div>
                  <Mail className="text-blue-500" />
                </div>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    placeholder="Your full name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="your.email@example.com"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    placeholder="What's this about?"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.message}
                    placeholder="Tell us more about your inquiry"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    type="submit"
                    className={`flex-1 text-white font-semibold py-3 transition-colors duration-200 ${
                      isSubmitted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={loading || isSubmitted}
                  >
                    {loading
                      ? "Submitting..."
                      : isSubmitted
                      ? "Submitted!"
                      : "Send Message"}
                  </Button>

                  <span className="text-gray-500 text-sm font-medium">OR</span>

                  <Button
                    type="button"
                    onClick={() => window.open(getWhatsAppLink(), "_blank")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Message us on WhatsApp
                  </Button>
                </div>
              </form>
              </CardContent>
            </Card>

            {/* Info Section */}
            <div className="space-y-6 text-gray-600">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 text-gray-700">
                <CardHeader className="flex-row items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-gray-900">
                    General Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Have questions about our platform or need help getting
                  started? We&apos;re here to help!
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 text-gray-700">
                <CardHeader className="flex-row items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500">
                    <Clock className="w-6 h-6 text-green-100" />
                  </div>
                  <CardTitle className="text-gray-900">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, we&apos;ll get back to you
                  even sooner.
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 text-gray-700">
                <CardHeader className="flex-row items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-gray-900">
                    What can we help you with?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Questions about Aqwaya features</li>
                    <li>Beta access and waitlist inquiries</li>
                    <li>Partnership opportunities</li>
                    <li>Technical support</li>
                    <li>Feature requests and feedback</li>
                    <li>Press and media inquiries</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
