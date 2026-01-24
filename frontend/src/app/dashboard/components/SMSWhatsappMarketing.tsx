// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowLeft,
//   MessageSquare,
//   Plus,
//   Send,
//   Users,
//   TrendingUp,
//   Loader2,
// } from "lucide-react";

// interface SMSWhatsAppMarketingProps {
//   onBack: () => void;
// }

// interface Campaign {
//   id: number;
//   name: string;
//   type: "SMS" | "WhatsApp";
//   status: "Active" | "Draft";
//   sent: number;
//   delivered: number;
//   responseRate: string;
//   date: string;
// }

// interface MessagingStats {
//   title: string;
//   value: string;
//   change: string;
//   color: string;
//   icon: "Users" | "Send" | "TrendingUp" | "MessageSquare";
// }

// interface MessagingData {
//   campaigns: Campaign[];
//   stats: MessagingStats[];
// }

// const SMSWhatsAppMarketing = ({ onBack }: SMSWhatsAppMarketingProps) => {
//   const [data, setData] = useState<MessagingData | null>(null);

//   useEffect(() => {
//     fetch("/api/messaging")
//       .then((res) => res.json())
//       .then((json) => setData(json));
//   }, []);

//   if (!data) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen space-y-3">
//         <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//         <p className="text-gray-600 text-sm sm:text-base">
//           Loading messaging...
//         </p>
//       </div>
//     );
//   }

//   const iconMap = {
//     Users,
//     Send,
//     TrendingUp,
//     MessageSquare,
//   };

//   const getTypeBadge = (type: string) => {
//     switch (type) {
//       case "SMS":
//         return (
//           <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
//             SMS
//           </span>
//         );
//       case "WhatsApp":
//         return (
//           <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
//             WhatsApp
//           </span>
//         );
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
//           <div>
//             <Button
//               variant="outline"
//               onClick={onBack}
//               className="flex items-center space-x-2"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>Back</span>
//             </Button>
//           </div>

//           <div>
//             <div className="flex items-center gap-2">
//               <MessageSquare className="text-purple-600" />
//               <h1 className="text-xl md:text-2xl font-bold">SMS & WhatsApp</h1>
//             </div>
//             <p className="text-sm text-gray-500">
//               Manage SMS and WhatsApp campaigns
//             </p>
//           </div>
//         </div>

//         <div className="w-full md:w-auto">
//           <Button className="text-white bg-gradient-to-r from-purple-600 to-pink-600">
//             <Plus className="w-4 h-4 mr-2" />
//             New Campaign
//           </Button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         {data.stats.map((s, idx) => {
//           const Icon = iconMap[s.icon];
//           return (
//             <Card
//               key={idx}
//               className="bg-white rounded shadow p-4 border border-gray-100 flex justify-between items-center"
//             >
//               <CardContent>
//                 <p className="text-sm text-gray-500">{s.title}</p>
//                 <p className="text-xl font-semibold">{s.value}</p>
//                 <span className={`${s.color} text-sm`}>{s.change}</span>
//               </CardContent>
//               <Icon className={`w-6 h-6 ${s.color}`} />
//             </Card>
//           );
//         })}
//       </div>

//       {/* Campaign List */}
//       <Card className="bg-white border border-gray-200 rounded-lg p-6 shadow">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold mb-4">
//             SMS & WhatsApp Campaigns
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {data.campaigns.map((c) => (
//               <div
//                 key={c.id}
//                 className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow transition gap-4"
//               >
//                 <div className="flex items-start md:items-center gap-4 flex-1">
//                   <div
//                     className={`p-2 flex items-center justify-center rounded-lg text-white ${
//                       c.type === "SMS"
//                         ? "bg-gradient-to-r from-purple-500 to-blue-500"
//                         : "bg-gradient-to-r from-green-500 to-emerald-500"
//                     }`}
//                   >
//                     <MessageSquare className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-medium">{c.name}</p>
//                     <p className="text-sm text-gray-500">{c.date}</p>
//                     <div className="mt-1">{getTypeBadge(c.type)}</div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto text-sm">
//                   <div className="grid grid-cols-3 gap-4 flex-1 text-center md:flex md:gap-6 md:text-right">
//                     <div>
//                       <p className="font-semibold text-center">{c.sent}</p>
//                       <span className="text-gray-500 text-xs">Sent</span>
//                     </div>
//                     <div>
//                       <p className="font-semibold text-center">{c.delivered}</p>
//                       <span className="text-gray-500 text-xs">Delivered</span>
//                     </div>
//                     <div>
//                       <p className="font-semibold text-center">
//                         {c.responseRate}
//                       </p>
//                       <span className="text-gray-500 text-xs">Response</span>
//                     </div>
//                   </div>

//                   <div
//                     className={`text-xs px-2 py-1 rounded ${
//                       c.status === "Active"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-gray-200 text-gray-600"
//                     }`}
//                   >
//                     {c.status}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
// export default SMSWhatsAppMarketing;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import {
  ArrowLeft,
  MessageSquare,
  Plus,
  Send,
  Users,
  TrendingUp,
} from "lucide-react";
=======
import { ArrowLeft, MessageSquare, Plus, Send, Users, TrendingUp } from "lucide-react";
>>>>>>> 31ab30e (update)

interface SMSWhatsAppMarketingProps {
  onBack: () => void;
}

const SMSWhatsAppMarketing = ({ onBack }: SMSWhatsAppMarketingProps) => {
<<<<<<< HEAD
  const [data, setData] = useState<MessagingData | null>(null);

  useEffect(() => {
    fetch("/api/messaging")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading messaging...</p>
      </div>
    );
  }

  const iconMap = {
    Users,
    Send,
    TrendingUp,
    MessageSquare,
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "SMS":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
            SMS
          </span>
        );
      case "WhatsApp":
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            WhatsApp
          </span>
        );
=======
  const campaigns = [
    {
      id: 1,
      name: "Welcome SMS Series",
      type: "SMS",
      status: "Active",
      sent: 850,
      delivered: 832,
      responseRate: "24.1%",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "WhatsApp Follow-up",
      type: "WhatsApp",
      status: "Draft",
      sent: 0,
      delivered: 0,
      responseRate: "—",
      date: "2024-01-18"
>>>>>>> 31ab30e (update)
    }
  ];

  const stats = [
    { label: "Total Contacts", value: "8,456", change: "+12.3%", icon: Users, color: "text-purple-600" },
    { label: "Delivery Rate", value: "97.8%", change: "+1.2%", icon: Send, color: "text-green-600" },
    { label: "Response Rate", value: "24.1%", change: "+8.1%", icon: TrendingUp, color: "text-blue-600" },
    { label: "Messages Today", value: "1,234", change: "+15%", icon: MessageSquare, color: "text-orange-600" }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-purple-500" />
              <span>SMS & WhatsApp</span>
            </h1>
            <p className="text-gray-600">Manage SMS and WhatsApp campaigns</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`text-sm ${stat.color}`}>{stat.change}</div>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle>SMS & WhatsApp Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    campaign.type === 'SMS' 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}>
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        campaign.type === 'SMS' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {campaign.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{campaign.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold">{campaign.sent}</p>
                    <p className="text-gray-600">Sent</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{campaign.delivered}</p>
                    <p className="text-gray-600">Delivered</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{campaign.responseRate}</p>
                    <p className="text-gray-600">Response Rate</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SMSWhatsAppMarketing;
