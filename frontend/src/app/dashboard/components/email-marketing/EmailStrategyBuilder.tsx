// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowLeft,
//   Target,
//   Zap,
//   Layers,
//   Calendar,
//   Workflow,
//   BarChart3,
//   CheckCircle2,
// } from "lucide-react";
// import type { EmailStrategy } from "@/types/emailStrategy";

// interface Props {
//   goal: string;
//   onComplete: (strategy: EmailStrategy) => void;
//   onBack: () => void;
// }

// const EmailStrategyBuilder = ({ goal, onComplete, onBack }: Props) => {

//   const gs = strategy.generated_strategy;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">{strategy.name}</h1>
//           <p className="text-muted-foreground">
//             {strategy.business_type} •{" "}
//             {new Date(strategy.created_at).toLocaleDateString()}
//           </p>
//         </div>

//         <Button variant="outline" onClick={onBack}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>
//       </div>

//       {/* Overview */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Target className="w-5 h-5 text-blue-600" />
//             Business Overview
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3 text-sm">
//           {gs.overview.business_assessment && (
//             <p>{gs.overview.business_assessment}</p>
//           )}

//           {gs.overview.target_audience_insights && (
//             <p>
//               <strong>Audience Insight:</strong>{" "}
//               {gs.overview.target_audience_insights}
//             </p>
//           )}

//           {gs.overview.competitive_advantages && (
//             <p>
//               <strong>Competitive Advantages:</strong>{" "}
//               {gs.overview.competitive_advantages}
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* Target Audience */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Layers className="w-5 h-5 text-purple-600" />
//             Target Audience Profile
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2 text-sm">
//           <p>{strategy.target_audience_profile.description}</p>
//           <p>
//             <strong>Pain Points:</strong>{" "}
//             {strategy.target_audience_profile.pain_points}
//           </p>
//           <p>
//             <strong>Value Proposition:</strong>{" "}
//             {strategy.target_audience_profile.value_proposition}
//           </p>
//           <p>
//             <strong>Industry:</strong>{" "}
//             {strategy.target_audience_profile.industry}
//           </p>
//         </CardContent>
//       </Card>

//       {/* Recommended Workflows */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Workflow className="w-5 h-5 text-green-600" />
//             Recommended Workflows
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {gs.recommended_workflows.map((wf, i) => (
//             <div key={i} className="border rounded-lg p-4 space-y-2">
//               <div className="flex justify-between text-sm font-medium">
//                 <span>{wf.name}</span>
//                 <span className="text-muted-foreground">
//                   Priority: {wf.priority}
//                 </span>
//               </div>

//               <p className="text-sm">{wf.description}</p>

//               <ul className="space-y-2 text-sm">
//                 {wf.suggested_emails.map((email, idx) => (
//                   <li key={idx} className="flex gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-green-600 mt-1" />
//                     <span>
//                       <strong>{email.subject}</strong> — {email.purpose}
//                       {email.day && ` (Day ${email.day})`}
//                       {email.week && ` (Week ${email.week})`}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Content Calendar */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Calendar className="w-5 h-5 text-orange-600" />
//             Content Calendar
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3 text-sm">
//           <p>{gs.content_calendar.frequency_recommendation}</p>

//           <ul className="space-y-2">
//             {gs.content_calendar.weekly_themes.map((t, i) => (
//               <li key={i}>
//                 <strong>{t.theme}</strong> — {t.content_type}
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>

//       {/* Segmentation Strategy */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Zap className="w-5 h-5 text-pink-600" />
//             Segmentation Strategy
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 text-sm">
//           <div>
//             <strong>Primary Segments</strong>
//             <ul className="mt-2 space-y-2">
//               {gs.segmentation_strategy.primary_segments.map((seg, i) => (
//                 <li key={i}>
//                   <strong>{seg.name}:</strong> {seg.messaging_focus}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <strong>Behavioral Triggers</strong>
//             <ul className="mt-2 space-y-2">
//               {gs.segmentation_strategy.behavioral_triggers.map((t, i) => (
//                 <li key={i}>
//                   {t.trigger} → {t.action}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Success Metrics */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <BarChart3 className="w-5 h-5 text-indigo-600" />
//             Success Metrics
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 text-sm">
//           <ul className="space-y-2">
//             {gs.success_metrics.primary_kpis.map((kpi, i) => (
//               <li key={i}>
//                 <strong>{kpi.metric}</strong>: {kpi.target}{" "}
//                 <span className="text-muted-foreground">
//                   (Benchmark: {kpi.industry_benchmark})
//                 </span>
//               </li>
//             ))}
//           </ul>

//           <ul className="list-disc ml-5">
//             {gs.success_metrics.optimization_recommendations.map((rec, i) => (
//               <li key={i}>{rec}</li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EmailStrategyBuilder;

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
  Mail,
  Sparkles,
  CheckCircle2,
  Target,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { EmailStrategy } from "@/types/emailStrategy";

interface EmailStrategyBuilderProps {
  goal: string;
  onBack: () => void;
  onComplete: (strategy: EmailStrategy) => void;
}

const EmailStrategyBuilder = ({
  goal,
  onBack,
  onComplete,
}: EmailStrategyBuilderProps) => {
  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    targetAudience: "",
    emailListSize: "",
    primaryOffer: "",
    additionalInfo: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateStrategy = async () => {
    if (
      !formData.businessName ||
      !formData.businessType ||
      !formData.targetAudience
    ) {
      toast({
        title: "Missing required fields",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2500));
    setIsGenerating(false);
    setShowStrategy(true);

    toast({
      title: "Email Strategy Ready",
      description: "Your personalized email marketing strategy is generated.",
    });
  };

  const handleImplement = () => {
    const strategy: EmailStrategy = {
      id: crypto.randomUUID(),
      name: `${formData.businessName} Email Strategy`,
      business_type: formData.businessType,
      marketing_goals: [goal],
      created_at: new Date().toISOString(),
      overview: {},
      target_audience_profile: {
        description: formData.targetAudience,
        pain_points: "Low engagement, poor conversions",
        value_proposition: formData.primaryOffer,
        industry: formData.businessType,
      },
      generated_strategy: {
        overview: {
          business_assessment:
            "This email strategy is designed to improve engagement and conversions.",
          competitive_advantages: [
            "Personalized messaging",
            "Automated workflows",
            "Data-driven optimization",
          ],
          target_audience_insights: formData.targetAudience,
        },
        next_steps: [
          {
            step: "Set up ESP",
            action: "Configure email platform and domains",
            priority: "High",
          },
        ],
        recommended_workflows: [],
        content_calendar: {
          frequency_recommendation: "2–3 emails per week",
          weekly_themes: [],
        },
        segmentation_strategy: {
          primary_segments: [],
          behavioral_triggers: [],
        },
        success_metrics: {
          primary_kpis: [],
          optimization_recommendations: [],
        },
      },
    };

    onComplete(strategy);
  };

  /* ================== STRATEGY VIEW ================== */

  if (showStrategy) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setShowStrategy(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Email Marketing Strategy</h1>
            <p className="text-muted-foreground">
              AI-generated strategy for your business
            </p>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5" />
              Strategy Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90">
              This strategy targets <strong>{formData.targetAudience}</strong>{" "}
              with structured email sequences designed to increase engagement
              and conversions.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Email Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Welcome Email",
                "Value Education",
                "Engagement Email",
                "Conversion CTA",
              ].map((item) => (
                <div key={item} className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Expected Results
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>Open Rate: 30–45%</p>
              <p>CTR: 4–8%</p>
              <p>Conversion Lift: 2–3x</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Personalize subject lines</p>
              <p>• Segment your list</p>
              <p>• A/B test content</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Goals
          </Button>
          <Button onClick={handleImplement}>Implement Email Strategy</Button>
        </div>
      </div>
    );
  }

  /* ================== FORM VIEW ================== */

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Email Strategy Setup</h1>
          <p className="text-muted-foreground">
            Answer a few questions to generate your email strategy
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label>Business Name *</Label>
            <Input
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
            />
          </div>

          <div>
            <Label>Business Type *</Label>
            <Select onValueChange={(v) => handleChange("businessType", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                {["E-commerce", "SaaS", "Services", "Education", "Other"].map(
                  (opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Target Audience *</Label>
            <Textarea
              value={formData.targetAudience}
              onChange={(e) => handleChange("targetAudience", e.target.value)}
            />
          </div>

          <Button
            onClick={generateStrategy}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating
              ? "Generating Strategy..."
              : "Generate Email Strategy"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailStrategyBuilder;
