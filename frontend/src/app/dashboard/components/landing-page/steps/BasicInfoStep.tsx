import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  formData: {
    pageName: string;
    businessName: string;
    targetAudience: string;
    valueProposition: string;
    colorScheme?: string;
    template?: string;
  };
  handleInputChange: (field: string, value: string) => void;
  children?: React.ReactNode;
}

const BasicInfoStep: React.FC<Props> = ({
  formData,
  handleInputChange,
  children,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Let&apos;s Start with the Basics</h2>
        <p className="text-gray-600">Tell us about your landing page goals</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="pageName">Landing Page Name</Label>
          <Input
            id="pageName"
            value={formData.pageName}
            onChange={(e) => handleInputChange("pageName", e.target.value)}
            placeholder="e.g., Product Launch 2024"
          />
        </div>

        {children}

        <div>
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Input
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) =>
              handleInputChange("targetAudience", e.target.value)
            }
            placeholder="e.g., Small business owners, Tech professionals"
          />
        </div>

        <div>
          <Label htmlFor="valueProposition">Value Proposition</Label>
          <Textarea
            id="valueProposition"
            value={formData.valueProposition}
            onChange={(e) =>
              handleInputChange("valueProposition", e.target.value)
            }
            placeholder="What unique value do you offer? What problem do you solve?"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
