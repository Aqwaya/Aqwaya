import { NextResponse } from "next/server";

export const GET = async () => {
  const settingsCategories = [
    {
      title: "Profile Settings",
      icon: "User",
      color: "text-blue-600",
      settings: [
        { label: "Full Name", type: "input", value: "" },
        { label: "Email", type: "input", value: "" },
        { label: "Phone", type: "input", value: "" },
        { label: "Company", type: "input", value: "" },
      ],
    },
    {
      title: "Notifications",
      icon: "Bell",
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
      icon: "Shield",
      color: "text-green-600",
      settings: [
        { label: "Two-Factor Authentication", type: "switch", value: false },
        { label: "Login Alerts", type: "switch", value: true },
        { label: "Session Timeout", type: "display", value: "30 minutes" },
      ],
    },
    {
      title: "Billing",
      icon: "CreditCard",
      color: "text-purple-600",
      settings: [
        {
          label: "Current Plan",
          type: "display",
          value: "Free Trial - $000 / month",
        },
        {
          label: "Next Billing Date",
          type: "display",
          value: new Date().toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      ],
    },
  ];

  return NextResponse.json(settingsCategories);
};
