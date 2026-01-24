import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mail,
  TrendingUp,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";

interface EmailGoalSelectorProps {
  onBack: () => void;
  onSelectGoal: (goal: string) => void;
}

const EmailGoalSelector = ({ onBack, onSelectGoal }: EmailGoalSelectorProps) => {
  const goals = [
    {
      id: "nurture-leads",
      title: "Nurture Leads with Email",
      description:
        "Build trust, educate prospects, and guide them through your sales funnel",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      benefits: [
        "Build long-term relationships",
        "Automated email sequences",
        "Higher conversion over time",
      ],
    },
    {
      id: "product-launch",
      title: "Launch New Product or Service",
      description:
        "Create excitement and drive demand for a new product or service launch",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      benefits: [
        "Pre-launch hype emails",
        "Launch-day campaigns",
        "Post-launch follow-ups",
      ],
    },
    {
      id: "direct-sales",
      title: "Drive Direct Sales",
      description:
        "Send promotional campaigns designed to convert subscribers into customers",
      icon: Target,
      color: "from-green-500 to-green-600",
      benefits: [
        "High-converting offers",
        "Flash sales & discounts",
        "Revenue-focused campaigns",
      ],
    },
    {
      id: "reengagement",
      title: "Re-engage Inactive Subscribers",
      description:
        "Win back subscribers who stopped opening or clicking your emails",
      icon: Mail,
      color: "from-blue-500 to-blue-600",
      benefits: [
        "Clean & revive your list",
        "Improve deliverability",
        "Recover lost leads",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Mail className="w-8 h-8 text-blue-600" />
            <span>AI Email Marketing</span>
          </h1>
          <p className="text-gray-600">
            Select your email marketing goal
          </p>
        </div>
      </div>

      {/* Hero */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
        <CardContent className="p-8 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            What do you want to achieve with Email?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Our AI will design a personalized email strategy including sequences,
            templates, timing, and best practices based on your goal.
          </p>
        </CardContent>
      </Card>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            onClick={() => onSelectGoal(goal.title)}
            className="cursor-pointer border-2 hover:border-blue-300 hover:shadow-xl transition-all group"
          >
            <CardHeader className="pb-2">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-r ${goal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <goal.icon className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-lg">
                {goal.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {goal.description}
              </p>
              <ul className="space-y-2">
                {goal.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full mt-4 bg-gradient-to-r ${goal.color} hover:opacity-90`}
              >
                Select Goal
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmailGoalSelector;
