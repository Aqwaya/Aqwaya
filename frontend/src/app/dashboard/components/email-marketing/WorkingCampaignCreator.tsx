// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import type { EmailCampaign } from "@/types/emailCampaign";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { ArrowLeft, Mail, Target, Clock, Users } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface CampaignCreatorProps {
//   onBack: () => void;
//   onComplete: (campaign: EmailCampaign) => void;
//   user: { id: string };
// }

// const WorkingCampaignCreator = ({
//   onBack,
//   onComplete,
//   user,
// }: CampaignCreatorProps) => {
//   const { toast } = useToast();
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     subject_line: "",
//     campaign_type: "one-time" as "one-time" | "sequence" | "automation",
//     target_segments: ["all_subscribers"],
//     content: {
//       html: "",
//       text: "",
//     },
//     schedule_type: "immediate" as "immediate" | "scheduled",
//     scheduled_at: "",
//   });

//   const handleInputChange = (field: string, value: string | string[]) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleContentChange = (type: "html" | "text", value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       content: {
//         ...prev.content,
//         [type]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const newCampaign: EmailCampaign = {
//         id: `campaign-${Date.now()}`,
//         user_id: user.id,
//         name: formData.name,
//         subject_line: formData.subject_line,
//         campaign_type: formData.campaign_type,
//         status: formData.schedule_type === "immediate" ? "active" : "scheduled",
//         target_segments: formData.target_segments,
//         content: formData.content,
//         scheduled_at: formData.scheduled_at || undefined,
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//         stats: {
//           sent: 0,
//           delivered: 0,
//           opened: 0,
//           clicked: 0,
//           unsubscribed: 0,
//           bounced: 0,
//         },
//       };

//       onComplete(newCampaign);

//       toast({
//         title: "Campaign Created!",
//         description: `Your campaign "${formData.name}" has been created successfully.`,
//       });
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       console.error("Failed to create campaign:", error);
//       toast({
//         title: "Creation Failed",
//         description:
//           error.message || "Failed to create the campaign. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const nextStep = () => {
//     if (step < 4) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const isStepComplete = (stepNumber: number) => {
//     switch (stepNumber) {
//       case 1:
//         return formData.name && formData.subject_line;
//       case 2:
//         return formData.campaign_type;
//       case 3:
//         return formData.content.html || formData.content.text;
//       case 4:
//         return true;
//       default:
//         return false;
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div className="space-y-6">
//           {/* Header */}
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" onClick={onBack}>
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back
//             </Button>
//             <div>
//               <h1 className="text-3xl font-bold">Create Email Campaign</h1>
//               <p className="text-muted-foreground">
//                 Build your email marketing campaign step by step
//               </p>
//             </div>
//           </div>

//           {/* Progress Steps */}
//           <div className="flex items-center space-x-4 mb-8">
//             {[1, 2, 3, 4].map((stepNumber) => (
//               <div key={stepNumber} className="flex items-center">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
//                     step >= stepNumber
//                       ? "bg-primary text-primary-foreground border-primary"
//                       : "border-gray-300 text-gray-400"
//                   }`}
//                 >
//                   {stepNumber}
//                 </div>
//                 {stepNumber < 4 && (
//                   <div
//                     className={`w-16 h-1 mx-2 ${
//                       step > stepNumber ? "bg-primary" : "bg-gray-300"
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Step Content */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 {step === 1 && (
//                   <>
//                     <Mail className="w-5 h-5" />
//                     <span>Campaign Details</span>
//                   </>
//                 )}
//                 {step === 2 && (
//                   <>
//                     <Target className="w-5 h-5" />
//                     <span>Campaign Type & Audience</span>
//                   </>
//                 )}
//                 {step === 3 && (
//                   <>
//                     <Mail className="w-5 h-5" />
//                     <span>Content Creation</span>
//                   </>
//                 )}
//                 {step === 4 && (
//                   <>
//                     <Clock className="w-5 h-5" />
//                     <span>Schedule & Launch</span>
//                   </>
//                 )}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Step 1: Basic Details */}
//               {step === 1 && (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Campaign Name</Label>
//                     <Input
//                       id="name"
//                       placeholder="Enter campaign name"
//                       value={formData.name}
//                       onChange={(e) =>
//                         handleInputChange("name", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="subject">Email Subject Line</Label>
//                     <Input
//                       id="subject"
//                       placeholder="Enter subject line"
//                       value={formData.subject_line}
//                       onChange={(e) =>
//                         handleInputChange("subject_line", e.target.value)
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Step 2: Type & Audience */}
//               {step === 2 && (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label>Campaign Type</Label>
//                     <Select
//                       value={formData.campaign_type}
//                       onValueChange={(value) =>
//                         handleInputChange("campaign_type", value)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select campaign type" />
//                       </SelectTrigger>
//                       <SelectContent className="w-full bg-white">
//                         <SelectItem value="one-time">One-time Email</SelectItem>
//                         <SelectItem value="sequence">Email Sequence</SelectItem>
//                         <SelectItem value="automation">
//                           Automated Campaign
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Target Audience</Label>
//                     <div className="flex flex-wrap gap-2">
//                       <Badge
//                         variant="secondary"
//                         className="flex items-center space-x-1"
//                       >
//                         <Users className="w-3 h-3" />
//                         <span>All Subscribers (2,847)</span>
//                       </Badge>
//                       <Badge variant="outline">New Subscribers (423)</Badge>
//                       <Badge variant="outline">Engaged Users (1,205)</Badge>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Step 3: Content */}
//               {step === 3 && (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="content-html">Email Content (HTML)</Label>
//                     <Textarea
//                       id="content-html"
//                       placeholder="Enter your email HTML content..."
//                       rows={8}
//                       value={formData.content.html}
//                       onChange={(e) =>
//                         handleContentChange("html", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="content-text">Plain Text Version</Label>
//                     <Textarea
//                       id="content-text"
//                       placeholder="Enter plain text version..."
//                       rows={6}
//                       value={formData.content.text}
//                       onChange={(e) =>
//                         handleContentChange("text", e.target.value)
//                       }
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Step 4: Schedule */}
//               {step === 4 && (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label>Delivery Schedule</Label>
//                     <Select
//                       value={formData.schedule_type}
//                       onValueChange={(value) =>
//                         handleInputChange("schedule_type", value)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select delivery time" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="immediate">
//                           Send Immediately
//                         </SelectItem>
//                         <SelectItem value="scheduled">
//                           Schedule for Later
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   {formData.schedule_type === "scheduled" && (
//                     <div className="space-y-2">
//                       <Label htmlFor="scheduled-at">Schedule Date & Time</Label>
//                       <Input
//                         id="scheduled-at"
//                         type="datetime-local"
//                         value={formData.scheduled_at}
//                         onChange={(e) =>
//                           handleInputChange("scheduled_at", e.target.value)
//                         }
//                       />
//                     </div>
//                   )}

//                   {/* Campaign Summary */}
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <h3 className="font-semibold mb-2">Campaign Summary</h3>
//                     <div className="space-y-1 text-sm">
//                       <div>
//                         <strong>Name:</strong>{" "}
//                         {formData.name || "Untitled Campaign"}
//                       </div>
//                       <div>
//                         <strong>Subject:</strong>{" "}
//                         {formData.subject_line || "No subject"}
//                       </div>
//                       <div>
//                         <strong>Type:</strong> {formData.campaign_type}
//                       </div>
//                       <div>
//                         <strong>Schedule:</strong>{" "}
//                         {formData.schedule_type === "immediate"
//                           ? "Send immediately"
//                           : "Scheduled"}
//                       </div>
//                       <div>
//                         <strong>Target:</strong> All Subscribers
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Navigation Buttons */}
//               <div className="flex justify-between pt-6">
//                 <Button
//                   variant="outline"
//                   onClick={prevStep}
//                   disabled={step === 1}
//                 >
//                   Previous
//                 </Button>

//                 {step < 4 ? (
//                   <Button
//                     onClick={nextStep}
//                     disabled={!isStepComplete(step)}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                   >
//                     Next
//                   </Button>
//                 ) : (
//                   <Button
//                     onClick={handleSubmit}
//                     className="text-white bg-green-600 hover:bg-green-700"
//                   >
//                     Create Campaign
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default WorkingCampaignCreator;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Target, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

<<<<<<< HEAD
// Local type definition for EmailCampaign
type EmailCampaign = {
=======
type CampaignType = "one-time" | "sequence" | "automation";
type ScheduleType = "immediate" | "scheduled";
type CampaignStatus = "draft" | "active" | "scheduled";

interface CampaignContent {
  html: string;
  text: string;
}

interface CampaignStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  bounced: number;
}

export interface EmailCampaign {
>>>>>>> 31ab30e (update)
  id: string;
  user_id: string;
  name: string;
  subject_line: string;
<<<<<<< HEAD
  campaign_type: string;
  status: string;
  target_segments: string[];
  content: { html: string; text: string };
  scheduled_at?: string;
  created_at: string;
  updated_at: string;
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    bounced: number;
  };
};
=======
  campaign_type: CampaignType;
  status: CampaignStatus;
  target_segments: string[];
  content: CampaignContent;
  schedule_type: ScheduleType;
  scheduled_at?: string;
  created_at: string;
  updated_at: string;
  stats: CampaignStats;
}

interface UserIdentity {
  id: string;
}
>>>>>>> 31ab30e (update)

interface CampaignCreatorProps {
  onBack: () => void;
  onComplete: (campaign: EmailCampaign) => void;
<<<<<<< HEAD
  user: { id: string }; // Replace or extend this type as needed for your user object
=======
  user: UserIdentity;
}

interface CampaignFormData {
  name: string;
  subject_line: string;
  campaign_type: CampaignType;
  target_segments: string[];
  content: CampaignContent;
  schedule_type: ScheduleType;
  scheduled_at: string;
>>>>>>> 31ab30e (update)
}

const WorkingCampaignCreator = ({
  onBack,
  onComplete,
  user,
}: CampaignCreatorProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    subject_line: "",
    campaign_type: "one-time",
    target_segments: ["all_subscribers"],
    content: {
      html: "",
      text: "",
    },
    schedule_type: "immediate",
    scheduled_at: "",
  });

  /** --------------------
   * Handlers
   * -------------------*/

  const handleInputChange = <K extends keyof CampaignFormData>(
    field: K,
    value: CampaignFormData[K]
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (
    type: keyof CampaignContent,
    value: string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [type]: value,
      },
    }));
  };

  const handleSubmit = (): void => {
    const newCampaign: EmailCampaign = {
      id: `campaign-${Date.now()}`,
      user_id: user.id,
      name: formData.name,
      subject_line: formData.subject_line,
      campaign_type: formData.campaign_type,
      status: formData.schedule_type === "immediate" ? "active" : "scheduled",
      target_segments: formData.target_segments,
      content: formData.content,
      schedule_type: formData.schedule_type,
      scheduled_at: formData.scheduled_at || undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      stats: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0,
        bounced: 0,
      },
    };

    onComplete(newCampaign);

    toast({
      title: "Campaign Created!",
      description: `Your campaign "${formData.name}" has been created successfully.`,
    });
  };

  const nextStep = (): void => {
    if (step < 4) setStep((s) => s + 1);
  };

  const prevStep = (): void => {
    if (step > 1) setStep((s) => s - 1);
  };

  const isStepComplete = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return Boolean(formData.name && formData.subject_line);
      case 2:
        return Boolean(formData.campaign_type);
      case 3:
        return Boolean(formData.content.html || formData.content.text);
      case 4:
        return true;
      default:
        return false;
    }
  };

  /** --------------------
   * UI
   * -------------------*/

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Email Campaign</h1>
          <p className="text-muted-foreground">
            Build your email marketing campaign step by step
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= stepNumber
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {step === 1 && (
              <>
                <Mail className="w-5 h-5" />
                <span>Campaign Details</span>
              </>
            )}
            {step === 2 && (
              <>
                <Target className="w-5 h-5" />
                <span>Campaign Type & Audience</span>
              </>
            )}
            {step === 3 && (
              <>
                <Mail className="w-5 h-5" />
                <span>Content Creation</span>
              </>
            )}
            {step === 4 && (
              <>
                <Clock className="w-5 h-5" />
                <span>Schedule & Launch</span>
              </>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Email Subject Line</Label>
                <Input
                  value={formData.subject_line}
                  onChange={(e) =>
                    handleInputChange("subject_line", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Select
                value={formData.campaign_type}
                onValueChange={(v) =>
                  handleInputChange("campaign_type", v as CampaignType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="sequence">Sequence</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <Users className="w-3 h-3" />
                  <span>All Subscribers</span>
                </Badge>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Textarea
                rows={6}
                placeholder="HTML Content"
                value={formData.content.html}
                onChange={(e) => handleContentChange("html", e.target.value)}
              />
              <Textarea
                rows={4}
                placeholder="Plain Text Content"
                value={formData.content.text}
                onChange={(e) => handleContentChange("text", e.target.value)}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Select
                value={formData.schedule_type}
                onValueChange={(v) =>
                  handleInputChange("schedule_type", v as ScheduleType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>

              {formData.schedule_type === "scheduled" && (
                <Input
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) =>
                    handleInputChange("scheduled_at", e.target.value)
                  }
                />
              )}
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              Previous
            </Button>
            {step < 4 ? (
              <Button onClick={nextStep} disabled={!isStepComplete(step)}>
                Next
              </Button>
            ) : (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSubmit}
              >
                Create Campaign
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkingCampaignCreator;
