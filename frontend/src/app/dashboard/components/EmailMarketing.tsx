/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BarChart3,
  Users,
  Sparkles,
  Target,
  Zap,
  Bot,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CampaignDashboard from "./email-marketing/CampaignDashboard";
import CampaignCreator from "./email-marketing/CampaignCreator";
import SegmentManager from "./email-marketing/SegmentManager";
import AIStrategyBuilder from "./email-marketing/AIStrategyBuilder";
import StrategyResults from "./email-marketing/StrategyResults";
<<<<<<< HEAD

type EmailCampaign = {
  id: string;
  user_id: string;
  name: string;
  subject_line: string;
  campaign_type: string;
  status: string;
  target_segments: string[];
  content: { html: string; text: string };
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    bounced: number;
  };
  created_at: string;
  updated_at: string;
};
type EmailStrategy = {
  id: string;
  name: string;
  business_type: string;
  marketing_goals: string[];
  created_at: string;
  generated_strategy: any;
  target_audience_profile?: { description?: string };
};
=======
import { EmailStrategy } from "@/types/emailStrategy";
import { EmailCampaign } from "@/types/emailCampaign";
import { View } from "../components/Sidebar";
import EmailGoalSelector from "../components/email-marketing/EmailGoalSelector";
>>>>>>> 31ab30e (update)

interface EmailMarketingProps {
  onBack: () => void;
  onCreateNew?: () => void;
}

<<<<<<< HEAD
type View =
  | "dashboard"
  | "ai-strategy"
  | "strategy-results"
  | "create"
  | "view"
  | "edit";

// Mock user for functionality
const mockUser = {
  id: "mock-user-123",
  email: "owner@example.com",
};

const EmailMarketing = ({ onBack }: EmailMarketingProps) => {
=======
interface User {
  id: string;
  name: string;
  email: string;
}

/* ===== Mock user ===== */

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
};

/* ===== API response shape for fetch ===== */

interface ApiResponse {
  campaigns?: EmailCampaign[];
  strategies?: EmailStrategy[];
}

/* ===== Component ===== */

const EmailMarketing = ({ onBack, onCreateNew }: EmailMarketingProps) => {
>>>>>>> 31ab30e (update)
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<View>("dashboard"); // Start with dashboard, not AI strategy
  const [selectedCampaign, setSelectedCampaign] =
    useState<EmailCampaign | null>(null);
  const [selectedStrategy, setSelectedStrategy] =
    useState<EmailStrategy | null>(null);
  const [activeTab, setActiveTab] = useState("campaigns");
  const [strategies, setStrategies] = useState<EmailStrategy[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch email data from API
  useEffect(() => {
    fetch("/api/emailMarketing")
      .then((res) => res.json())
      .then((json) => {
        setCampaigns(json.campaigns);
        setStrategies(json.strategies);
      })
      .catch((err) => console.error("Failed to fetch email data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading email marketing data...</p>
      </div>
    );
  }

  const handleStrategyComplete = (strategy: EmailStrategy) => {
    console.log("Strategy completed:", strategy);
    setSelectedStrategy(strategy);
    setStrategies((prev) => [strategy, ...prev]);
    setCurrentView("strategy-results");

    toast({
      title: "🎉 AI Strategy Generated Successfully!",
      description: `Your personalized email marketing strategy "${strategy.name}" is ready to implement with smart automations.`,
    });
  };

  const handleImplementWorkflow = async (workflowType: string) => {
    if (!selectedStrategy) {
      toast({
        title: "No Strategy Selected",
        description: "Please select a strategy first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Define a type for the workflow object
      type Workflow = {
        type: string;
        name: string;
        description: string;
        suggested_emails?: { subject: string }[];
      };

      // Find the specific workflow from the strategy
      const workflow = (
        selectedStrategy.generated_strategy.recommended_workflows as Workflow[]
      ).find((w: Workflow) => w.type === workflowType);

      if (!workflow) {
        throw new Error("Workflow not found in strategy");
      }

      // Create AI-enhanced campaign based on the workflow
      const newCampaign: EmailCampaign = {
        id: `campaign-${Date.now()}`,
        user_id: mockUser.id,
        name: `${workflow.name} - ${selectedStrategy.business_type}`,
        subject_line:
          workflow.suggested_emails?.[0]?.subject ||
          `Smart ${selectedStrategy.business_type} Campaign`,
        campaign_type: "automation",
        status: "active",
        target_segments: ["all_subscribers"],
        content: {
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4f46e5;">${workflow.name}</h1>
            <p>This intelligent campaign is powered by AI and tailored specifically for your ${
              selectedStrategy.business_type
            } business.</p>
            <p><strong>Target Audience:</strong> ${
              selectedStrategy.target_audience_profile?.description ||
              "Your subscribers"
            }</p>
            <p><strong>Campaign Goal:</strong> ${workflow.description}</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>AI-Powered Features:</h3>
              <ul>
                <li>Personalized content based on subscriber behavior</li>
                <li>Smart send-time optimization</li>
                <li>Automatic A/B testing</li>
                <li>Behavioral trigger automation</li>
              </ul>
            </div>
            <p>This campaign will adapt and optimize automatically to maximize engagement with your audience.</p>
          </div>`,
          text: `${
            workflow.name
          }\n\nThis intelligent campaign is powered by AI and tailored specifically for your ${
            selectedStrategy.business_type
          } business.\n\nTarget Audience: ${
            selectedStrategy.target_audience_profile?.description ||
            "Your subscribers"
          }\n\nCampaign Goal: ${
            workflow.description
          }\n\nAI-Powered Features:\n- Personalized content based on subscriber behavior\n- Smart send-time optimization\n- Automatic A/B testing\n- Behavioral trigger automation\n\nThis campaign will adapt and optimize automatically to maximize engagement with your audience.`,
        },
        stats: {
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          unsubscribed: 0,
          bounced: 0,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setCampaigns((prev) => [newCampaign, ...prev]);

      toast({
        title: "🚀 AI Workflow Activated!",
        description: `"${newCampaign.name}" has been created and is now running with intelligent automation. Your AI-powered campaign is optimizing in real-time.`,
      });

      setCurrentView("dashboard");
      setActiveTab("campaigns");
    } catch (error: unknown) {
      console.error("Failed to create AI workflow:", error);
      toast({
        title: "Implementation Failed",
        description:
          typeof error === "object" && error !== null && "message" in error
            ? String((error as { message?: string }).message)
            : "Failed to implement the AI workflow. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    setCurrentView("create");
  };

  const handleViewCampaign = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setCurrentView("view");
  };

  const handleEditCampaign = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setCurrentView("edit");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedCampaign(null);
    setSelectedStrategy(null);
  };

  const handleOpenAIStrategy = () => {
    setCurrentView("ai-strategy");
    setSelectedCampaign(null);
    setSelectedStrategy(null);
  };

  const handleEmailGoalSelector = () => {
    setCurrentView("email-goal-selector");
  };

  const handleCampaignCreated = (campaign: EmailCampaign) => {
    setCampaigns((prev) => [campaign, ...prev]);
    setCurrentView("dashboard");
    toast({
      title: "Campaign Created!",
      description: "Your email campaign has been created successfully.",
    });
  };

  // AI Strategy Builder view
  if (currentView === "ai-strategy") {
    return (
      <AIStrategyBuilder
        user={mockUser as any}
        onBack={handleBackToDashboard}
        onComplete={handleStrategyComplete}
      />
    );
  }

  if (currentView === "strategy-results" && selectedStrategy) {
    return (
      <StrategyResults
        strategy={selectedStrategy}
        onBack={handleBackToDashboard}
        onImplement={handleImplementWorkflow}
      />
    );
  }

  if (currentView === "create") {
    return (
      <CampaignCreator
        onBack={handleBackToDashboard}
        onComplete={handleCampaignCreated}
        user={mockUser as any}
      />
    );
  }

  // Dashboard view - default starting view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Bot className="w-8 h-8 text-primary" />
              <span>AI Email Marketing</span>
            </h1>
            <p className="text-muted-foreground">
              {strategies.length > 0
                ? `${strategies.length} AI strategies created • ${campaigns.length} intelligent campaigns running`
                : "Create intelligent email campaigns powered by advanced AI"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
<<<<<<< HEAD
            onClick={handleOpenAIStrategy}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700"
=======
            onClick={handleEmailGoalSelector}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto"
>>>>>>> 31ab30e (update)
          >
            <Wand2 className="w-4 h-4 mr-2" />
            AI Strategy Builder
          </Button>
          <Button
            onClick={handleCreateCampaign}
            className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* AI-Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {strategies.length}
                </div>
                <div className="text-sm text-gray-600">AI Strategies</div>
              </div>
              <Wand2 className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2 text-xs text-purple-600">
              {strategies.length > 0
                ? "Personalized & Active"
                : "Create your first strategy"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {campaigns.length}
                </div>
                <div className="text-sm text-gray-600">Smart Campaigns</div>
              </div>
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2 text-xs text-blue-600">
              AI-optimized performance
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {campaigns
                    .reduce((acc, c) => acc + (c.stats?.sent || 0), 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">AI Emails Sent</div>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2 text-xs text-green-600">
              Performance tracked
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {campaigns.filter((c) => c.status === "active").length}
                </div>
                <div className="text-sm text-gray-600">Active AI Workflows</div>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2 text-xs text-orange-600">Auto-optimizing</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Strategy Overview */}
      {strategies.length > 0 && (
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Your AI Email Strategies</span>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                {strategies.length} AI-powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategies.slice(0, 3).map((strategy) => (
                <div
                  key={strategy.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer hover:border-purple-300 bg-white"
                  onClick={() => {
                    setSelectedStrategy(strategy);
                    setCurrentView("strategy-results");
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-purple-600 truncate flex items-center space-x-1">
                      <Bot className="w-4 h-4" />
                      <span>{strategy.name}</span>
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-xs border-purple-200 text-purple-700"
                    >
                      {strategy.business_type}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">AI Goals:</span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-purple-100 text-purple-800"
                      >
                        {strategy.marketing_goals.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Created:</span>
                      <span className="text-xs text-gray-500">
                        {new Date(strategy.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-purple-600 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Fully customized & ready</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content with AI enhancements */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="campaigns"
            className="flex items-center space-x-2"
          >
            <Bot className="w-4 h-4" />
            <span>AI Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Smart Audience</span>
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Templates</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center space-x-2"
          >
            <BarChart3 className="w-4 h-4" />
            <span>AI Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <CampaignDashboard
            onCreateCampaign={handleCreateCampaign}
            onViewCampaign={handleViewCampaign}
            onEditCampaign={handleEditCampaign}
            user={mockUser}
          />
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <SegmentManager user={mockUser} />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <span>AI-Powered Templates</span>
              </h2>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Wand2 className="w-4 h-4 mr-2" />
                Generate AI Template
              </Button>
            </div>
            <p className="text-gray-600 mt-2">
              Templates automatically generated and optimized by AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <span>AI Welcome Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Personalized welcome messages generated by AI
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Use AI Template
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Wand2 className="w-5 h-5 text-blue-600" />
                  <span>Smart Newsletter</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  AI-curated content for your audience
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Bot className="w-4 h-4 mr-2" />
                  Use AI Template
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>AI Promotional</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Optimized sales emails with AI insights
                </p>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Use AI Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span>AI Analytics Dashboard</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Advanced insights powered by AI analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-green-600" />
                  <span>AI Open Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">42.1%</div>
                <p className="text-sm text-gray-600">
                  +12.3% from AI optimization
                </p>
                <div className="mt-2 text-xs text-green-600">
                  AI-enhanced performance
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>Smart Click Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">9.4%</div>
                <p className="text-sm text-gray-600">+3.7% with AI targeting</p>
                <div className="mt-2 text-xs text-blue-600">
                  AI-driven clicks
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Wand2 className="w-5 h-5 text-purple-600" />
                  <span>AI Engagement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">87%</div>
                <p className="text-sm text-gray-600">
                  AI-predicted satisfaction
                </p>
                <div className="mt-2 text-xs text-purple-600">
                  Machine learning insights
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailMarketing;
