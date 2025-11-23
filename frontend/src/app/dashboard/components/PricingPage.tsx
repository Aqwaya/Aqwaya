"use client";

import { Button } from "@/components/ui/button";
import { saveUser } from "@/lib/mockUser";
import type { Plan } from "@/lib/plan"; // if stored separately

interface PricingPageProps {
  onBack: () => void;
}
export interface Plan {
  id: "starter" | "pro" | "agency";
  name: string;
  price: number;
  credits: number;
}


export default function PricingPage({ onBack }: PricingPageProps) {
  const plans: Plan[] = [
    { id: "starter", name: "Starter", price: 5, credits: 800 },
    { id: "pro", name: "Pro", price: 22, credits: 5500 },
    { id: "agency", name: "Agency", price: 49, credits: 14000 },
  ];

  const handleSubscribe = async (plan: Plan): Promise<void> => {
    // Save selected plan temporarily
    saveUser({
      planId: plan.id,
      credits: plan.credits,
      planName: plan.name,
      activated: false,
      paymentStatus: "unpaid",
    });

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price * 100,
          email: "customer@email.com",
        }),
      });

      const data = await res.json();

      if (data.status) {
        window.location.href = data.data.authorization_url;
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error initializing payment");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>

      <h1 className="text-3xl font-bold text-center">Choose Your Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-6 rounded-xl shadow space-y-3">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-3xl font-bold">${plan.price}</p>
            <p className="text-gray-600">{plan.credits} AI Credits</p>

            <Button
              className="w-full bg-blue-600 text-white"
              onClick={() => handleSubscribe(plan)}
            >
              Subscribe
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
