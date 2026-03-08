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
              src="/logo.png"
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            {isOpen ? (
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-800" />
              </button>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  className="text-white font-semibold bg-[#2C2E66] hover:bg-[rgb(44,46,200)]"
                  onClick={() =>
                    document
                      .getElementById("waitlist-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Join Waitlist
                </Button>
                <button onClick={() => setIsOpen(true)}>
                  <Menu className="w-6 h-6 text-gray-800" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav Links */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 pb-4">
            <Link href="/" className="text-black font-bold block">
              Home
            </Link>
            <Link href="/about" className="text-black font-bold block">
              About us
            </Link>
            <Link href="/contact" className="text-black font-bold block">
              Contact
            </Link>
            <Link href="/faq" className="text-black font-bold block">
              FAQ
            </Link>
            <Link href="/features" className="text-black font-bold block">
              Features
            </Link>

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
        )}
      </div>
    </header>
  );
}
