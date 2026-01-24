import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, ShoppingCart, Bell, Calendar, Users, Headphones, Sparkles } from "lucide-react";

interface WhatsAppGoalSelectorProps {
  onBack: () => void;
  onSelectGoal: (goal: string) => void;
}

const WhatsAppGoalSelector = ({ onBack, onSelectGoal }: WhatsAppGoalSelectorProps) => {
  const goals = [
    {
      id: "customer-support",
      title: "Customer Support Automation",
      description: "Automate FAQs, handle inquiries, and provide 24/7 support via WhatsApp",
      icon: Headphones,
      color: "from-blue-500 to-cyan-500",
      benefits: ["Reduce response time by 80%", "Handle unlimited inquiries", "AI-powered responses"]
    },
    {
      id: "sales-promotions",
      title: "Sales & Promotions",
      description: "Send promotional messages, flash sales, and exclusive offers to customers",
      icon: ShoppingCart,
      color: "from-green-500 to-emerald-500",
      benefits: ["98% open rate", "Direct purchase links", "Personalized offers"]
    },
    {
      id: "order-updates",
      title: "Order Updates & Notifications",
      description: "Keep customers informed about order status, shipping, and delivery",
      icon: Bell,
      color: "from-orange-500 to-amber-500",
      benefits: ["Real-time tracking", "Reduce support queries", "Automated updates"]
    },
    {
      id: "appointment-reminders",
      title: "Appointment Reminders",
      description: "Send automated appointment confirmations and reminders to reduce no-shows",
      icon: Calendar,
      color: "from-purple-500 to-violet-500",
      benefits: ["Reduce no-shows by 70%", "Easy rescheduling", "Two-way communication"]
    },
    {
      id: "lead-nurturing",
      title: "Lead Nurturing & Follow-ups",
      description: "Engage and nurture leads through personalized WhatsApp conversations",
      icon: Users,
      color: "from-pink-500 to-rose-500",
      benefits: ["Higher engagement rates", "Personalized sequences", "Automated follow-ups"]
    }
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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <MessageSquare className="w-8 h-8 text-green-500" />
            <span>AI WhatsApp Marketing</span>
          </h1>
          <p className="text-gray-600">Select your WhatsApp marketing goal</p>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
        <CardContent className="p-8 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">What do you want to achieve with WhatsApp?</h2>
          <p className="text-green-100 max-w-2xl mx-auto">
            Our AI will create a personalized WhatsApp marketing strategy based on your goal, 
            complete with message templates, automation workflows, and best practices.
          </p>
        </CardContent>
      </Card>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card 
            key={goal.id}
            className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-green-300 group"
            onClick={() => onSelectGoal(goal.id)}
          >
            <CardHeader className="pb-2">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${goal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <goal.icon className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-lg">{goal.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
              <ul className="space-y-2">
                {goal.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
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

export default WhatsAppGoalSelector;