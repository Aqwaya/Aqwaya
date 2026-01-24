// "use client";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Settings,
//   User,
//   Bell,
//   Shield,
//   CreditCard,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";

// export default function SettingsPage() {
//   const settingsCategories = [
//     {
//       title: "Profile Settings",
//       icon: User,
//       color: "text-blue-600",
//       settings: [
//         { label: "Full Name", type: "input", value: "Sarah Johnson" },
//         { label: "Email", type: "input", value: "sarah.j@company.com" },
//         { label: "Phone", type: "input", value: "+1 (555) 123-4567" },
//         { label: "Company", type: "input", value: "Akwaya Marketing" },
//       ],
//     },
//     {
//       title: "Notifications",
//       icon: Bell,
//       color: "text-yellow-600",
//       settings: [
//         { label: "Email Notifications", type: "switch", value: true },
//         { label: "SMS Notifications", type: "switch", value: false },
//         { label: "Campaign Updates", type: "switch", value: true },
//         { label: "Weekly Reports", type: "switch", value: true },
//       ],
//     },
//     {
//       title: "Security",
//       icon: Shield,
//       color: "text-green-600",
//       settings: [
//         { label: "Two-Factor Authentication", type: "switch", value: false },
//         { label: "Login Alerts", type: "switch", value: true },
//         { label: "Session Timeout", type: "select", value: "30 minutes" },
//       ],
//     },
//     {
//       title: "Billing",
//       icon: CreditCard,
//       color: "text-purple-600",
//       settings: [
//         {
//           label: "Current Plan",
//           type: "display",
//           value: "Pro Plan - $99/month",
//         },
//         {
//           label: "Next Billing Date",
//           type: "display",
//           value: "February 15, 2024",
//         },
//         {
//           label: "Payment Method",
//           type: "display",
//           value: "**** **** **** 1234",
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
//           {/* Left: Back + Title */}
//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
//             <Link
//               href="/dashboard"
//               className="text-sm flex items-center gap-2 bg-white rounded hover:bg-gray-100 border border-gray-200 px-4 py-2 text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </Link>

//             <div>
//               <div className="flex items-center gap-2">
//                 <Settings className="text-blue-500 w-6 h-6" />
//                 <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
//               </div>
//               <p className="text-sm text-gray-500">
//                 Manage your account and preferences
//               </p>
//             </div>
//           </div>

//           {/* Save button (only visible on desktop) */}
//           <div className="w-full md:w-auto">
//             <button className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded shadow text-center">
//               Save All Changes
//             </button>
//           </div>
//         </div>

//         {/* Settings Categories */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {settingsCategories.map((category, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-200 rounded-lg shadow p-6"
//             >
//               {/* Category Title */}
//               <div className="flex items-center gap-2 mb-4">
//                 <category.icon className={`w-5 h-5 ${category.color}`} />
//                 <h2 className="font-semibold">{category.title}</h2>
//               </div>

//               <div className="space-y-4">
//                 {category.settings.map((setting, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center justify-between flex-wrap gap-2"
//                   >
//                     <Label className="text-sm font-medium">
//                       {setting.label}
//                     </Label>
//                     <div>
//                       {setting.type === "input" && (
//                         <Input
//                           defaultValue={setting.value as string}
//                           className="w-48"
//                         />
//                       )}
//                       {setting.type === "switch" && (
//                         <Switch defaultChecked={setting.value as boolean} />
//                       )}
//                       {setting.type === "display" && (
//                         <span className="text-sm text-gray-600">
//                           {setting.value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}

//                 {/* Extra actions */}
//                 {category.title === "Profile Settings" && (
//                   <Button className="w-full mt-4">Update Profile</Button>
//                 )}
//                 {category.title === "Billing" && (
//                   <div className="space-y-2 mt-4">
//                     <Button variant="outline" className="w-full">
//                       Upgrade Plan
//                     </Button>
//                     <Button variant="outline" className="w-full">
//                       Update Payment Method
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Danger Zone */}
//         <div className="bg-white border border-red-200 rounded-lg shadow p-6 mt-8">
//           <h2 className="text-red-600 font-semibold mb-4">Danger Zone</h2>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between flex-wrap gap-2">
//               <div>
//                 <Label className="text-sm font-medium">Export Data</Label>
//                 <p className="text-xs text-gray-500">
//                   Download all your account data
//                 </p>
//               </div>
//               <Button variant="outline">Export</Button>
//             </div>

//             <div className="flex items-center justify-between flex-wrap gap-2">
//               <div>
//                 <Label className="text-sm font-medium text-red-600">
//                   Delete Account
//                 </Label>
//                 <p className="text-xs text-gray-500">
//                   Permanently delete your account and all data
//                 </p>
//               </div>
//               <Button variant="destructive">Delete</Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
} from "lucide-react";

type View =
  | "dashboard"
  | "ai-builder"
  | "email"
  | "email-strategy-builder"
  | "campaigns"
  | "landing-pages"
  | "landing-page-builder"
  | "leads"
  | "whatsapp-goal-selector"
  | "whatsapp-strategy-builder"
  | "whatsapp-dashboard"
  | "analytics"
  | "settings"
  | "pricing";

interface SettingsPageProps {
  onBack: () => void;
<<<<<<< HEAD
=======
  onViewChange: (view: View) => void;
>>>>>>> 31ab30e (update)
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const settingsCategories = [
    {
      title: "Profile Settings",
      icon: User,
      color: "text-blue-600",
      settings: [
        { label: "Full Name", type: "input", value: "Sarah Johnson" },
        { label: "Email", type: "input", value: "sarah.j@company.com" },
        { label: "Phone", type: "input", value: "+1 (555) 123-4567" },
        { label: "Company", type: "input", value: "Akwaya Marketing" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "text-yellow-600",
      settings: [
        { label: "Email Notifications", type: "switch", value: true },
        { label: "SMS Notifications", type: "switch", value: false },
        { label: "Campaign Updates", type: "switch", value: true },
        { label: "Weekly Reports", type: "switch", value: true },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      color: "text-green-600",
      settings: [
        { label: "Two-Factor Authentication", type: "switch", value: false },
        { label: "Login Alerts", type: "switch", value: true },
        { label: "Session Timeout", type: "select", value: "30 minutes" },
      ],
    },
    {
      title: "Billing",
      icon: CreditCard,
      color: "text-purple-600",
      settings: [
        {
          label: "Current Plan",
          type: "display",
          value: "Pro Plan - $99/month",
        },
        {
          label: "Next Billing Date",
          type: "display",
          value: "February 15, 2024",
        },
        {
          label: "Payment Method",
          type: "display",
          value: "**** **** **** 1234",
        },
      ],
    },
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
              <Settings className="w-8 h-8 text-gray-600" />
              <span>Settings</span>
            </h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <category.icon className={`w-5 h-5 ${category.color}`} />
                <span>{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.settings.map((setting, settingIndex) => (
                <div
                  key={settingIndex}
                  className="flex items-center justify-between"
                >
                  <Label className="text-sm font-medium">{setting.label}</Label>
                  <div className="flex items-center">
                    {setting.type === "input" && (
                      <Input
                        defaultValue={setting.value as string}
                        className="w-48"
                      />
                    )}
                    {setting.type === "switch" && (
                      <Switch defaultChecked={setting.value as boolean} />
                    )}
                    {setting.type === "display" && (
                      <span className="text-sm text-gray-600">
                        {setting.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {category.title === "Profile Settings" && (
                <Button variant="outline" className="w-full mt-4 bg-gray-900 text-white">
                  Save Changes
                </Button>
              )}
              {category.title === "Billing" && (
                <div className="space-y-2 mt-4">
                  <Button variant="outline" className="w-full">
                    Upgrade Plan
                  </Button>
                  <Button variant="outline" className="w-full">
                    Update Payment Method
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Export Data</Label>
              <p className="text-xs text-gray-600">
                Download all your account data
              </p>
            </div>
            <Button variant="outline">Export</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-red-600">
                Delete Account
              </Label>
              <p className="text-xs text-gray-600">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" className="text-white bg-red-400">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
