"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Info,
  Lock,
  Share2,
  UserCheck,
  Cookie,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      <div className="max-w-4xl mx-auto pt-15 pb-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 flex items-center justify-center space-x-2 mb-4">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <span>Privacy Policy</span>
        </h1>
        <p className="text-center text-sm text-gray-500 mb-12">
          Last updated: August 2025
        </p>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          At Aqwaya, we take your privacy seriously. This policy explains how we
          collect, use, and protect your information.
        </p>

        {/* Section: Information We Collect */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center space-x-3">
            <Info className="text-purple-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold">Personal Information</p>
              <ul className="list-disc list-inside">
                <li>Name and email address</li>
                <li>Business information and website details</li>
                <li>Marketing preferences and goals</li>
                <li>Communication history with our support team</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Usage Information</p>
              <ul className="list-disc list-inside">
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Pages visited and features used</li>
                <li>Performance and analytics data</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section: How We Use Your Information */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center space-x-3">
            <UserCheck className="text-green-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-2">
            <ul className="list-disc list-inside">
              <li>Provide and improve our AI-powered marketing services</li>
              <li>
                Send you updates about Aqwaya and early access opportunities
              </li>
              <li>Personalize your experience and marketing recommendations</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze usage patterns to enhance our platform</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section: Data Protection & Security */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center space-x-3">
            <Lock className="text-pink-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">
              Data Protection & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-2">
            <ul className="list-disc list-inside">
              <li>End-to-end encryption for data transmission</li>
              <li>Secure cloud infrastructure with regular audits</li>
              <li>Limited access to personal data on a need-to-know basis</li>
              <li>Regular security training for our team</li>
              <li>Compliance with GDPR, CCPA, and other privacy regulations</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section: Information Sharing */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center space-x-3">
            <Share2 className="text-blue-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">
              Information Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-2">
            <p>
              We do not sell, rent, or share your personal information with
              third parties except:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Service Providers:</strong> Trusted partners (e.g.,
                hosting, analytics, customer support)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly agree to
                share information
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section: Your Rights */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center space-x-3">
            <ShieldCheck className="text-indigo-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-2">
            <ul className="list-disc list-inside">
              <li>Access and review your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your account and personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Data portability and transfer to another service</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p>
              To exercise these rights, contact us at:{" "}
              <strong className="text-blue-600">privacy@aqwaya.com</strong>
            </p>
          </CardContent>
        </Card>

        {/* Section: Cookies and Tracking */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center space-x-3">
            <Cookie className="text-yellow-600 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">
              Cookies and Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-2">
            <ul className="list-disc list-inside">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure platform security and functionality</li>
            </ul>
            <p className="text-sm text-gray-500">
              You can manage cookie preferences through your browser settings.
              Disabling cookies may affect functionality.
            </p>
          </CardContent>
        </Card>

        {/* Section: Contact Us */}
        <Card className="mb-12">
          <CardHeader className="flex flex-row items-center space-x-3">
            <Mail className="text-blue-500 w-6 h-6" />
            <CardTitle className="text-lg font-semibold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-2">
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <ul className="space-y-1">
              <li>
                <strong>Email:</strong> privacy@aqwaya.com
              </li>
              <li>
                <strong>General Inquiries:</strong> hello@aqwaya.com
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              This Privacy Policy may be updated from time to time. We will
              notify you of any material changes via email or through our
              platform.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
