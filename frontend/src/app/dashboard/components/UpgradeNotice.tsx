"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export interface UpgradeProps {
  feature: string;
  onUpgrade: () => void;
}

const UpgradeNotice: React.FC<UpgradeProps> = ({ feature, onUpgrade }) => (
  <div className="p-6 border rounded-xl bg-red-50 text-center space-y-4">
    <p className="text-lg font-semibold">
      Upgrade required to access: {feature}
    </p>
    <Button onClick={onUpgrade}>Upgrade Plan</Button>
  </div>
);

export default UpgradeNotice;
