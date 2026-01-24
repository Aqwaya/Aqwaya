import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X, Target } from "lucide-react";

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
  };
  goal: string;
  onGoalChange: (goal: string) => void;
  handleInputChange: (field: string, value: string | string[]) => void;
}

const GOALS = [
  { id: "lead-generation", label: "Lead Generation", description: "Capture leads with a form" },
  { id: "product-sales", label: "Product Sales", description: "Drive purchases with payment link" },
  { id: "event-signups", label: "Event Sign-ups", description: "Get registrations for events" },
  { id: "trial-signups", label: "Free Trial Sign-ups", description: "Convert visitors to trial users" },
  { id: "consultation-booking", label: "Consultation Booking", description: "Book appointments & calls" },
];

const GoalContentStep: React.FC<Props> = ({ formData, goal, onGoalChange, handleInputChange }) => {
  const addPainPoint = () => {
    handleInputChange("painPoints", [...formData.painPoints, ""]);
  };

  const removePainPoint = (index: number) => {
    const updated = formData.painPoints.filter((_, i) => i !== index);
    handleInputChange("painPoints", updated);
  };

  const updatePainPoint = (index: number, value: string) => {
    const updated = [...formData.painPoints];
    updated[index] = value;
    handleInputChange("painPoints", updated);
  };

  const addBenefit = () => {
    handleInputChange("benefits", [...formData.benefits, ""]);
  };

  const removeBenefit = (index: number) => {
    const updated = formData.benefits.filter((_, i) => i !== index);
    handleInputChange("benefits", updated);
  };

  const updateBenefit = (index: number, value: string) => {
    const updated = [...formData.benefits];
    updated[index] = value;
    handleInputChange("benefits", updated);
  };

  const getGoalSpecificPlaceholders = () => {
    switch (goal) {
      case "lead-generation":
        return {
          headline: "Get Your Free Guide to Growing Your Business",
          offer: "Free 10-page guide with actionable tips",
          ctaText: "Download Now",
        };
      case "product-sales":
        return {
          headline: "Transform Your Life with Our Product",
          offer: "50% off for first-time buyers",
          ctaText: "Buy Now",
        };
      case "event-signups":
        return {
          headline: "Join Our Exclusive Webinar",
          offer: "Free live training + Q&A session",
          ctaText: "Reserve My Spot",
        };
      case "trial-signups":
        return {
          headline: "Start Your Free Trial Today",
          offer: "14-day free trial, no credit card required",
          ctaText: "Start Free Trial",
        };
      case "consultation-booking":
        return {
          headline: "Book Your Free Strategy Session",
          offer: "30-minute consultation with an expert",
          ctaText: "Book Now",
        };
      default:
        return {
          headline: "Your Compelling Headline Here",
          offer: "Your irresistible offer",
          ctaText: "Get Started",
        };
    }
  };

  const placeholders = getGoalSpecificPlaceholders();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Customize Your Landing Page Content</h2>
        <p className="text-muted-foreground">Fill in the details that will appear on your page</p>
      </div>

      {/* Goal Selector */}
      <div className="mb-6">
        <Label className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4" />
          Landing Page Goal *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {GOALS.map((g) => (
            <div
              key={g.id}
              onClick={() => onGoalChange(g.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                goal === g.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="font-medium text-sm">{g.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{g.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="pageName">Page Name (Internal)</Label>
            <Input
              id="pageName"
              value={formData.pageName}
              onChange={(e) => handleInputChange("pageName", e.target.value)}
              placeholder="e.g., Product Launch Q1 2024"
            />
          </div>

          <div>
            <Label htmlFor="headline">Headline *</Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => handleInputChange("headline", e.target.value)}
              placeholder={placeholders.headline}
            />
          </div>

          <div>
            <Label htmlFor="subheadline">Subheadline</Label>
            <Textarea
              id="subheadline"
              value={formData.subheadline}
              onChange={(e) => handleInputChange("subheadline", e.target.value)}
              placeholder="A supporting statement that reinforces your headline"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="offer">Your Offer *</Label>
            <Textarea
              id="offer"
              value={formData.offer}
              onChange={(e) => handleInputChange("offer", e.target.value)}
              placeholder={placeholders.offer}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input
              id="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange("targetAudience", e.target.value)}
              placeholder="e.g., Small business owners aged 30-50"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">CTA Button Text *</Label>
              <Input
                id="ctaText"
                value={formData.ctaText}
                onChange={(e) => handleInputChange("ctaText", e.target.value)}
                placeholder={placeholders.ctaText}
              />
            </div>
            <div>
              <Label htmlFor="ctaLink">
                {goal === "product-sales" ? "Payment Link *" : "CTA Link"}
              </Label>
              <Input
                id="ctaLink"
                value={formData.ctaLink}
                onChange={(e) => handleInputChange("ctaLink", e.target.value)}
                placeholder={goal === "product-sales" ? "https://pay.stripe.com/..." : "https://..."}
              />
            </div>
          </div>

          {/* Pain Points */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Pain Points (Problems you solve)</Label>
              <Button type="button" variant="ghost" size="sm" onClick={addPainPoint}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.painPoints.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={point}
                    onChange={(e) => updatePainPoint(index, e.target.value)}
                    placeholder={`Pain point ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePainPoint(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Benefits (What they get)</Label>
              <Button type="button" variant="ghost" size="sm" onClick={addBenefit}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder={`Benefit ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBenefit(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalContentStep;
