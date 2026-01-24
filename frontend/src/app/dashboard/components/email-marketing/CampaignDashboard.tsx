"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Search,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  MousePointer,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Local type definition for EmailCampaign
type EmailCampaign = {
  id: string;
  user_id: string;
  name: string;
  subject_line: string;
  campaign_type: string;
  status: string;
  target_segments: string[];
  content: { html: string; text: string };
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

interface CampaignDashboardProps {
  onCreateCampaign: () => void;
  onViewCampaign: (campaign: EmailCampaign) => void;
  onEditCampaign: (campaign: EmailCampaign) => void;
  user: unknown;
}

// Mock campaigns data
const mockCampaigns: EmailCampaign[] = [
  {
    id: "campaign-1",
    user_id: "mock-user",
    name: "Welcome Series Campaign",
    subject_line: "Welcome to our community!",
    campaign_type: "sequence",
    status: "active",
    target_segments: ["new_subscribers"],
    content: { html: "<h1>Welcome!</h1>", text: "Welcome!" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stats: {
      sent: 1250,
      delivered: 1200,
      opened: 480,
      clicked: 96,
      unsubscribed: 5,
      bounced: 15,
    },
  },
  {
    id: "campaign-2",
    user_id: "mock-user",
    name: "Product Launch Announcement",
    subject_line: "Exciting new product just launched!",
    campaign_type: "one-time",
    status: "completed",
    target_segments: ["all_subscribers"],
    content: { html: "<h1>New Product</h1>", text: "New Product Launch" },
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      sent: 3500,
      delivered: 3400,
      opened: 1360,
      clicked: 272,
      unsubscribed: 12,
      bounced: 28,
    },
  },
  {
    id: "campaign-3",
    user_id: "mock-user",
    name: "Monthly Newsletter",
    subject_line: "Your monthly update is here",
    campaign_type: "automation",
    status: "paused",
    target_segments: ["engaged_users"],
    content: { html: "<h1>Newsletter</h1>", text: "Newsletter content" },
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      sent: 892,
      delivered: 875,
      opened: 385,
      clicked: 67,
      unsubscribed: 3,
      bounced: 8,
    },
  },
];

const CampaignDashboard = ({
  onCreateCampaign,
  onViewCampaign,
  onEditCampaign,
}: CampaignDashboardProps) => {
  const [campaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.subject_line.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case "sequence":
        return <Mail className='w-6 h-6' />;
      case "automation":
        return <Users className='w-6 h-6' />;
      case "one-time":
        return <MousePointer className='w-6 h-6' />;
      default:
        return <Mail className='w-6 h-6' />;
    }
  };

  const calculateOpenRate = (stats: EmailCampaign["stats"]) => {
    if (!stats.sent || stats.sent === 0) return "0%";
    return ((stats.opened / stats.sent) * 100).toFixed(1) + "%";
  };

  const calculateClickRate = (stats: EmailCampaign["stats"]) => {
    if (!stats.sent || stats.sent === 0) return "0%";
    return ((stats.clicked / stats.sent) * 100).toFixed(1) + "%";
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>

          <Button onClick={onCreateCampaign}>
            <Mail className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {getCampaignTypeIcon(campaign.campaign_type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {campaign.subject_line}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={getStatusColor(campaign.status)}
                  >
                    {campaign.status}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onViewCampaign(campaign)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEditCampaign(campaign)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {campaign.status === "active" && (
                        <DropdownMenuItem>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </DropdownMenuItem>
                      )}
                      {campaign.status === "paused" && (
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Mail className="w-4 h-4 text-blue-500 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {campaign.stats.sent.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Sent</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Eye className="w-4 h-4 text-green-500 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {calculateOpenRate(campaign.stats)}
                  </div>
                  <div className="text-xs text-gray-600">Open Rate</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <MousePointer className="w-4 h-4 text-purple-500 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {calculateClickRate(campaign.stats)}
                  </div>
                  <div className="text-xs text-gray-600">Click Rate</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-orange-500 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {campaign.stats.clicked}
                  </div>
                  <div className="text-xs text-gray-600">Clicks</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-red-500 mr-1" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {campaign.stats.unsubscribed}
                  </div>
                  <div className="text-xs text-gray-600">Unsubscribed</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
                <span>Type: {campaign.campaign_type.replace("_", " ")}</span>
                <span>
                  Created: {new Date(campaign.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "No campaigns match your search."
                : "You haven't created any campaigns yet."}
            </p>
            <Button onClick={onCreateCampaign}>
              <Mail className="w-4 h-4 mr-2" />
              Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CampaignDashboard;

// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { MockUser } from "@/lib/mockUser";
// import {
//   Mail,
//   Search,
//   MoreVertical,
//   Play,
//   Pause,
//   Edit,
//   Trash2,
//   TrendingUp,
//   Users,
//   MousePointer,
//   Eye,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// /* =====================
//    Types (Frontend only)
// ===================== */

// type CampaignStatus = "active" | "paused" | "completed" | "draft";
// type CampaignType = "sequence" | "automation" | "one-time";

// interface CampaignStats {
//   sent: number;
//   delivered: number;
//   opened: number;
//   clicked: number;
//   unsubscribed: number;
//   bounced: number;
// }

// export interface EmailCampaign {
//   id: string;
//   name: string;
//   subject_line: string;
//   campaign_type: CampaignType;
//   status: CampaignStatus;
//   created_at: string;
//   stats: CampaignStats;
// }

// interface CampaignDashboardProps {
//   user: MockUser;
//   onCreateCampaign: () => void;
//   onViewCampaign: (campaign: EmailCampaign) => void;
//   onEditCampaign: (campaign: EmailCampaign) => void;
// }

// /* =====================
//    Mock Data
// ===================== */

// const MOCK_CAMPAIGNS: EmailCampaign[] = [
//   {
//     id: "campaign-1",
//     name: "Welcome Series",
//     subject_line: "Welcome to our community!",
//     campaign_type: "sequence",
//     status: "active",
//     created_at: new Date().toISOString(),
//     stats: {
//       sent: 1250,
//       delivered: 1200,
//       opened: 480,
//       clicked: 96,
//       unsubscribed: 5,
//       bounced: 15,
//     },
//   },
//   {
//     id: "campaign-2",
//     name: "Product Launch",
//     subject_line: "We just launched something new 🚀",
//     campaign_type: "one-time",
//     status: "completed",
//     created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
//     stats: {
//       sent: 3500,
//       delivered: 3400,
//       opened: 1360,
//       clicked: 272,
//       unsubscribed: 12,
//       bounced: 28,
//     },
//   },
//   {
//     id: "campaign-3",
//     name: "Monthly Newsletter",
//     subject_line: "Your monthly update is here",
//     campaign_type: "automation",
//     status: "paused",
//     created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
//     stats: {
//       sent: 892,
//       delivered: 875,
//       opened: 385,
//       clicked: 67,
//       unsubscribed: 3,
//       bounced: 8,
//     },
//   },
// ];

// /* =====================
//    Component (Mock only)
// ===================== */

// const CampaignDashboard = ({
//   onCreateCampaign,
//   onViewCampaign,
//   onEditCampaign,
// }: CampaignDashboardProps) => {
//   const [campaigns] = useState<EmailCampaign[]>(MOCK_CAMPAIGNS);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filterStatus, setFilterStatus] = useState<CampaignStatus | "all">(
//     "all"
//   );

//   const filteredCampaigns = campaigns.filter((campaign) => {
//     const matchesSearch =
//       campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       campaign.subject_line.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       filterStatus === "all" || campaign.status === filterStatus;

//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status: CampaignStatus) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "paused":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "completed":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "draft":
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getCampaignTypeIcon = (type: CampaignType) => {
//     switch (type) {
//       case "sequence":
//         return <Mail className="w-6 h-6" />;
//       case "automation":
//         return <Users className="w-6 h-6" />;
//       case "one-time":
//         return <MousePointer className="w-6 h-6" />;
//       default:
//         return <Mail className="w-6 h-6" />;
//     }
//   };

//   const calculateRate = (value: number, sent: number) => {
//     if (!sent) return "0%";
//     return ((value / sent) * 100).toFixed(1) + "%";
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row gap-4 justify-between">
//         <div className="relative w-full sm:max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <Input
//             placeholder="Search campaigns..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         <div className="flex gap-2">
//           <select
//             value={filterStatus}
//             onChange={(e) =>
//               setFilterStatus(e.target.value as CampaignStatus | "all")
//             }
//             className="px-3 py-2 border rounded-md text-sm"
//           >
//             <option value="all">All Status</option>
//             <option value="active">Active</option>
//             <option value="paused">Paused</option>
//             <option value="completed">Completed</option>
//             <option value="draft">Draft</option>
//           </select>

//           <Button onClick={onCreateCampaign}>
//             <Mail className="w-4 h-4 mr-2" />
//             New Campaign
//           </Button>
//         </div>
//       </div>

//       {/* Campaign list */}
//       <div className="grid grid-cols-1 gap-6">
//         {filteredCampaigns.map((campaign) => (
//           <Card key={campaign.id} className="hover:shadow-md transition">
//             <CardHeader className="pb-4">
//               <div className="flex justify-between">
//                 <div className="flex gap-3">
//                   <div className="text-gray-700">
//                     {getCampaignTypeIcon(campaign.campaign_type)}
//                   </div>
//                   <div>
//                     <CardTitle className="text-lg">{campaign.name}</CardTitle>
//                     <p className="text-sm text-gray-600">
//                       {campaign.subject_line}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Badge
//                     variant="outline"
//                     className={getStatusColor(campaign.status)}
//                   >
//                     {campaign.status}
//                   </Badge>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="sm">
//                         <MoreVertical className="w-4 h-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem
//                         onClick={() => onViewCampaign(campaign)}
//                       >
//                         <Eye className="w-4 h-4 mr-2" /> View
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => onEditCampaign(campaign)}
//                       >
//                         <Edit className="w-4 h-4 mr-2" /> Edit
//                       </DropdownMenuItem>
//                       {campaign.status === "active" && (
//                         <DropdownMenuItem>
//                           <Pause className="w-4 h-4 mr-2" /> Pause
//                         </DropdownMenuItem>
//                       )}
//                       {campaign.status === "paused" && (
//                         <DropdownMenuItem>
//                           <Play className="w-4 h-4 mr-2" /> Resume
//                         </DropdownMenuItem>
//                       )}
//                       <DropdownMenuItem className="text-red-600">
//                         <Trash2 className="w-4 h-4 mr-2" /> Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 <Stat
//                   icon={<Mail />}
//                   label="Sent"
//                   value={campaign.stats.sent}
//                 />
//                 <Stat
//                   icon={<Eye />}
//                   label="Open Rate"
//                   value={calculateRate(
//                     campaign.stats.opened,
//                     campaign.stats.sent
//                   )}
//                 />
//                 <Stat
//                   icon={<MousePointer />}
//                   label="Click Rate"
//                   value={calculateRate(
//                     campaign.stats.clicked,
//                     campaign.stats.sent
//                   )}
//                 />
//                 <Stat
//                   icon={<TrendingUp />}
//                   label="Clicks"
//                   value={campaign.stats.clicked}
//                 />
//                 <Stat
//                   icon={<Users />}
//                   label="Unsubscribed"
//                   value={campaign.stats.unsubscribed}
//                 />
//               </div>

//               <div className="mt-4 pt-4 border-t text-sm text-gray-600 flex justify-between">
//                 <span>Type: {campaign.campaign_type.replace("-", " ")}</span>
//                 <span>
//                   Created: {new Date(campaign.created_at).toLocaleDateString()}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredCampaigns.length === 0 && (
//         <Card>
//           <CardContent className="p-8 text-center">
//             <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold">No campaigns found</h3>
//             <p className="text-gray-600 mt-2 mb-4">
//               {searchTerm
//                 ? "No campaigns match your search"
//                 : "You haven't created any campaigns yet"}
//             </p>
//             <Button onClick={onCreateCampaign}>
//               <Mail className="w-4 h-4 mr-2" /> Create Campaign
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// const Stat = ({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: number | string;
// }) => (
//   <div className="flex flex-col items-center bg-gray-50 rounded-lg py-3">
//     <div className="w-5 h-5 text-gray-500 mb-1">{icon}</div>
//     <div className="text-xl font-bold text-gray-900">{value}</div>
//     <div className="text-xs text-gray-600">{label}</div>
//   </div>
// );

// export default CampaignDashboard;
