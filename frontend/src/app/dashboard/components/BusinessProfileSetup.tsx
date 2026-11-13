"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Upload, Palette } from "lucide-react";
import AuthGuard from "@/components/authguard";
import { saveBusinessProfile } from "@/lib/profile";

export interface BusinessProfileData {
  businessName: string;
  industry: string;
  website: string;
  location: string;
  description: string;
  employees: string;
  brandColor: string;
  logo?: string | null | undefined;
  logoName?: string;
}

interface BusinessProfileSetupProps {
  onComplete: (data: BusinessProfileData) => void;
}

const BusinessProfileSetup = ({ onComplete }: BusinessProfileSetupProps) => {
  const [formData, setFormData] = useState<BusinessProfileData>({
    businessName: "",
    industry: "",
    website: "",
    location: "",
    description: "",
    employees: "",
    brandColor: "#3B82F6",
    logo: null,
  });

  const industries = [
    "E-commerce & Retail",
    "Technology & Software",
    "Healthcare & Medical",
    "Finance & Banking",
    "Education & Training",
    "Real Estate",
    "Professional Services",
    "Manufacturing",
    "Food & Beverage",
    "Travel & Tourism",
    "Non-profit",
    "Other",
  ];

  const employeeSizes = [
    "Just me",
    "2-10 employees",
    "11-50 employees",
    "51-200 employees",
    "200+ employees",
  ];

  // Unified input change handler
  const handleInputChange = (
    field: keyof BusinessProfileData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Restore from localStorage once
  useEffect(() => {
    const savedData = localStorage.getItem("businessProfile");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem("businessProfile", JSON.stringify(formData));
    }
  }, [formData]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logoName: file.name, // 👈 only store name
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Save profile to backend (if needed)
      const response = await saveBusinessProfile(formData);
      console.log("Saved:", response);

      // Save only logo name (not file data)
      const dataToStore = {
        ...formData,
        logo: null, // don't store the image
        logoName: formData.logoName || null, // store just the filename
      };

      // Optionally, store just the logo name separately for quick access
      if (formData.logoName) {
        localStorage.setItem("logoName", formData.logoName);
      }

      localStorage.setItem("businessProfile", JSON.stringify(dataToStore));

      // Optional: call the parent callback
      onComplete(formData);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const isFormValid = () => formData.businessName && formData.industry;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">
              Set Up Your Business Profile
            </CardTitle>
            <p className="text-gray-600">
              Tell us about your business to get started
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Business Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
                      placeholder="Your Business Name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <select
                      id="industry"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.industry}
                      onChange={(e) =>
                        handleInputChange("industry", e.target.value)
                      }
                      required
                    >
                      <option value="">Select your industry</option>
                      {industries.map((ind) => (
                        <option key={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employees">Company Size</Label>
                    <select
                      id="employees"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.employees}
                      onChange={(e) =>
                        handleInputChange("employees", e.target.value)
                      }
                    >
                      <option value="">Select size</option>
                      {employeeSizes.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Tell us about your business..."
                  />
                </div>
              </div>

              {/* Branding */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Brand Identity
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo Upload</Label>
                    <input
                      id="logo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("logo")?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {/* show stored logo name or default text */}
                      {formData.logoName || "Upload Logo"}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandColor">Brand Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="brandColor"
                        type="color"
                        value={formData.brandColor}
                        onChange={(e) =>
                          handleInputChange("brandColor", e.target.value)
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={formData.brandColor}
                        onChange={(e) =>
                          handleInputChange("brandColor", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!isFormValid()}
                >
                  Complete Setup & Continue to Dashboard
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
};
export default BusinessProfileSetup;
