import Image from "next/image";
import { Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-50 pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/footer-logo.png"
                alt="Aqwaya Logo"
                width={30}
                height={30}
                className="w-8 h-8"
              />
              <span className="text-2xl font-semibold text-gray-50">
                Aqwaya
              </span>
            </div>

            <p className="text-gray-400 max-w-md">
              The future of marketing automation is here. Join the waitlist to
              be among the first to experience AI-powered marketing that
              actually works.
            </p>
            <div className="flex gap-3 mt-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-200">
                <Mail className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-200">
                <FaXTwitter className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-200">
                <FaLinkedin className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-50 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-gray-50 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-50 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-gray-50 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Aqwaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
