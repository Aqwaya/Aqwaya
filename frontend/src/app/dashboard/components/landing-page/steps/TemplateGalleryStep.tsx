import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Users, ShoppingCart, Calendar, Sparkles } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  bestFor: string[];
}

interface Props {
  selectedTemplate: string;
  goal: string;
  onSelect: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: "hero-focused",
    name: "Hero Focused",
    description: "Bold hero section with prominent CTA - perfect for lead generation",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    bestFor: ["lead-generation", "email-collection"],
  },
  {
    id: "features-grid",
    name: "Features Grid",
    description: "Showcase benefits with icons and grid layout - ideal for products",
    thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    bestFor: ["product-sales", "trial-signups"],
  },
  {
    id: "testimonial-driven",
    name: "Testimonial Driven",
    description: "Social proof centered design - builds trust for consultations",
    thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    bestFor: ["consultation-booking", "lead-generation"],
  },
  {
    id: "event-countdown",
    name: "Event Countdown",
    description: "Urgency-focused with countdown timer - perfect for events",
    thumbnail: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    bestFor: ["event-signups"],
  },
];

const TemplateGalleryStep: React.FC<Props> = ({ selectedTemplate, goal, onSelect }) => {
  // Sort templates to show recommended ones first based on goal
  const sortedTemplates = [...templates].sort((a, b) => {
    const aMatches = a.bestFor.includes(goal);
    const bMatches = b.bestFor.includes(goal);
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  const getGoalIcon = (templateBestFor: string[]) => {
    if (templateBestFor.includes("lead-generation") || templateBestFor.includes("email-collection")) {
      return <Users className="w-4 h-4" />;
    }
    if (templateBestFor.includes("product-sales") || templateBestFor.includes("trial-signups")) {
      return <ShoppingCart className="w-4 h-4" />;
    }
    if (templateBestFor.includes("event-signups")) {
      return <Calendar className="w-4 h-4" />;
    }
    return <Sparkles className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
        <p className="text-muted-foreground">Select a layout that fits your goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedTemplates.map((template) => {
          const isRecommended = template.bestFor.includes(goal);
          const isSelected = selectedTemplate === template.id;

          return (
            <Card
              key={template.id}
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? "ring-2 ring-primary border-primary"
                  : "hover:border-primary/50"
              }`}
              onClick={() => onSelect(template.id)}
            >
              {isRecommended && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                  <Sparkles className="w-3 h-3" />
                  Recommended
                </div>
              )}
              
              {isSelected && (
                <div className="absolute top-4 left-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              {/* Template Preview */}
              <div
                className="h-48 rounded-t-lg flex items-center justify-center"
                style={{ background: template.thumbnail }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 w-4/5 text-center">
                  <div className="h-3 w-3/4 bg-gray-300 rounded mb-2 mx-auto" />
                  <div className="h-2 w-1/2 bg-gray-200 rounded mb-3 mx-auto" />
                  <div className="h-6 w-24 bg-primary/80 rounded mx-auto" />
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getGoalIcon(template.bestFor)}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateGalleryStep;