"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Target,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Globe,
  Bot,
  Sparkles,
  Wand2,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type View =
  | "dashboard"
  | "ai-builder"
  | "email"
  | "email-strategy-builder"
  | "email-goal-selector"
  | "campaigns"
  | "landing-pages"
  | "landing-page-builder"
  | "leads"
  | "whatsapp-goal-selector"
  | "whatsapp-strategy-builder"
  | "sms-whatsapp"
  | "analytics"
  | "settings"
  | "pricing"
  | "ai-strategy"
  | "strategy-results"
  | "create"
  | "view"
  | "edit";


interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}
const capitalizeFullName = (name: string): string => {
  if (!name) return "Sarah Johnson";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username);
    }
  }, []);
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const menuItems: {
    id: View;
    label: string;
    icon: React.ElementType;
    isAI?: boolean;
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "ai-builder", label: "AI Prompt Builder", icon: Zap },
    { id: "campaigns", label: "Campaigns", icon: Target },
    { id: "landingPages", label: "Landing Pages", icon: Globe },
    { id: "leads", label: "Leads", icon: Users },
    {
      id: "email-goal-selector",
      label: "AI Email Marketing",
      icon: Bot,
      isAI: true,
      description: "Powered by AI",
    },
    {
      id: "whatsapp-goal-selector",
      label: "SMS & WhatsApp",
      icon: MessageSquare,
    },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          `fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out`,
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:block"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Aqwaya Logo"
                width={30}
                height={30}
                className="w-6 h-6"
              />
              <span className="text-xl font-bold text-gray-900">Aqwaya.ai</span>
            </div>
            <button className="md:hidden" onClick={closeSidebar}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Subheader */}
          <p className="text-xs text-gray-500 px-6 pt-1">
            AI-Powered Marketing
          </p>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    closeSidebar(); // Close on mobile
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    currentView === item.id
                      ? item.isAI
                        ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200 shadow-sm"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    item.isAI &&
                      "hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      className={cn(
                        "w-5 h-5",
                        item.isAI && currentView === item.id
                          ? "text-purple-600"
                          : ""
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.isAI && (
                    <div className="flex items-center space-x-1">
                      <Wand2 className="w-3 h-3 text-purple-500" />
                      <span className="text-xs text-purple-600 font-medium">
                        AI
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* AI Features Highlight */}
            <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">
                  AI-Powered Features
                </span>
              </div>
              <p className="text-xs text-purple-600 mb-3">
                Experience the power of AI across all marketing tools
              </p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs text-purple-600">
                  <Bot className="w-3 h-3" />
                  <span>Smart Email Campaigns</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-purple-600">
                  <Wand2 className="w-3 h-3" />
                  <span>AI Content Generation</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-purple-600">
                  <Target className="w-3 h-3" />
                  <span>Intelligent Targeting</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Bottom / Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {firstLetter}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {capitalizeFullName(userName) || "Sarah Johnson"}
                </p>
                <p className="text-xs text-purple-600 truncate flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Pro Plan</span>
                </p>
              </div>
            </div>
          </div>

          {/* Logout button */}
          <div className="px-4 pt-1 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="mt-3 mb-2 flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
