"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Zap, Heart, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <Header />
      <section className="max-w-4xl mx-auto pt-15 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            About Aqwaya
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re on a mission to democratize marketing automation and make
            AI-powered growth accessible to every business, regardless of size
            or technical expertise.
          </p>
        </div>

        {/* Our Mission */}
        <Card className="mb-10 bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="flex-row items-center space-x-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 text-gray-700 text-lg">
            At Aqwaya, we believe that every business deserves access to
            world-class marketing automation, regardless of their budget or
            technical knowledge. We&apos;re building the future where AI handles
            the complex technical aspects of marketing, allowing entrepreneurs
            and businesses to focus on what they do best - serving their
            customers and growing their businesses.
          </CardContent>
        </Card>

        {/* Our Story */}
        <Card className="mb-10 bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="flex-row items-center space-x-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 text-gray-700 text-lg space-y-4">
            <p>
              Aqwaya was born from the frustration of watching talented
              entrepreneurs struggle with marketing complexity. Our founders,
              having built and scaled multiple successful businesses, witnessed
              firsthand how marketing technology barriers prevent great ideas
              from reaching their full potential.
            </p>
            <p>
              We saw how small businesses ran into expensive, complex tools, and
              required technical knowledge. Small business owners spend months
              learning different platforms, thousands of dollars on multiple
              tools, and countless hours on setup and maintenance — time that
              could be better spent growing their business.
            </p>
            <p>
              We knew there had to be a better way. By combining cutting-edge AI
              with intuitive design, we&apos;re creating a platform that helps
              businesses launch campaigns and automatically generate, implement,
              and optimize complete marketing campaigns across all channels.
            </p>
          </CardContent>
        </Card>

        {/* Our Values */}
        <Card className="mb-10 bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="flex-row items-center space-x-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
              <Award className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 pt-2 text-gray-700 text-lg lg:flex-row lg:space-x-6 lg:gap-0">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">
                  Accessibility First
                </h4>
                <p>
                  We believe powerful marketing tools should be available to
                  everyone, not just large enterprises with big budgets.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Results-Driven</h4>
                <p>
                  Our mission is always to get your success. Every feature we
                  build is focused on real business results and growth.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">AI with Purpose</h4>
                <p>
                  We use artificial intelligence to solve real problems, not as
                  a buzzword. Every AI feature has a clear, practical impact.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Continuous Innovation
                </h4>
                <p>
                  Relentlessly exploring what&apos;s next as we evolve
                  technology and adapt to give you the competitive edge.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Team */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="flex-row items-center space-x-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-500">
              <Users className="w-6 h-6 text-orange-100" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Our Team</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 text-gray-700 text-lg space-y-4">
            <p>
              We&apos;re a passionate team of entrepreneurs, engineers,
              designers, and marketers who have experienced both the challenges
              and the triumphs of building businesses from the ground up.
            </p>
            <p>
              By combining technical ability, user experience, and business
              development, we come together to create a platform that truly
              understands what businesses need to succeed.
            </p>
            <p className="italic text-center text-gray-600 border-t border-gray-200 p-4 bg-gray-50">
              &quot;We&apos;re not just building a tool - we&apos;re building
              the future of business growth.&quot;
            </p>
          </CardContent>
        </Card>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
