"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Code, Edit, CheckCircle, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface LandingPageFormData {
  pageName?: string;
  id?: string;
  pageId?: string;
  industry?: string;
  valueProposition?: string;
  businessName?: string;
  colorScheme?: string;
  goal?: string;
  [key: string]: unknown;
}

interface Props {
  formData: LandingPageFormData;
  user?: { id: string } | null;
}

const LandingPagePreviewCard: React.FC<Props> = ({ formData }) => {
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  // Mock submit function (instead of Supabase)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockSubmitLead = (lead: { name: string; email: string }) =>
    new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1200); // simulate API delay
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leadEmail) {
      toast({
        title: "Submission error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await mockSubmitLead({
        name: leadName,
        email: leadEmail,
      });

      if (result.success) {
        setSubmitted(true);
        toast({
          title: "Thanks for signing up!",
          description: "We'll be in touch with you soon.",
        });
        setLeadName("");
        setLeadEmail("");
      } else {
        throw new Error("Mock submission failed");
      }
    } catch (err) {
      toast({
        title: "Could not submit lead",
        description: "Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-green-600" />
          <span>{formData.pageName || "Your Landing Page"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-8 border">
          {/* Simulated Landing Page Preview */}
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Transform Your {formData.industry} Business Today
            </h1>
            <p className="text-xl text-gray-600">
              {formData.valueProposition ||
                "Discover how our solution can help you achieve your goals"}
            </p>
            <div className="bg-gray-100 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold mb-4">
                Why Choose {formData.businessName}?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Proven Results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Expert Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Quick Setup</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Get Started Today</h3>
              {!submitted ? (
                <form
                  className="max-w-md mx-auto space-y-3"
                  onSubmit={handleSubmit}
                >
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Your name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                  <Button
                    type="submit"
                    disabled={loading || !leadEmail}
                    className={`w-full ${
                      formData.colorScheme === "professional"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : formData.colorScheme === "modern"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : formData.colorScheme === "energetic"
                        ? "bg-orange-600 hover:bg-orange-700"
                        : formData.colorScheme === "nature"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    {loading
                      ? "Submitting..."
                      : formData.goal === "lead-generation"
                      ? "Get My Free Guide"
                      : formData.goal === "product-sales"
                      ? "Buy Now"
                      : formData.goal === "event-signups"
                      ? "Reserve My Spot"
                      : formData.goal === "trial-signups"
                      ? "Start Free Trial"
                      : "Get Started"}
                  </Button>
                </form>
              ) : (
                <div className="rounded bg-green-50 text-green-700 p-4 mt-4">
                  <CheckCircle className="w-5 h-5 inline-block mr-2" />
                  <span>Lead submitted! Thank you.</span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <p>
                &quot;This has completely changed how we do business!&quot; -
                Happy Customer
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            Full Screen Preview
          </Button>
          <Button variant="outline" className="w-full">
            <Edit className="w-4 h-4 mr-2" />
            Edit Page
          </Button>
          <Button variant="outline" className="w-full">
            <Code className="w-4 h-4 mr-2" />
            Get Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingPagePreviewCard;



