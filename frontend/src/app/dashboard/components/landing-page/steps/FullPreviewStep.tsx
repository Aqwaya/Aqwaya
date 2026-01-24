"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Edit,
  Save,
  Globe,
  Smartphone,
  Monitor,
  Check,
  X,
  CreditCard,
  Mail,
  User,
} from "lucide-react";

interface Props {
  formData: {
    pageName: string;
    headline: string;
    subheadline: string;
    offer: string;
    ctaText: string;
    ctaLink: string;
    painPoints: string[];
    benefits: string[];
    targetAudience: string;
    template: string;
    colorScheme: string;
    logoUrl: string;
    brandColors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  goal: string;
  onSaveDraft: () => Promise<void>;
  onPublish: (slug: string) => Promise<void>;
  isSaving: boolean;
  onEditField: (field: string, value: string | string[]) => void;
}

const FullPreviewStep: React.FC<Props> = ({
  formData,
  goal,
  onSaveDraft,
  onPublish,
  isSaving,
  onEditField,
}) => {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [slug, setSlug] = useState(
    formData.pageName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  );
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { brandColors } = formData;

  const startEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingField) {
      onEditField(editingField, editValue);
      setEditingField(null);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const EditableText = ({
    field,
    value,
    className,
    as = "p",
  }: {
    field: string;
    value: string;
    className?: string;
    as?: "h1" | "h2" | "p" | "span";
  }) => {
    const isEditing = editingField === field;
    const Tag = as;

    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={saveEdit}>
            <Check className="w-4 h-4 text-green-600" />
          </Button>
          <Button size="icon" variant="ghost" onClick={cancelEdit}>
            <X className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      );
    }

    return (
      <Tag
        className={`${className} cursor-pointer hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 rounded transition-all group relative`}
        onClick={() => startEdit(field, value)}
      >
        {value}
        <Edit className="w-4 h-4 absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-primary" />
      </Tag>
    );
  };

  // Render goal-specific CTA section
  const renderGoalCTA = () => {
    switch (goal) {
      case "product-sales":
        return (
          <div className="p-8 md:p-12 bg-muted/30">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                {formData.offer || "Get instant access now"}
              </p>
              <a
                href={formData.ctaLink || "#"}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-transform hover:scale-105"
                style={{
                  backgroundColor: brandColors.primary,
                  color: "#fff",
                }}
              >
                <CreditCard className="w-5 h-5" />
                {formData.ctaText || "Buy Now"}
              </a>
              <p className="text-xs text-muted-foreground mt-4">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>
        );

      case "consultation-booking":
        return (
          <div className="p-8 md:p-12 bg-muted/30">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-xl font-bold mb-4">
                Book Your Free Consultation
              </h3>
              <p className="text-muted-foreground mb-6">
                {formData.offer || "Schedule a call with our expert"}
              </p>
              <a
                href={formData.ctaLink || "#"}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-transform hover:scale-105"
                style={{
                  backgroundColor: brandColors.primary,
                  color: "#fff",
                }}
              >
                {formData.ctaText || "Book Now"}
              </a>
            </div>
          </div>
        );

      case "trial-signups":
        return (
          <div className="p-8 md:p-12 bg-muted/30">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">
                Start Your Free Trial
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                No credit card required
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Your Name" className="pl-10" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="pl-10"
                  />
                </div>
                <button
                  className="w-full py-3 rounded-lg font-semibold"
                  style={{
                    backgroundColor: brandColors.primary,
                    color: "#fff",
                  }}
                >
                  {formData.ctaText || "Start Free Trial"}
                </button>
              </div>
            </div>
          </div>
        );

      case "event-signups":
        return (
          <div className="p-8 md:p-12 bg-muted/30">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">
                Reserve Your Spot
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                {formData.offer || "Limited seats available"}
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Your Name" className="pl-10" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="pl-10"
                  />
                </div>
                <button
                  className="w-full py-3 rounded-lg font-semibold"
                  style={{
                    backgroundColor: brandColors.primary,
                    color: "#fff",
                  }}
                >
                  {formData.ctaText || "Reserve My Spot"}
                </button>
              </div>
            </div>
          </div>
        );

      // Default: lead-generation
      default:
        return (
          <div className="p-8 md:p-12 bg-muted/30">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-center mb-4">
                Get Your Free Guide
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Enter your details below
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Your Name" className="pl-10" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="pl-10"
                  />
                </div>
                <button
                  className="w-full py-3 rounded-lg font-semibold"
                  style={{
                    backgroundColor: brandColors.primary,
                    color: "#fff",
                  }}
                >
                  {formData.ctaText || "Download Now"}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderPreview = () => {
    const containerClass =
      viewMode === "mobile" ? "max-w-sm mx-auto" : "w-full";

    return (
      <div
        className={`${containerClass} bg-white rounded-lg shadow-xl overflow-hidden`}
        style={{ minHeight: "600px" }}
      >
        {/* Logo */}
        {formData.logoUrl && (
          <div className="p-4 flex justify-center border-b">
            <Image
              src={formData.logoUrl}
              alt="Logo"
              className="h-10 object-contain"
            />
          </div>
        )}

        {/* Hero Section */}
        <div
          className="p-8 md:p-12 text-center"
          style={{
            background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
          }}
        >
          <EditableText
            field="headline"
            value={formData.headline || "Your Compelling Headline"}
            as="h1"
            className="text-2xl md:text-4xl font-bold text-white mb-4"
          />
          <EditableText
            field="subheadline"
            value={
              formData.subheadline ||
              "A supporting subheadline that explains your value"
            }
            as="p"
            className="text-lg text-white/90 mb-6"
          />
          <button
            className="px-8 py-3 rounded-lg font-semibold text-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: brandColors.accent,
              color: "#fff",
            }}
          >
            {formData.ctaText || "Get Started"}
          </button>
        </div>

        {/* Pain Points / Benefits Section */}
        <div className="p-8 md:p-12">
          {formData.painPoints.filter((p) => p.trim()).length > 0 && (
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: brandColors.primary }}
              >
                Are you struggling with...
              </h2>
              <ul className="space-y-2">
                {formData.painPoints
                  .filter((p) => p.trim())
                  .map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {formData.benefits.filter((b) => b.trim()).length > 0 && (
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: brandColors.primary }}
              >
                What you&apos;ll get:
              </h2>
              <ul className="space-y-2">
                {formData.benefits
                  .filter((b) => b.trim())
                  .map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Offer Section */}
          <div
            className="p-6 rounded-lg text-center"
            style={{ backgroundColor: `${brandColors.primary}10` }}
          >
            <h3 className="text-lg font-semibold mb-2">Special Offer</h3>
            <EditableText
              field="offer"
              value={formData.offer || "Your irresistible offer goes here"}
              as="p"
              className="text-muted-foreground mb-4"
            />
            <button
              className="px-6 py-2 rounded-lg font-medium transition-transform hover:scale-105"
              style={{
                backgroundColor: brandColors.primary,
                color: "#fff",
              }}
            >
              {formData.ctaText || "Claim Now"}
            </button>
          </div>
        </div>

        {/* Goal-specific CTA Section */}
        {renderGoalCTA()}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Preview Your Landing Page</h2>
        <p className="text-muted-foreground">
          Click any text to edit it directly
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Button
          variant={viewMode === "desktop" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("desktop")}
        >
          <Monitor className="w-4 h-4 mr-2" />
          Desktop
        </Button>
        <Button
          variant={viewMode === "mobile" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("mobile")}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Mobile
        </Button>
      </div>

      {/* Preview Container */}
      <div className="border rounded-lg p-4 bg-muted/30 overflow-auto">
        {renderPreview()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onSaveDraft} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save as Draft"}
        </Button>
        <Button
          onClick={() => setShowPublishModal(true)}
          disabled={isSaving}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <Globe className="w-4 h-4 mr-2" />
          Publish
        </Button>
      </div>

      {/* Publish Modal */}
      <Dialog open={showPublishModal} onOpenChange={setShowPublishModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Your Landing Page</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="slug">Your Page URL</Label>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-muted-foreground text-sm">
                yoursite.com/
              </span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                  )
                }
                placeholder="my-landing-page"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This will be the URL where your landing page is accessible.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPublishModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onPublish(slug);
                setShowPublishModal(false);
              }}
              disabled={!slug || isSaving}
            >
              <Globe className="w-4 h-4 mr-2" />
              Publish Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FullPreviewStep;
