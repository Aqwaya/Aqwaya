"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Target,
  Calendar,
  Users,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  Play,
  Download,
} from "lucide-react";

// Local type definition for EmailStrategy
type GeneratedStrategy = {
  overview: {
    business_assessment: string;
    competitive_advantages: string[];
    target_audience_insights: string;
  };
  next_steps: {
    step: string;
    action: string;
    priority: string;
  }[];
  recommended_workflows: {
    name: string;
    priority: string;
    description: string;
    suggested_emails: {
      subject: string;
      day?: number;
      week?: number;
      purpose: string;
    }[];
    type: string;
  }[];
  content_calendar: {
    frequency_recommendation: string;
    weekly_themes: {
      theme: string;
      content_type: string;
    }[];
  };
  segmentation_strategy: {
    primary_segments: {
      name: string;
      criteria: string;
      messaging_focus: string;
    }[];
    behavioral_triggers: {
      trigger: string;
      action: string;
    }[];
  };
  success_metrics: {
    primary_kpis: {
      metric: string;
      target: string;
      industry_benchmark: string;
    }[];
    optimization_recommendations: string[];
  };
};

type EmailStrategy = {
  id: string;
  name: string;
  business_type: string;
  marketing_goals: string[];
  created_at: string;
  generated_strategy: GeneratedStrategy;
  target_audience_profile?: { description?: string };
};

interface StrategyResultsProps {
  strategy: EmailStrategy;
  onBack: () => void;
  onImplement: (workflowType: string) => void;
}

const StrategyResults = ({
  strategy,
  onBack,
  onImplement,
}: StrategyResultsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const generatedStrategy = strategy.generated_strategy;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "immediate":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Your AI Email Strategy</h1>
            <p className="text-gray-600">
              Personalized recommendations for {strategy.name}
            </p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600">
          <Download className="w-4 h-4 mr-2" />
          Export Strategy
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="content">Content Plan</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
          <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Business Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {generatedStrategy.overview.business_assessment}
                </p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">
                    Your Competitive Advantages:
                  </h4>
                  <ul className="space-y-1">
                    {generatedStrategy.overview.competitive_advantages?.map(
                      (advantage: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{advantage}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>Audience Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {generatedStrategy.overview.target_audience_insights}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Business Type:
                    </span>
                    <Badge variant="secondary">{strategy.business_type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Primary Goals:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {strategy.marketing_goals
                        .slice(0, 2)
                        .map((goal, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {goal}
                          </Badge>
                        ))}
                      {strategy.marketing_goals.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{strategy.marketing_goals.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <span>Next Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedStrategy.next_steps.map(
                  (
                    step: { step: string; action: string; priority: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {step.step}
                        </div>
                        <span className="font-medium">{step.action}</span>
                      </div>
                      <Badge className={getPriorityColor(step.priority)}>
                        {step.priority}
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {generatedStrategy.recommended_workflows.map(
              (
                workflow: {
                  name: string;
                  priority: string;
                  description: string;
                  suggested_emails: {
                    subject: string;
                    day?: number;
                    week?: number;
                    purpose: string;
                  }[];
                  type: string;
                },
                index: number
              ) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Play className="w-5 h-5 text-green-600" />
                        <span>{workflow.name}</span>
                      </CardTitle>
                      <Badge className={getPriorityColor(workflow.priority)}>
                        {workflow.priority} priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{workflow.description}</p>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Email Sequence:</h4>
                      {workflow.suggested_emails.map(
                        (
                          email: {
                            subject: string;
                            day?: number;
                            week?: number;
                            purpose: string;
                          },
                          emailIndex: number
                        ) => (
                          <div
                            key={emailIndex}
                            className="border-l-4 border-blue-200 pl-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {email.subject}
                              </span>
                              <span className="text-xs text-gray-500">
                                {email.day !== undefined
                                  ? `Day ${email.day}`
                                  : `Week ${email.week}`}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              {email.purpose}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={() => onImplement(workflow.type)}
                    >
                      Implement This Workflow
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Content Calendar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Recommended Frequency:</h4>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {generatedStrategy.content_calendar.frequency_recommendation}
                </Badge>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Weekly Content Themes:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedStrategy.content_calendar.weekly_themes.map(
                    (
                      theme: { theme: string; content_type: string },
                      index: number
                    ) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h5 className="font-medium text-blue-600">
                          {theme.theme}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {theme.content_type}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Segmentation Strategy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Primary Segments:</h4>
                  <div className="space-y-3">
                    {generatedStrategy.segmentation_strategy.primary_segments.map(
                      (
                        segment: {
                          name: string;
                          criteria: string;
                          messaging_focus: string;
                        },
                        index: number
                      ) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{segment.name}</h5>
                            <Badge variant="outline">{segment.criteria}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {segment.messaging_focus}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Behavioral Triggers:</h4>
                  <div className="space-y-2">
                    {generatedStrategy.segmentation_strategy.behavioral_triggers.map(
                      (
                        trigger: { trigger: string; action: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm font-medium">
                            {trigger.trigger}
                          </span>
                          <span className="text-sm text-gray-600">
                            → {trigger.action}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Success Metrics & KPIs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">
                    Key Performance Indicators:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedStrategy.success_metrics.primary_kpis.map(
                      (
                        kpi: {
                          metric: string;
                          target: string;
                          industry_benchmark: string;
                        },
                        index: number
                      ) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h5 className="font-medium text-blue-600">
                            {kpi.metric}
                          </h5>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm">
                              <span>Your Target:</span>
                              <span className="font-semibold text-green-600">
                                {kpi.target}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Industry Avg:</span>
                              <span>{kpi.industry_benchmark}</span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">
                    Optimization Recommendations:
                  </h4>
                  <ul className="space-y-2">
                    {generatedStrategy.success_metrics.optimization_recommendations.map(
                      (recommendation: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{recommendation}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategyResults;

// "use client";

// import { useState, JSX } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   ArrowLeft,
//   Target,
//   Calendar,
//   Users,
//   TrendingUp,
//   CheckCircle,
//   Play,
//   Download,
// } from "lucide-react";
// import StrategyImplementation from "./StrategyImplementation";
// import { EmailStrategy } from "@/types/emailStrategy";

// /* ================= TYPES ================= */

// type Priority = "high" | "medium" | "immediate" | "low";

// interface SuggestedEmail {
//   subject: string;
//   purpose: string;
//   day?: number;
//   week?: number;
// }

// interface RecommendedWorkflow {
//   type: string;
//   name: string;
//   description: string;
//   priority: Priority;
//   suggested_emails: SuggestedEmail[];
// }

// interface NextStep {
//   step: string;
//   action: string;
//   priority: Priority;
// }

// interface ContentTheme {
//   theme: string;
//   content_type: string;
// }

// interface Segment {
//   name: string;
//   criteria: string;
//   messaging_focus: string;
// }

// interface BehavioralTrigger {
//   trigger: string;
//   action: string;
// }

// interface SegmentationStrategy {
//   primary_segments: Segment[];
//   behavioral_triggers: BehavioralTrigger[];
// }

// interface KPI {
//   metric: string;
//   target: string;
//   industry_benchmark: string;
// }

// interface SuccessMetrics {
//   primary_kpis: KPI[];
//   optimization_recommendations: string[];
// }

// /* ================= PROPS ================= */

// interface StrategyResultsProps {
//   strategy: EmailStrategy;
//   onBack: () => void;
//   onImplement: (workflowType: string) => void;
// }

// /* ================= COMPONENT ================= */

// const StrategyResults = ({
//   strategy,
//   onBack,
//   onImplement,
// }: StrategyResultsProps): JSX.Element => {
//   const [activeTab, setActiveTab] = useState<string>("overview");
//   const [implementingWorkflow, setImplementingWorkflow] = useState<
//     string | null
//   >(null);

//   const { generated_strategy } = strategy;

//   /* ================= HELPERS ================= */

//   const getPriorityColor = (priority: Priority): string => {
//     switch (priority) {
//       case "high":
//         return "bg-red-100 text-red-800";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "immediate":
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   /* ================= IMPLEMENT FLOW ================= */

//   if (implementingWorkflow) {
//     return (
//       <StrategyImplementation
//         strategy={strategy}
//         workflowType={implementingWorkflow}
//         onComplete={() => {
//           setImplementingWorkflow(null);
//           onImplement(implementingWorkflow);
//         }}
//       />
//     );
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Button variant="outline" onClick={onBack}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold">Your AI Email Strategy</h1>
//             <p className="text-gray-600">
//               Personalized recommendations for {strategy.name}
//             </p>
//           </div>
//         </div>

//         <Button className="bg-gradient-to-r from-green-600 to-blue-600">
//           <Download className="w-4 h-4 mr-2" />
//           Export Strategy
//         </Button>
//       </div>

//       {/* TABS */}
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-5">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="workflows">Workflows</TabsTrigger>
//           <TabsTrigger value="content">Content Plan</TabsTrigger>
//           <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
//           <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
//         </TabsList>

//         {/* OVERVIEW */}
//         <TabsContent value="overview" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Target className="w-5 h-5 text-blue-600" />
//                   Business Assessment
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700">
//                   {generated_strategy.overview.business_assessment}
//                 </p>

//                 <div className="mt-4">
//                   <h4 className="font-semibold mb-2">
//                     Your Competitive Advantages:
//                   </h4>
//                   <ul className="space-y-1">
//                     {generated_strategy.overview.competitive_advantages?.map(
//                       (advantage, index) => (
//                         <li key={index} className="flex items-center gap-2">
//                           <CheckCircle className="w-4 h-4 text-green-600" />
//                           <span className="text-sm">{advantage}</span>
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Users className="w-5 h-5 text-purple-600" />
//                   Audience Insights
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700">
//                   {generated_strategy.overview.target_audience_insights}
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* WORKFLOWS */}
//         <TabsContent value="workflows" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {generated_strategy.recommended_workflows.map((workflow) => (
//               <Card key={workflow.type}>
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="flex items-center gap-2">
//                       <Play className="w-5 h-5 text-green-600" />
//                       {workflow.name}
//                     </CardTitle>
//                     <Badge className={getPriorityColor(workflow.priority)}>
//                       {workflow.priority} priority
//                     </Badge>
//                   </div>
//                 </CardHeader>

//                 <CardContent>
//                   <p className="text-gray-700 mb-4">{workflow.description}</p>

//                   <div className="space-y-3">
//                     <h4 className="font-semibold">Email Sequence:</h4>
//                     {workflow.suggested_emails.map((email, idx) => (
//                       <div
//                         key={idx}
//                         className="border-l-4 border-blue-200 pl-3"
//                       >
//                         <div className="flex justify-between">
//                           <span className="font-medium text-sm">
//                             {email.subject}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {email.day !== undefined
//                               ? `Day ${email.day}`
//                               : `Week ${email.week}`}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-600">{email.purpose}</p>
//                       </div>
//                     ))}
//                   </div>

//                   <Button
//                     className="w-full mt-4"
//                     onClick={() => setImplementingWorkflow(workflow.type)}
//                   >
//                     Implement This Workflow
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         {/* CONTENT */}
//         <TabsContent value="content">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-blue-600" />
//                 Content Calendar
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Badge variant="secondary" className="mb-4">
//                 {generated_strategy.content_calendar.frequency_recommendation}
//               </Badge>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {generated_strategy.content_calendar.weekly_themes.map(
//                   (theme, index) => (
//                     <div key={index} className="p-4 border rounded-lg">
//                       <h5 className="font-medium text-blue-600">
//                         {theme.theme}
//                       </h5>
//                       <p className="text-sm text-gray-600">
//                         {theme.content_type}
//                       </p>
//                     </div>
//                   )
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* SEGMENTATION */}
//         <TabsContent value="segmentation">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="w-5 h-5 text-purple-600" />
//                 Segmentation Strategy
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {generated_strategy.segmentation_strategy.primary_segments.map(
//                 (segment, index) => (
//                   <div key={index} className="mb-4 p-4 border rounded-lg">
//                     <div className="flex justify-between mb-2">
//                       <h5 className="font-medium">{segment.name}</h5>
//                       <Badge variant="outline">{segment.criteria}</Badge>
//                     </div>
//                     <p className="text-sm text-gray-600">
//                       {segment.messaging_focus}
//                     </p>
//                   </div>
//                 )
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* METRICS */}
//         <TabsContent value="metrics">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-green-600" />
//                 Success Metrics
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {generated_strategy.success_metrics.primary_kpis.map(
//                   (kpi, index) => (
//                     <div key={index} className="p-4 border rounded-lg">
//                       <h5 className="font-medium text-blue-600">
//                         {kpi.metric}
//                       </h5>
//                       <p className="text-sm">
//                         Target:{" "}
//                         <span className="font-semibold text-green-600">
//                           {kpi.target}
//                         </span>
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Industry Avg: {kpi.industry_benchmark}
//                       </p>
//                     </div>
//                   )
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default StrategyResults;
