"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="Aqwaya Logo"
              width={30}
              height={30}
              className="w-12 h-12"
            />
            <span className="text-2xl font-bold text-[#122C77]">Aqwaya</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {pathname !== "/" && (
              <Button className="bg-white hover:bg-gray-200 py-1 px-4">
                <Link href="/" className="text-black font-semibold">
                  Home
                </Link>
              </Button>
            )}

            <Button className="bg-white hover:bg-gray-200 py-1 px-4">
              <Link href="/about" className="text-black font-semibold">
                About us
              </Link>
            </Button>

            <Button className="bg-white hover:bg-gray-200 py-1 px-4">
              <Link href="/contact" className="text-black font-semibold">
                Contact
              </Link>
            </Button>

            <Button className="bg-white hover:bg-gray-200 py-1 px-4">
              <Link href="/faq" className="text-black font-semibold">
                FAQ
              </Link>
            </Button>

            {pathname === "/" && (
              <Button
                className="bg-white hover:bg-gray-200 py-1 px-4"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="text-black font-semibold">Features</span>
              </Button>
            )}

            <Button
              className="text-white bg-[#003591] hover:bg-[#75006d] px-8 py-4 rounded-xl"
              onClick={() =>
                document
                  .getElementById("waitlist-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              className="text-white bg-[#003591] hover:bg-[#75006d] px-6 py-4 rounded-xl"
              onClick={() =>
                document
                  .getElementById("waitlist-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-6 h-6 flex items-center justify-center"
            >
              <Menu
                className={`absolute w-6 h-6 text-gray-800 transition-all duration-300 ${
                  isOpen
                    ? "opacity-0 rotate-90 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />

              <X
                className={`absolute w-6 h-6 text-gray-800 transition-all duration-300 ${
                  isOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-75"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-3">
            <Link href="/" className="text-black font-bold block ">
              Home
            </Link>

            <Link
              href="/about"
              className="text-black font-bold block"
            >
              About us
            </Link>

            <Link
              href="/contact"
              className="text-black font-bold block"
            >
              Contact
            </Link>

            <Link
              href="/faq"
              className="text-black font-bold block"
            >
              FAQ
            </Link>

            {pathname === "/" && (
              <button
                className="text-black font-bold text-left"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Features
              </button>
            )}

            <button
              className="text-white bg-[#003591] hover:bg-[#75006d] px-8 py-4 rounded-xl"
              onClick={() => {
                setIsOpen(false);
                document
                  .getElementById("waitlist-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
