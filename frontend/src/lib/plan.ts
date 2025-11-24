export interface PlanFeature {
  label: string;
  available: boolean | string; 
}

export interface Plan {
  id: "free" | "starter" | "pro" | "agency";
  name: string;
  price: number;
  credits: number;
  validDays: number;
  features: PlanFeature[];
}

// Plans data mock (Frontend API Mock)
export const plans: Plan[] = [
  {
    id: "free",
    name: "Free Trial",
    price: 0,
    credits: 200,
    validDays: 30,
    features: [
      { label: "Email Campaigns (AI)", available: "Up to 3 emails" },
      { label: "WhatsApp Text Generation", available: "Limited" },
      { label: "AI Landing Page Builder", available: false },
      { label: "Auto Reply / Sequence", available: false },
      { label: "Team Members", available: "1" },
      { label: "Custom Domain", available: false },
      { label: "Credit Rollover", available: false },
      { label: "A/B Copy Testing Suggestions", available: false },
      { label: "Priority Support", available: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 5,
    credits: 800,
    validDays: 30,
    features: [
      { label: "Email Campaigns (AI)", available: true },
      { label: "WhatsApp Text Generation", available: true },
      { label: "AI Landing Page Builder", available: true },
      { label: "Auto Reply / Sequence", available: "Basic" },
      { label: "Team Members", available: "1" },
      { label: "Custom Domain", available: "Add-on" },
      { label: "Credit Rollover", available: "30 days" },
      { label: "A/B Copy Testing Suggestions", available: true },
      { label: "Priority Support", available: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 22,
    credits: 5500,
    validDays: 30,
    features: [
      { label: "Email Campaigns (AI)", available: true },
      { label: "WhatsApp Text Generation", available: true },
      { label: "AI Landing Page Builder", available: true },
      { label: "Auto Reply / Sequence", available: "Advanced" },
      { label: "Team Members", available: "Up to 3" },
      { label: "Custom Domain", available: "Add-on" },
      { label: "Credit Rollover", available: "30 days" },
      { label: "A/B Copy Testing Suggestions", available: true },
      { label: "Priority Support", available: true },
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: 49,
    credits: 14000,
    validDays: 30,
    features: [
      { label: "Email Campaigns (AI)", available: true },
      { label: "WhatsApp Text Generation", available: true },
      { label: "AI Landing Page Builder", available: true },
      { label: "Auto Reply / Sequence", available: "Full" },
      { label: "Team Members", available: "Up to 10" },
      { label: "Custom Domain", available: true },
      { label: "Credit Rollover", available: "30 days" },
      { label: "A/B Copy Testing Suggestions", available: true },
      { label: "Priority Support", available: true },
    ],
  },
];
