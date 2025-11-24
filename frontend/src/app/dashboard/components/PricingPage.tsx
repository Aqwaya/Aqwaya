"use client";

import { Button } from "@/components/ui/button";
import { saveUser } from "@/lib/mockUser";
import { plans, type Plan } from "@/lib/plan";

interface PricingPageProps {
  onBack: () => void;
}

export default function PricingPage({ onBack }: PricingPageProps) {

  const handleSubscribe = async (plan: Plan): Promise<void> => {
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
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack}>Back</Button>

      <h1 className="text-3xl font-bold text-center">Choose Your Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-6 rounded-xl shadow space-y-3">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-3xl font-bold">${plan.price}</p>
            <p className="text-gray-600">{plan.credits} AI Credits</p>

            <ul className="text-sm text-gray-700 space-y-1">
              {plan.features.map((f) => (
                <li key={f.label}>
                  ✔ {f.label}:{" "}
                  <span className="font-medium">
                    {f.available === true
                      ? "Included"
                      : f.available === false
                      ? "Not available"
                      : f.available}
                  </span>
                </li>
              ))}
            </ul>

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
