import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MessageSquare,
  Plus,
  Send,
  Users,
  TrendingUp,
  Clock,
  Sparkles,
  Edit,
  Trash2,
  Play,
  Pause,
} from "lucide-react";

interface WhatsAppDashboardProps {
  onBack: () => void;
  onCreateNew: () => void;
  strategy?: unknown;
}

const WhatsAppDashboard = ({ onBack, onCreateNew }: WhatsAppDashboardProps) => {
  const [campaigns] = useState([
    {
      id: 1,
      name: "Welcome Series",
      status: "Active",
      sent: 1250,
      delivered: 1225,
      read: 1180,
      responded: 520,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Promotional Campaign",
      status: "Paused",
      sent: 850,
      delivered: 832,
      read: 790,
      responded: 245,
      createdAt: "2024-01-18",
    },
    {
      id: 3,
      name: "Follow-up Sequence",
      status: "Draft",
      sent: 0,
      delivered: 0,
      read: 0,
      responded: 0,
      createdAt: "2024-01-20",
    },
  ]);

  const [templates] = useState([
    {
      id: 1,
      name: "Welcome Message",
      category: "Marketing",
      status: "Approved",
      usageCount: 1250,
    },
    {
      id: 2,
      name: "Order Confirmation",
      category: "Transactional",
      status: "Approved",
      usageCount: 3400,
    },
    {
      id: 3,
      name: "Promotional Offer",
      category: "Marketing",
      status: "Pending",
      usageCount: 0,
    },
  ]);

  const stats = [
    {
      label: "Total Contacts",
      value: "8,456",
      change: "+12.3%",
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Messages Sent",
      value: "15.2K",
      change: "+18.5%",
      icon: Send,
      color: "text-blue-600",
    },
    {
      label: "Response Rate",
      value: "45.2%",
      change: "+8.1%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      label: "Avg Response Time",
      value: "2.3 min",
      change: "-15%",
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-green-500" />
              <span>WhatsApp Marketing</span>
            </h1>
            <p className="text-gray-600">
              Manage your WhatsApp campaigns and automations
            </p>
          </div>
        </div>
        <Button
          onClick={onCreateNew}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Create with AI
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`text-sm ${stat.color}`}>{stat.change}</div>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>WhatsApp Campaigns</CardTitle>
              <Button size="sm" onClick={onCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">
                          Created {campaign.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">
                          {campaign.sent.toLocaleString()}
                        </p>
                        <p className="text-gray-600">Sent</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">
                          {campaign.read.toLocaleString()}
                        </p>
                        <p className="text-gray-600">Read</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">
                          {campaign.sent > 0
                            ? Math.round(
                                (campaign.responded / campaign.sent) * 100
                              )
                            : 0}
                          %
                        </p>
                        <p className="text-gray-600">Response</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          campaign.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : campaign.status === "Paused"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {campaign.status}
                      </span>
                      <div className="flex space-x-2">
                        {campaign.status === "Active" ? (
                          <Button size="sm" variant="outline">
                            <Pause className="w-4 h-4" />
                          </Button>
                        ) : campaign.status === "Paused" ? (
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4" />
                          </Button>
                        ) : null}
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Message Templates</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-600">
                          {template.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="font-semibold">
                          {template.usageCount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">Times Used</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          template.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {template.status}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automations">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Automations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No automations yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first WhatsApp automation to engage customers
                  automatically
                </p>
                <Button
                  onClick={onCreateNew}
                  className="bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Automation with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>WhatsApp Contacts</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Import Contacts
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Manage your contacts
                </h3>
                <p className="text-gray-600 mb-4">
                  Import and manage your WhatsApp contact list
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Import Contacts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppDashboard;
