// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { EmailStrategy } from "@/types/emailStrategy";

// /* ---------------- PROPS ---------------- */

// interface StrategyImplementationProps {
//   strategy: EmailStrategy;
//   workflowType: string;
//   onComplete: () => void;
// }

// /* ---------------- COMPONENT ---------------- */

// const StrategyImplementation = ({
//   strategy,
//   workflowType,
//   onComplete,
// }: StrategyImplementationProps) => {
//   const { toast } = useToast();

//   const [implementing, setImplementing] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [currentStep, setCurrentStep] = useState("");
//   const [completedSteps, setCompletedSteps] = useState<string[]>([]);

//   const workflow =
//     strategy.generated_strategy.recommended_workflows.find(
//       (w) => w.type === workflowType
//     );

//   const implementationSteps = [
//     { id: "segments", label: "Creating audience segments", duration: 1000 },
//     { id: "templates", label: "Generating email templates", duration: 1500 },
//     {
//       id: "workflows",
//       label: "Setting up automation workflows",
//       duration: 2000,
//     },
//     { id: "campaigns", label: "Creating campaign structure", duration: 1000 },
//     { id: "testing", label: "Running AI optimization tests", duration: 1500 },
//     { id: "activation", label: "Activating campaign", duration: 500 },
//   ];

//   const runStep = async (stepIndex: number, progressValue: number) => {
//     const step = implementationSteps[stepIndex];
//     setCurrentStep(step.label);
//     setProgress(progressValue);
//     await new Promise((res) => setTimeout(res, step.duration));
//     setCompletedSteps((prev) => [...prev, step.id]);
//   };

//   const handleImplement = async () => {
//     setImplementing(true);

//     try {
//       for (let i = 0; i < implementationSteps.length; i++) {
//         await runStep(i, Math.round(((i + 1) / implementationSteps.length) * 100));
//       }

//       toast({
//         title: "🎉 Implementation Complete!",
//         description: `${workflow?.name} has been successfully set up.`,
//       });

//       setTimeout(onComplete, 800);
//     } catch {
//       toast({
//         title: "Implementation Failed",
//         description: "Implementation failed.",
//         variant: "destructive",
//       });
//       setImplementing(false);
//       setProgress(0);
//       setCompletedSteps([]);
//     }
//   };

//   /* ---------------- LOADING UI ---------------- */

//   if (implementing) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Card className="w-full max-w-2xl">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
//               Implementing AI Workflow
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span>{currentStep}</span>
//                 <span>{progress}%</span>
//               </div>
//               <Progress value={progress} />
//             </div>

//             <div className="space-y-2">
//               {implementationSteps.map((step) => (
//                 <div
//                   key={step.id}
//                   className={`flex items-center gap-3 p-2 rounded ${
//                     completedSteps.includes(step.id)
//                       ? "bg-green-50"
//                       : currentStep === step.label
//                       ? "bg-blue-50"
//                       : "bg-gray-50"
//                   }`}
//                 >
//                   {completedSteps.includes(step.id) ? (
//                     <CheckCircle2 className="text-green-600 w-5 h-5" />
//                   ) : currentStep === step.label ? (
//                     <Loader2 className="text-blue-600 w-5 h-5 animate-spin" />
//                   ) : (
//                     <div className="w-5 h-5 border rounded-full" />
//                   )}
//                   <span className="text-sm">{step.label}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   /* ---------------- READY UI ---------------- */

//   return (
//     <Card className="border-2 border-purple-200">
//       <CardHeader>
//         <CardTitle>Ready to Implement: {workflow?.name}</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <p className="text-gray-600">{workflow?.description}</p>

//         <ul className="space-y-1">
//           <li className="flex items-center gap-2">
//             <CheckCircle2 className="text-green-600 w-4 h-4" />
//             AI-powered audience segments
//           </li>
//           <li className="flex items-center gap-2">
//             <CheckCircle2 className="text-green-600 w-4 h-4" />
//             {workflow?.suggested_emails.length ?? 0} email templates
//           </li>
//           <li className="flex items-center gap-2">
//             <CheckCircle2 className="text-green-600 w-4 h-4" />
//             Automated workflow
//           </li>
//         </ul>

//         <Button
//           onClick={handleImplement}
//           size="lg"
//           className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
//         >
//           <Sparkles className="w-4 h-4 mr-2" />
//           Start Implementation
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default StrategyImplementation;

"use client";

import { useState, JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type WorkflowType = string;

interface SuggestedEmail {
  subject: string;
  purpose: string;
  day?: number;
  week?: number;
}

interface RecommendedWorkflow {
  type: WorkflowType;
  name: string;
  description: string;
  suggested_emails: SuggestedEmail[];
}

interface GeneratedStrategy {
  recommended_workflows: RecommendedWorkflow[];
}

export interface EmailStrategy {
  generated_strategy: GeneratedStrategy;
}

/* ================= PROPS ================= */

interface StrategyImplementationProps {
  strategy: EmailStrategy;
  workflowType: WorkflowType;
  onComplete: () => void;
}

/* ================= MOCK STEPS ================= */

interface ImplementationStep {
  id: string;
  label: string;
  duration: number;
}

/* ================= COMPONENT ================= */

const StrategyImplementation = ({
  strategy,
  workflowType,
  onComplete,
}: StrategyImplementationProps): JSX.Element => {
  const { toast } = useToast();

  const [implementing, setImplementing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const workflow: RecommendedWorkflow | undefined =
    strategy.generated_strategy.recommended_workflows.find(
      (w) => w.type === workflowType
    );

  const implementationSteps: ImplementationStep[] = [
    { id: "segments", label: "Creating audience segments", duration: 1000 },
    { id: "templates", label: "Generating email templates", duration: 1500 },
    {
      id: "workflows",
      label: "Setting up automation workflows",
      duration: 2000,
    },
    { id: "campaigns", label: "Creating campaign structure", duration: 1000 },
    { id: "testing", label: "Running AI optimization tests", duration: 1500 },
    { id: "activation", label: "Activating campaign", duration: 500 },
  ];

  /* ================= LOGIC ================= */

  const runStep = async (
    step: ImplementationStep,
    index: number
  ): Promise<void> => {
    setCurrentStep(step.label);
    setProgress(Math.round(((index + 1) / implementationSteps.length) * 100));
    await new Promise((res) => setTimeout(res, step.duration));
    setCompletedSteps((prev) => [...prev, step.id]);
  };

  const handleImplement = async (): Promise<void> => {
    if (!workflow) return;

    setImplementing(true);

    try {
      for (let i = 0; i < implementationSteps.length; i++) {
        await runStep(implementationSteps[i], i);
      }

      toast({
        title: "🎉 Implementation Complete!",
        description: `${workflow.name} has been successfully set up.`,
      });

      setTimeout(onComplete, 800);
    } catch {
      toast({
        title: "Implementation Failed",
        description: "Something went wrong during implementation.",
        variant: "destructive",
      });

      setImplementing(false);
      setProgress(0);
      setCompletedSteps([]);
    }
  };

  /* ================= LOADING UI ================= */

  if (implementing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              Implementing AI Workflow
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{currentStep}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <div className="space-y-2">
              {implementationSteps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-2 rounded ${
                    completedSteps.includes(step.id)
                      ? "bg-green-50"
                      : currentStep === step.label
                      ? "bg-blue-50"
                      : "bg-gray-50"
                  }`}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                  ) : currentStep === step.label ? (
                    <Loader2 className="text-blue-600 w-5 h-5 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 border rounded-full" />
                  )}
                  <span className="text-sm">{step.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ================= READY UI ================= */

  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle>Ready to Implement: {workflow?.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600">{workflow?.description}</p>

        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600 w-4 h-4" />
            AI-powered audience segments
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600 w-4 h-4" />
            {workflow?.suggested_emails.length ?? 0} email templates
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600 w-4 h-4" />
            Automated workflow
          </li>
        </ul>

        <Button
          onClick={handleImplement}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Start Implementation
        </Button>
      </CardContent>
    </Card>
  );
};

export default StrategyImplementation;
