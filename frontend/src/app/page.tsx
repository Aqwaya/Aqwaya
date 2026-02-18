"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow-md flex flex-col items-center w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="Aqwaya Logo"
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center">
          Welcome to Aqwaya
        </h1>

        {/* Sign Up button */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/auth/register" className="w-full">
            <Button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full text-sm sm:text-base">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Sign in link */}
        <div className="mt-6 text-gray-700 text-xs sm:text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </main>
  );
}
