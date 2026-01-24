// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   ArrowLeft,
//   Wand2,
//   Target,
//   Mail,
//   TrendingUp,
//   Zap,
//   AlertCircle,
//   CheckCircle2,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import type { EmailStrategy } from "@/types/emailStrategy";

// /* -------------------- Types -------------------- */

// interface User {
//   id: string;
//   name: string;
//   email?: string;
// }

// interface AIStrategyBuilderProps {
//   user: User;
//   onBack: () => void;
//   onComplete: (strategy: EmailStrategy) => void;
// }

// interface BusinessInfo {
//   business_name: string;
//   business_type: string;
//   industry: string;
//   target_audience: string;
//   customer_pain_points: string;
//   unique_value_proposition: string;
//   marketing_goals: string[];
//   current_challenges: string[];
//   email_frequency: string;
//   content_preferences: {
//     tone: string;
//     style: string;
//     content_types: string[];
//   };
// }

// /* -------------------- Component -------------------- */

// const AIStrategyBuilder = ({
//   user,
//   onBack,
//   onComplete,
// }: AIStrategyBuilderProps) => {
//   const { toast } = useToast();

//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [isGenerating, setIsGenerating] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
//     business_name: "",
//     business_type: "",
//     industry: "",
//     target_audience: "",
//     customer_pain_points: "",
//     unique_value_proposition: "",
//     marketing_goals: [],
//     current_challenges: [],
//     email_frequency: "",
//     content_preferences: {
//       tone: "",
//       style: "",
//       content_types: [],
//     },
//   });

//   /* -------------------- Static Data -------------------- */

//   const businessTypes = [
//     "E-commerce",
//     "SaaS",
//     "Consulting",
//     "Education",
//     "Healthcare",
//     "Real Estate",
//     "Finance",
//     "Non-profit",
//     "B2B Services",
//     "Restaurant/Food",
//   ];

//   const marketingGoals = [
//     "Increase sales revenue",
//     "Build brand awareness",
//     "Nurture leads",
//     "Customer retention",
//     "Product launches",
//     "Educational content",
//     "Event promotion",
//     "Customer onboarding",
//   ];

//   const challenges = [
//     "Low email open rates",
//     "Poor conversion rates",
//     "Lack of engaging content",
//     "Email deliverability issues",
//     "Growing subscriber list",
//     "Automation setup",
//     "Segmentation strategy",
//     "A/B testing implementation",
//   ];

//   const contentTypes = [
//     "Newsletters",
//     "Product updates",
//     "Educational content",
//     "Case studies",
//     "Behind-the-scenes",
//     "Customer stories",
//     "Industry insights",
//     "How-to guides",
//   ];

//   /* -------------------- Handlers -------------------- */

//   const handleToggle = (
//     key: "marketing_goals" | "current_challenges",
//     value: string
//   ) => {
//     setBusinessInfo((prev) => ({
//       ...prev,
//       [key]: prev[key].includes(value)
//         ? prev[key].filter((v) => v !== value)
//         : [...prev[key], value],
//     }));
//   };

//   const handleContentTypeToggle = (type: string) => {
//     setBusinessInfo((prev) => ({
//       ...prev,
//       content_preferences: {
//         ...prev.content_preferences,
//         content_types: prev.content_preferences.content_types.includes(type)
//           ? prev.content_preferences.content_types.filter((t) => t !== type)
//           : [...prev.content_preferences.content_types, type],
//       },
//     }));
//   };

//   const validateForm = (): boolean => {
//     if (!businessInfo.business_name.trim()) {
//       setError("Business name is required");
//       return false;
//     }
//     if (!businessInfo.business_type) {
//       setError("Please select a business type");
//       return false;
//     }
//     if (businessInfo.marketing_goals.length === 0) {
//       setError("Please select at least one marketing goal");
//       return false;
//     }
//     setError(null);
//     return true;
//   };

//   /* -------------------- Strategy Generation -------------------- */

//   const generateStrategy = async (): Promise<void> => {
//     if (!validateForm()) return;

//     setIsGenerating(true);
//     setError(null);

//     try {
//       const strategy: EmailStrategy = {
//         id: `strategy-${Date.now()}`,
//         name: `${businessInfo.business_name} AI Email Strategy`,
//         business_type: businessInfo.business_type,
//         marketing_goals: businessInfo.marketing_goals,
//         created_at: new Date().toISOString(),

//         overview: {
//           business_assessment: "Strong online presence",
//           competitive_advantages: ["Personalized campaigns", "High CTR"],
//           target_audience_insights:
//             "Young professionals aged 25–35 in e-commerce",
//         },

//         generated_strategy: {
//           overview: {
//             business_assessment: "Strong online presence",
//             competitive_advantages: ["Personalized campaigns", "High CTR"],
//             target_audience_insights:
//               "Young professionals aged 25–35 in e-commerce",
//           },
//           next_steps: [
//             {
//               step: "Setup automation",
//               action: "Connect CRM",
//               priority: "high",
//             },
//           ],
//           recommended_workflows: [
//             {
//               name: "Welcome Workflow",
//               type: "Automation",
//               description: "Send a series of emails for new subscribers",
//               suggested_emails: [
//                 {
//                   subject: "Welcome to our family!",
//                   day: 1,
//                   purpose: "Greeting",
//                 },
//               ],
//               priority: "high",
//             },
//           ],
//           content_calendar: {
//             frequency_recommendation: "3x per week",
//             weekly_themes: [
//               { theme: "Customer Stories", content_type: "Email" },
//               { theme: "Promotions", content_type: "Email" },
//             ],
//           },
//           segmentation_strategy: {
//             primary_segments: [
//               {
//                 name: "New Subscribers",
//                 criteria: "Joined <30 days",
//                 messaging_focus: "Onboarding",
//               },
//             ],
//             behavioral_triggers: [
//               { trigger: "No open after 7 days", action: "Resend email" },
//             ],
//           },
//           success_metrics: {
//             primary_kpis: [
//               {
//                 metric: "Open Rate",
//                 target: "20%",
//                 industry_benchmark: "25%",
//               },
//             ],
//             optimization_recommendations: [
//               "Test subject lines weekly",
//               "Improve call-to-action buttons",
//             ],
//           },
//         },

//         target_audience_profile: {
//           description: businessInfo.target_audience,
//           pain_points: businessInfo.customer_pain_points,
//           value_proposition: businessInfo.unique_value_proposition,
//           industry: businessInfo.industry,
//         },
//       };

//       toast({
//         title: "🎉 AI Strategy Generated Successfully!",
//         description: `Strategy for ${businessInfo.business_name} is ready.`,
//       });

//       onComplete(strategy);
//     } catch (err: unknown) {
//       const message =
//         err instanceof Error
//           ? err.message
//           : "Failed to generate strategy. Please try again.";

//       setError(message);

//       toast({
//         title: "Strategy Generation Failed",
//         description: message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   /* -------------------- Render -------------------- */

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <Button variant="outline" onClick={onBack}>
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Back
//       </Button>

//       {error && (
//         <Alert variant="destructive" className="my-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle>AI Email Strategy Builder</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {currentStep === 1 && (
//             <>
//               <Label>Business Name *</Label>
//               <Input
//                 value={businessInfo.business_name}
//                 onChange={(e) =>
//                   setBusinessInfo((p) => ({
//                     ...p,
//                     business_name: e.target.value,
//                   }))
//                 }
//               />
//             </>
//           )}

//           <div className="flex justify-between">
//             <Button
//               variant="outline"
//               disabled={currentStep === 1}
//               onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
//             >
//               Previous
//             </Button>

//             {currentStep < 3 ? (
//               <Button onClick={() => setCurrentStep((s) => s + 1)}>Next</Button>
//             ) : (
//               <Button onClick={generateStrategy} disabled={isGenerating}>
//                 {isGenerating ? (
//                   <>
//                     <Zap className="w-4 h-4 mr-2 animate-spin" />
//                     Generating...
//                   </>
//                 ) : (
//                   <>
//                     <Wand2 className="w-4 h-4 mr-2" />
//                     Generate Strategy
//                   </>
//                 )}
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AIStrategyBuilder;

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Wand2,
  Target,
  Mail,
  TrendingUp,
  Zap,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
<<<<<<< HEAD

// Local User type
type AIStrategy = {
  id: string;
  name: string;
  business_type: string;
  marketing_goals: string[];
  created_at: string;
  generated_strategy: {
    recommended_workflows: {
      type: string;
      name: string;
      description: string;
      suggested_emails: { subject: string }[];
    }[];
  };
  target_audience_profile: {
    description: string;
    pain_points: string;
    value_proposition: string;
    industry: string;
  };
};
=======
import type { EmailStrategy } from "@/types/emailStrategy";
import type { User } from "@/lib/mockUser";

/* -------------------- TYPES -------------------- */

interface ContentPreferences {
  tone: string;
  style: string;
  content_types: string[];
}

interface BusinessInfo {
  business_type: string;
  industry: string;
  target_audience: string;
  customer_pain_points: string;
  unique_value_proposition: string;
  marketing_goals: string[];
  current_challenges: string[];
  email_frequency: string;
  content_preferences: ContentPreferences;
}
>>>>>>> 31ab30e (update)

interface AIStrategyBuilderProps {
  user: unknown;
  onBack: () => void;
  onComplete: (strategy: AIStrategy) => void;
}


/* -------------------- COMPONENT -------------------- */

const AIStrategyBuilder = ({
  user,
  onBack,
  onComplete,
}: AIStrategyBuilderProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    business_type: "",
    industry: "",
    target_audience: "",
    customer_pain_points: "",
    unique_value_proposition: "",
    marketing_goals: [],
    current_challenges: [],
    email_frequency: "",
    content_preferences: {
      tone: "",
      style: "",
      content_types: [],
    },
  });

  /* -------------------- DATA -------------------- */

  const businessTypes = [
    "E-commerce",
    "SaaS",
    "Consulting",
    "Education",
    "Healthcare",
    "Real Estate",
    "Finance",
    "Non-profit",
    "B2B Services",
    "Restaurant/Food",
  ];

  const marketingGoals = [
    "Increase sales revenue",
    "Build brand awareness",
    "Nurture leads",
    "Customer retention",
    "Product launches",
    "Educational content",
    "Event promotion",
    "Customer onboarding",
  ];

  const challenges = [
    "Low email open rates",
    "Poor conversion rates",
    "Lack of engaging content",
    "Email deliverability issues",
    "Growing subscriber list",
    "Automation setup",
    "Segmentation strategy",
    "A/B testing implementation",
  ];

  const contentTypes = [
    "Newsletters",
    "Product updates",
    "Educational content",
    "Case studies",
    "Behind-the-scenes",
    "Customer stories",
    "Industry insights",
    "How-to guides",
  ];

  /* -------------------- HELPERS -------------------- */

  const toggleItem = (
    list: string[],
    value: string,
    key: "marketing_goals" | "current_challenges" | "content_types"
  ) => {
    setBusinessInfo((prev) => {
      if (key === "content_types") {
        const types = prev.content_preferences.content_types.includes(value)
          ? prev.content_preferences.content_types.filter((v) => v !== value)
          : [...prev.content_preferences.content_types, value];

        return {
          ...prev,
          content_preferences: { ...prev.content_preferences, content_types: types },
        };
      }

      const updatedList = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];

      return { ...prev, [key]: updatedList } as BusinessInfo;
    });
  };

  const validateForm = (): boolean => {
    if (!businessInfo.business_type) {
      setError("Please select a business type");
      return false;
    }
    if (businessInfo.marketing_goals.length === 0) {
      setError("Select at least one marketing goal");
      return false;
    }
    setError(null);
    return true;
  };

  /* -------------------- MOCK GENERATION -------------------- */

  const generateStrategy = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);

<<<<<<< HEAD
    try {
      // Simulate AI strategy generation with mock data
      const aiStrategy = {
        recommended_workflows: [
          {
            type: "welcome",
            name: "Welcome Series",
            description: "Introduce new subscribers to your brand.",
            suggested_emails: [{ subject: "Welcome to our community!" }],
          },
        ],
      };

      // Simulate creating a strategy object
      const strategy = {
        id: `strategy-${Date.now()}`,
        name: `${businessInfo.business_name || "Business"} AI Email Strategy`,
        business_type: businessInfo.business_type,
        marketing_goals: businessInfo.marketing_goals,
        created_at: new Date().toISOString(),
        generated_strategy: aiStrategy,
        target_audience_profile: {
          description: businessInfo.target_audience,
          pain_points: businessInfo.customer_pain_points,
          value_proposition: businessInfo.unique_value_proposition,
          industry: businessInfo.industry,
        },
      };

      toast({
        title: "🎉 AI Strategy Generated Successfully!",
        description: `Your personalized email marketing strategy for ${businessInfo.business_name} is ready to implement.`,
      });

      onComplete(strategy);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError(
        "Failed to generate strategy. Please check your information and try again."
      );
      toast({
        title: "Strategy Generation Failed",
        description:
          "Failed to generate strategy. Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
=======
    // Mock AI delay
    setTimeout(() => {
      console.log("Mock AI Strategy Generated:", businessInfo);
>>>>>>> 31ab30e (update)
      setIsGenerating(false);
      alert("✅ AI Strategy generated successfully (frontend mock)");
    }, 2000);
  };

  /* -------------------- RENDER STEPS -------------------- */

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Business Information</h2>
      </div>

      <div>
        <Label>Business Type *</Label>
        <Select
          value={businessInfo.business_type}
          onValueChange={(v) =>
            setBusinessInfo((p) => ({ ...p, business_type: v }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Describe your target audience"
        value={businessInfo.target_audience}
        onChange={(e) =>
          setBusinessInfo((p) => ({ ...p, target_audience: e.target.value }))
        }
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <TrendingUp className="w-12 h-12 text-green-600 mx-auto" />
      {marketingGoals.map((goal) => (
        <div key={goal} className="flex items-center space-x-2">
          <Checkbox
            checked={businessInfo.marketing_goals.includes(goal)}
            onCheckedChange={() =>
              toggleItem(businessInfo.marketing_goals, goal, "marketing_goals")
            }
          />
          <Label>{goal}</Label>
        </div>
      ))}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Mail className="w-12 h-12 text-purple-600 mx-auto" />
      {contentTypes.map((type) => (
        <div key={type} className="flex items-center space-x-2">
          <Checkbox
            checked={businessInfo.content_preferences.content_types.includes(type)}
            onCheckedChange={() =>
              toggleItem(
                businessInfo.content_preferences.content_types,
                type,
                "content_types"
              )
            }
          />
          <Label>{type}</Label>
        </div>
      ))}

      <div className="bg-blue-50 p-4 rounded-lg">
        <CheckCircle2 className="inline mr-2" />
        AI content will be auto-generated (mocked).
      </div>
    </div>
  );

  /* -------------------- UI -------------------- */

  return (
<<<<<<< HEAD
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack}>
=======
    <div className="max-w-3xl mx-auto space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Step {currentStep} of 3</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((s) => s - 1)}
            >
>>>>>>> 31ab30e (update)
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

<<<<<<< HEAD
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 py-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      currentStep > step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Step {currentStep} of 3</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    Next
                  </Button>
=======
            {currentStep < 3 ? (
              <Button onClick={() => setCurrentStep((s) => s + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={generateStrategy} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
>>>>>>> 31ab30e (update)
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Strategy
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default AIStrategyBuilder;