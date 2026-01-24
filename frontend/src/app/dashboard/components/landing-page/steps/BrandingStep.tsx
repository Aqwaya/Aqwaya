import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Check, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface BusinessProfile {
  businessName?: string;
  brandColor?: string;
  logo?: File | null;
  logoDataUrl?: string;
}

interface Props {
  formData: {
    colorScheme: string;
    logoUrl: string;
    brandColors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  businessProfile: BusinessProfile | null;
  handleInputChange: (field: string, value: unknown) => void;
}

const colorSchemes: ColorScheme[] = [
  {
    id: "professional-blue",
    name: "Professional Blue",
    primary: "#1e40af",
    secondary: "#3b82f6",
    accent: "#60a5fa",
    background: "#ffffff",
    text: "#1f2937",
  },
  {
    id: "modern-purple",
    name: "Modern Purple",
    primary: "#7c3aed",
    secondary: "#8b5cf6",
    accent: "#a78bfa",
    background: "#faf5ff",
    text: "#1f2937",
  },
  {
    id: "energetic-orange",
    name: "Energetic Orange",
    primary: "#ea580c",
    secondary: "#f97316",
    accent: "#fb923c",
    background: "#fffbeb",
    text: "#1f2937",
  },
  {
    id: "nature-green",
    name: "Nature Green",
    primary: "#059669",
    secondary: "#10b981",
    accent: "#34d399",
    background: "#ecfdf5",
    text: "#1f2937",
  },
  {
    id: "elegant-dark",
    name: "Elegant Dark",
    primary: "#1f2937",
    secondary: "#374151",
    accent: "#f59e0b",
    background: "#111827",
    text: "#f9fafb",
  },
  {
    id: "coral-sunset",
    name: "Coral Sunset",
    primary: "#f43f5e",
    secondary: "#fb7185",
    accent: "#fda4af",
    background: "#fff1f2",
    text: "#1f2937",
  },
];

// Helper to generate a matching color scheme from a brand color
const generateSchemeFromColor = (hexColor: string) => {
  // Simple approach: use the brand color as primary, lighten for secondary/accent
  const primary = hexColor;
  
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Create lighter versions
  const lighten = (val: number, amount: number) => Math.min(255, val + amount);
  const secondary = `#${lighten(r, 40).toString(16).padStart(2, '0')}${lighten(g, 40).toString(16).padStart(2, '0')}${lighten(b, 40).toString(16).padStart(2, '0')}`;
  const accent = `#${lighten(r, 80).toString(16).padStart(2, '0')}${lighten(g, 80).toString(16).padStart(2, '0')}${lighten(b, 80).toString(16).padStart(2, '0')}`;
  
  return { primary, secondary, accent };
};

const BrandingStep: React.FC<Props> = ({ formData, businessProfile, handleInputChange }) => {
  // Auto-apply logo from business profile
  useEffect(() => {
    if (businessProfile?.logoDataUrl && !formData.logoUrl) {
      handleInputChange("logoUrl", businessProfile.logoDataUrl);
    }
  }, [businessProfile?.logoDataUrl, formData.logoUrl, handleInputChange]);

  const selectColorScheme = (scheme: ColorScheme) => {
    handleInputChange("colorScheme", scheme.id);
    handleInputChange("brandColors", {
      primary: scheme.primary,
      secondary: scheme.secondary,
      accent: scheme.accent,
    });
  };

  const applyBrandColor = () => {
    if (businessProfile?.brandColor) {
      const scheme = generateSchemeFromColor(businessProfile.brandColor);
      handleInputChange("colorScheme", "custom-brand");
      handleInputChange("brandColors", scheme);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Brand Your Page</h2>
        <p className="text-muted-foreground">Your brand identity will be applied to the landing page</p>
      </div>

      {/* Logo Preview from Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Your Brand Logo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 border-2 border-border rounded-lg flex items-center justify-center overflow-hidden bg-muted">
              {formData.logoUrl || businessProfile?.logoDataUrl ? (
                <Image 
                  src={formData.logoUrl || businessProfile?.logoDataUrl || "/logo.png"}
                  alt="Brand Logo" 
                  className="w-full h-full object-contain" 
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              {formData.logoUrl || businessProfile?.logoDataUrl ? (
                <p className="text-sm text-muted-foreground">
                  Your logo from business profile will be displayed on the landing page.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No logo found. You can upload one in your{" "}
                  <span className="text-primary font-medium">Business Profile Settings</span>.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Color Option */}
      {businessProfile?.brandColor && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Use Your Brand Color
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.colorScheme === "custom-brand"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={applyBrandColor}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg border"
                  style={{ backgroundColor: businessProfile.brandColor }}
                />
                <div>
                  <p className="font-medium">Custom Brand Scheme</p>
                  <p className="text-sm text-muted-foreground">
                    Auto-generated from your brand color ({businessProfile.brandColor})
                  </p>
                </div>
                {formData.colorScheme === "custom-brand" && (
                  <div className="ml-auto w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Color Schemes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Or Choose a Color Scheme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.colorScheme === scheme.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => selectColorScheme(scheme)}
              >
                {formData.colorScheme === scheme.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <div className="flex gap-1 mb-3">
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: scheme.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: scheme.secondary }}
                  />
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: scheme.accent }}
                  />
                </div>
                <p className="text-sm font-medium">{scheme.name}</p>
              </div>
            ))}
          </div>

          {/* Fine-tune Colors */}
          {formData.brandColors && (
            <div className="mt-6 pt-6 border-t">
              <Label className="mb-3 block">Fine-tune Your Colors</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.brandColors.primary}
                    onChange={(e) =>
                      handleInputChange("brandColors", {
                        ...formData.brandColors,
                        primary: e.target.value,
                      })
                    }
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <span className="text-sm">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.brandColors.secondary}
                    onChange={(e) =>
                      handleInputChange("brandColors", {
                        ...formData.brandColors,
                        secondary: e.target.value,
                      })
                    }
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <span className="text-sm">Secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.brandColors.accent}
                    onChange={(e) =>
                      handleInputChange("brandColors", {
                        ...formData.brandColors,
                        accent: e.target.value,
                      })
                    }
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <span className="text-sm">Accent</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingStep;