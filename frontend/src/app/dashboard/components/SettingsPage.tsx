"use client";

import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";

interface SettingsPageProps {
  onBack: () => void;
  onViewChange: (view: string) => void;
}

/** Strict setting types so TS can narrow by `type` */
type InputSetting = { label: string; type: "input"; value: string };
type SwitchSetting = { label: string; type: "switch"; value: boolean };
type DisplaySetting = { label: string; type: "display"; value: string };

type SettingItem = InputSetting | SwitchSetting | DisplaySetting;

interface SettingsCategory {
  title: string;
  icon: "User" | "Bell" | "Shield" | "CreditCard";
  color: string;
  settings: SettingItem[];
}

const iconMap: Record<SettingsCategory["icon"], React.ElementType> = {
  User,
  Bell,
  Shield,
  CreditCard,
};

export default function SettingsPage({
  onBack,
  onViewChange,
}: SettingsPageProps) {
  const [settingsCategories, setSettingsCategories] = useState<
    SettingsCategory[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/settingsCategories");
        const data: SettingsCategory[] = await res.json();

        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        const storedProfile = localStorage.getItem("businessProfile");
        const profile = storedProfile ? JSON.parse(storedProfile) : null;

        const storedPhone = localStorage.getItem("phone") ?? "";

        const updatedData = data.map((category) => {
          if (category.title === "Profile Settings") {
            return {
              ...category,
              settings: category.settings.map((setting) => {
                if (setting.type === "input") {
                  if (setting.label === "Full Name") {
                    return {
                      ...setting,
                      value: (user?.username ?? "") as string,
                    };
                  }
                  if (setting.label === "Email") {
                    return { ...setting, value: (user?.email ?? "") as string };
                  }
                  if (setting.label === "Company") {
                    return {
                      ...setting,
                      value: (profile?.businessName ?? "") as string,
                    };
                  }
                  if (setting.label === "Phone") {
                    return { ...setting, value: storedPhone };
                  }
                }
                // for switch/display just return as-is (no changes)
                return setting;
              }),
            };
          }
          return category;
        });

        setSettingsCategories(updatedData);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    fetchData();
  }, []);

  if (!settingsCategories) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-600 text-sm sm:text-base">
          Loading settings data...
        </p>
      </div>
    );
  }

  const handleInputChange = (
    categoryIndex: number,
    settingIndex: number,
    value: string
  ) => {
    setSettingsCategories((prev) => {
      if (!prev) return prev;
      // create new array references (no mutation)
      return prev.map((cat, ci) =>
        ci !== categoryIndex
          ? cat
          : {
              ...cat,
              settings: cat.settings.map((s, si) =>
                si === settingIndex && s.type === "input" ? { ...s, value } : s
              ),
            }
      );
    });
  };

  const handleSwitchChange = (
    categoryIndex: number,
    settingIndex: number,
    checked: boolean
  ) => {
    setSettingsCategories((prev) => {
      if (!prev) return prev;
      return prev.map((cat, ci) =>
        ci !== categoryIndex
          ? cat
          : {
              ...cat,
              settings: cat.settings.map((s, si) =>
                si === settingIndex && s.type === "switch"
                  ? { ...s, value: checked }
                  : s
              ),
            }
      );
    });
  };

  const saveProfilePhone = () => {
    // read latest state (we know settingsCategories is non-null in UI)
    const profileCategory = settingsCategories.find(
      (c) => c.title === "Profile Settings"
    );
    const phoneSetting = profileCategory?.settings.find(
      (s) => s.type === "input" && s.label === "Phone"
    ) as InputSetting | undefined;

    if (!phoneSetting) {
      alert("Phone field not found.");
      return;
    }

    const phoneValue = phoneSetting.value?.trim();
    if (!phoneValue) {
      alert("Please enter a valid phone number before saving.");
      return;
    }

    // safe: phoneValue is string
    localStorage.setItem("phone", phoneValue);
    alert("Phone number saved successfully!");
  };

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
        {settingsCategories.map((category, categoryIndex) => {
          const Icon = iconMap[category.icon];
          return (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 ${category.color}`} />
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.settings.map((setting, settingIndex) => (
                  <div
                    key={settingIndex}
                    className="flex items-center justify-between"
                  >
                    <Label className="text-sm font-medium">
                      {setting.label}
                    </Label>

                    <div className="flex items-center">
                      {setting.type === "input" && (
                        <Input
                          value={setting.value}
                          className="w-48"
                          // only phone writable
                          disabled={setting.label !== "Phone"}
                          onChange={(e) =>
                            setting.label === "Phone" &&
                            handleInputChange(
                              categoryIndex,
                              settingIndex,
                              e.target.value
                            )
                          }
                        />
                      )}

                      {setting.type === "switch" && (
                        <Switch
                          checked={setting.value}
                          onCheckedChange={(checked) =>
                            handleSwitchChange(
                              categoryIndex,
                              settingIndex,
                              Boolean(checked)
                            )
                          }
                        />
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
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-gray-900 text-white"
                    onClick={saveProfilePhone}
                  >
                    Save Changes
                  </Button>
                )}

                {category.title === "Billing" && (
                  <div className="space-y-2 mt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => onViewChange("pricing")}
                    >
                      Upgrade Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
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
            <Button variant="destructive" className="text-white bg-red-400">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
