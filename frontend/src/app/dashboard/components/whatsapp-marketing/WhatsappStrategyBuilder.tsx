"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  Users,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppStrategyBuilderProps {
  goal: string;
  onBack: () => void;
  onComplete: (strategy: unknown) => void;
}

const WhatsAppStrategyBuilder = ({
  goal,
  onBack,
  onComplete,
}: WhatsAppStrategyBuilderProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);
  const [formData, setFormData] = useState({
    targetAudience: "",
    businessType: "",
    currentContacts: "",
    messageFrequency: "",
    primaryLanguage: "",
    additionalInfo: "",
  });

  const getGoalInfo = () => {
    switch (goal) {
      case "customer-support":
        return {
          title: "Customer Support Automation",
          description: "Create AI-powered support flows for your customers",
          icon: MessageSquare,
          color: "from-blue-500 to-cyan-500",
          fields: [
            {
              id: "targetAudience",
              label: "Who are your customers?",
              placeholder: "e.g., E-commerce shoppers, SaaS users...",
              required: true,
            },
            {
              id: "businessType",
              label: "Business Type",
              type: "select",
              options: [
                "E-commerce",
                "SaaS",
                "Services",
                "Healthcare",
                "Education",
                "Other",
              ],
              required: true,
            },
            {
              id: "currentContacts",
              label: "Current Customer Base Size",
              type: "select",
              options: ["0-500", "500-2,000", "2,000-10,000", "10,000+"],
              required: true,
            },
            {
              id: "additionalInfo",
              label: "Common support questions you receive",
              placeholder: "List the most frequent customer inquiries...",
              multiline: true,
            },
          ],
        };
      case "sales-promotions":
        return {
          title: "Sales & Promotions",
          description: "Drive sales with targeted promotional campaigns",
          icon: Zap,
          color: "from-green-500 to-emerald-500",
          fields: [
            {
              id: "targetAudience",
              label: "Target Customer Profile",
              placeholder: "e.g., Fashion enthusiasts aged 25-40...",
              required: true,
            },
            {
              id: "businessType",
              label: "Business Type",
              type: "select",
              options: [
                "Retail",
                "E-commerce",
                "Restaurant",
                "Services",
                "B2B",
                "Other",
              ],
              required: true,
            },
            {
              id: "currentContacts",
              label: "Contact List Size",
              type: "select",
              options: ["0-500", "500-2,000", "2,000-10,000", "10,000+"],
              required: true,
            },
            {
              id: "messageFrequency",
              label: "Promotion Frequency",
              type: "select",
              options: [
                "Daily deals",
                "Weekly offers",
                "Bi-weekly",
                "Monthly campaigns",
              ],
              required: true,
            },
            {
              id: "additionalInfo",
              label: "What products/services are you promoting?",
              placeholder: "Describe your main offerings...",
              multiline: true,
            },
          ],
        };
      case "order-updates":
        return {
          title: "Order Updates & Notifications",
          description: "Keep customers informed throughout their journey",
          icon: Send,
          color: "from-orange-500 to-amber-500",
          fields: [
            {
              id: "businessType",
              label: "Business Type",
              type: "select",
              options: [
                "E-commerce",
                "Food Delivery",
                "Logistics",
                "Retail",
                "Services",
                "Other",
              ],
              required: true,
            },
            {
              id: "currentContacts",
              label: "Monthly Orders",
              type: "select",
              options: ["0-100", "100-500", "500-2,000", "2,000+"],
              required: true,
            },
            {
              id: "additionalInfo",
              label: "What order stages do you want to notify?",
              placeholder:
                "e.g., Order confirmed, shipped, out for delivery, delivered...",
              multiline: true,
            },
          ],
        };
      case "appointment-reminders":
        return {
          title: "Appointment Reminders",
          description: "Reduce no-shows with automated reminders",
          icon: Clock,
          color: "from-purple-500 to-violet-500",
          fields: [
            {
              id: "businessType",
              label: "Business Type",
              type: "select",
              options: [
                "Healthcare",
                "Salon/Spa",
                "Consulting",
                "Fitness",
                "Education",
                "Other",
              ],
              required: true,
            },
            {
              id: "currentContacts",
              label: "Monthly Appointments",
              type: "select",
              options: ["0-50", "50-200", "200-500", "500+"],
              required: true,
            },
            {
              id: "messageFrequency",
              label: "Reminder Timing",
              type: "select",
              options: [
                "24 hours before",
                "48 hours before",
                "1 week + 24 hours",
                "Custom schedule",
              ],
              required: true,
            },
            {
              id: "additionalInfo",
              label: "Additional appointment details to include",
              placeholder:
                "e.g., Location, preparation instructions, cancellation policy...",
              multiline: true,
            },
          ],
        };
      case "lead-nurturing":
        return {
          title: "Lead Nurturing & Follow-ups",
          description: "Convert leads with personalized sequences",
          icon: Users,
          color: "from-pink-500 to-rose-500",
          fields: [
            {
              id: "targetAudience",
              label: "Who are your leads?",
              placeholder:
                "e.g., Small business owners interested in marketing...",
              required: true,
            },
            {
              id: "businessType",
              label: "Business Type",
              type: "select",
              options: [
                "B2B Services",
                "Real Estate",
                "Insurance",
                "Education",
                "Consulting",
                "Other",
              ],
              required: true,
            },
            {
              id: "currentContacts",
              label: "Monthly Lead Volume",
              type: "select",
              options: ["0-50", "50-200", "200-500", "500+"],
              required: true,
            },
            {
              id: "messageFrequency",
              label: "Follow-up Frequency",
              type: "select",
              options: [
                "Daily for 5 days",
                "Every 2 days",
                "Weekly",
                "Custom sequence",
              ],
              required: true,
            },
            {
              id: "additionalInfo",
              label: "What's your main offer/value proposition?",
              placeholder: "Describe what you want leads to do...",
              multiline: true,
            },
          ],
        };
      default:
        return {
          title: "WhatsApp Marketing Strategy",
          description: "Create your custom WhatsApp campaign",
          icon: MessageSquare,
          color: "from-green-500 to-emerald-500",
          fields: [],
        };
    }
  };

  const goalInfo = getGoalInfo();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateStrategy = async () => {
    const requiredFields = goalInfo.fields
      .filter((field) => field.required)
      .map((field) => field.id);

    const missingFields = requiredFields.filter(
      (fieldId) => !formData[fieldId as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description:
          "Please fill in all required fields before generating your strategy.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsGenerating(false);
    setShowStrategy(true);

    toast({
      title: "Strategy Generated!",
      description: "Your personalized WhatsApp marketing strategy is ready.",
    });
  };

  const handleImplementStrategy = () => {
    const strategy = {
      goal,
      ...formData,
      generatedAt: new Date().toISOString(),
    };
    onComplete(strategy);
  };

  if (showStrategy) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setShowStrategy(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{goalInfo.title}</h1>
            <p className="text-gray-600">Your AI-Generated WhatsApp Strategy</p>
          </div>
        </div>

        <Card className={`bg-gradient-to-r ${goalInfo.color} text-white`}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <Sparkles className="w-6 h-6" />
              <span>Strategy Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90">
              We&quot;ve created a comprehensive WhatsApp strategy targeting{" "}
              <strong>
                {formData.targetAudience || formData.businessType}
              </strong>{" "}
              with automated message sequences and templates optimized for
              engagement.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <span>Message Sequence</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Welcome Message</p>
                    <p className="text-sm text-gray-600">
                      Immediate - Personalized greeting
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Value Message</p>
                    <p className="text-sm text-gray-600">
                      Day 1 - Key benefits & info
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Engagement Message</p>
                    <p className="text-sm text-gray-600">
                      Day 3 - Interactive content
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Action Message</p>
                    <p className="text-sm text-gray-600">
                      Day 5 - CTA & conversion
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Expected Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <p className="font-medium">Open Rate</p>
                  <p className="text-sm text-gray-600">95-98% (vs 20% email)</p>
                </li>
                <li>
                  <p className="font-medium">Response Rate</p>
                  <p className="text-sm text-gray-600">40-60%</p>
                </li>
                <li>
                  <p className="font-medium">Click-through Rate</p>
                  <p className="text-sm text-gray-600">25-35%</p>
                </li>
                <li>
                  <p className="font-medium">Conversion Boost</p>
                  <p className="text-sm text-gray-600">
                    3-5x vs other channels
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span>Best Practices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use rich media (images, videos)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Keep messages under 160 chars</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Include clear CTAs with buttons</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Respect messaging windows</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Personalize with {"{{name}}"} tags</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Message Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Template 1: Welcome Message</h3>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                    Approved
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                  <p className="text-sm text-gray-700">
                    👋 Hi {"{{name}}"}, welcome to {"{{business}}"}!
                    <br />
                    <br />
                    We&quot;re thrilled to have you. Here&quot;s what you can
                    expect from us:
                    <br />
                    ✅ Exclusive offers & updates
                    <br />
                    ✅ Quick support when you need it
                    <br />
                    ✅ Personalized recommendations
                    <br />
                    <br />
                    Reply &quot;HI&quot; to get started! 🚀
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">
                    Template 2: Follow-up Message
                  </h3>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                    Ready
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700">
                    Hey {"{{name}}"}, just checking in! 💬
                    <br />
                    <br />
                    Did you know that our customers save an average of 30% with
                    our exclusive WhatsApp-only deals?
                    <br />
                    <br />
                    🎁 Tap below to see today&quot;s special offer:
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Goals
          </Button>
          <div className="space-x-3">
            <Button variant="outline">Download Strategy PDF</Button>
            <Button
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={handleImplementStrategy}
            >
              Implement Strategy
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{goalInfo.title}</h1>
          <p className="text-gray-600">{goalInfo.description}</p>
        </div>
      </div>

      <Card className={`bg-gradient-to-r ${goalInfo.color} text-white`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-white">
            <goalInfo.icon className="w-6 h-6" />
            <span>Let&quot;s Create Your Strategy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">
            Answer a few questions so our AI can create a personalized WhatsApp
            marketing strategy for your specific goal.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {goalInfo.fields.map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id}>
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              {field.type === "select" ? (
                <Select
                  value={formData[field.id as keyof typeof formData]}
                  onValueChange={(value) => handleInputChange(field.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Select ${field.label.toLowerCase()}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.multiline ? (
                <Textarea
                  id={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                />
              ) : (
                <Input
                  id={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}

          <Button
            onClick={generateStrategy}
            disabled={isGenerating}
            className={`w-full bg-gradient-to-r ${goalInfo.color}`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Generating Your Strategy...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate My WhatsApp Strategy
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppStrategyBuilder;
