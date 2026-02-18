"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/api/auth";
import axios from "axios";

// Helper to check if user is logged in
const isLoggedIn = () => !!localStorage.getItem("token");

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Redirect logged-in users away from login page
  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg =
          (err.response?.data as { message?: string })?.message ||
          "Login failed";
        setError(msg);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white">
        <CardHeader className="flex flex-col items-center">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <CardTitle className="mt-4 text-2xl font-bold text-gray-900">
            Welcome to Aqwaya
          </CardTitle>
          <p className="text-sm text-gray-500">
            Sign in to your account or create a new one
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 border rounded-lg overflow-hidden bg-gray-100 p-1">
            <Link
              href="/auth/login"
              className="flex-1 px-4 py-2 bg-white text-gray-500 font-medium text-center rounded-md"
            >
              Sign In
            </Link>

            <Link
              href="/auth/register"
              className="flex-1 px-4 py-2 text-gray-900 font-medium text-center"
            >
              Sign Up
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-white py-3 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
