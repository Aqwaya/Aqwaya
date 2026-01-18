"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { saveUser } from "@/lib/mockUser";
import { plans, type Plan } from "@/lib/plan";
import { CheckCircle } from "lucide-react";
import clsx from "clsx";

interface PricingPageProps {
  onBack: () => void;
}

export default function PricingPage({ onBack }: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [fxRate, setFxRate] = useState(1500); // fallback
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUserEmail(userObj.email);
    }
  }, []);

  useEffect(() => {
    async function loadFx() {
      try {
        const res = await fetch("/api/fx-rate");
        const data = await res.json();
        if (data.success) setFxRate(data.rate);
      } catch {}
    }
    loadFx();
  }, []);

  const getPrice = (plan: Plan) => {
    if (billingCycle === "monthly") return plan.price;
    return Math.round(plan.price * 12 * 0.85); // 15% annual discount
  };

  const handleSubscribe = async (plan: Plan): Promise<void> => {
    const calculatedPrice = getPrice(plan);

    saveUser({
      planId: plan.id,
      credits: plan.credits,
      planName: plan.name,
      activated: false,
      paymentStatus: "unpaid",
    });

    const ngnAmount = Math.round(calculatedPrice * fxRate);

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: ngnAmount,
          email: userEmail,
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
    <div className="py-10">
      <Button variant="outline" onClick={onBack} className="mb-6">
        Back
      </Button>

      <h1 className="text-4xl font-bold text-center mb-2">Plans & Pricing</h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
        Choose the plan that fits your needs. No hidden fees. Change or cancel
        anytime.
      </p>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-10 gap-4">
        <Button
          variant={billingCycle === "monthly" ? "default" : "secondary"}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </Button>

        <Button
          variant={billingCycle === "annual" ? "default" : "ghost"}
          onClick={() => setBillingCycle("annual")}
        >
          Annual <span className="ml-2 text-green-600">15% off</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isPopular = plan.id === "pro";
          const showPrice = getPrice(plan);

          return (
            <div
              key={plan.id}
              className={clsx(
                "p-6 rounded-2xl bg-white border transition-all duration-300 cursor-pointer",
                "hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]",
                isPopular
                  ? "border-yellow-400 shadow-xl bg-yellow-50/20"
                  : "border-gray-200 shadow"
              )}
            >
              <h2 className="text-2xl font-semibold text-center mb-2">
                {plan.name}
              </h2>

              <p className="text-4xl font-bold text-center mb-1">
                ${showPrice}
              </p>

              <p className="text-center text-gray-600 mb-1">
                {billingCycle === "annual" ? (
                  <span className="text-green-600 text-sm">
                    (billed annually)
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm">(per month)</span>
                )}
              </p>

              <p className="text-center text-gray-600 mb-6">
                {plan.credits} AI Credits
              </p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 w-5 h-5 mt-0.5" />
                    <span className="text-sm text-gray-800">
                      <span className="font-medium">{f.label}</span>:{" "}
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
                className={clsx(
                  "w-full py-3 text-lg font-semibold",
                  isPopular ? "bg-black text-white" : "bg-blue-600 text-white"
                )}
                onClick={() => handleSubscribe(plan)}
              >
                Select Plan
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
