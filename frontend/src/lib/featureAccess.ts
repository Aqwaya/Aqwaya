import { Plan } from "./plan";

export function canUseFeature(plan: Plan, featureName: string) {
  const feature = plan.features.find(f => f.label === featureName);
  if (!feature) return false;

  if (feature.available === true) return true;
  if (feature.available === false) return false;

  // for values like "Basic", "Advanced", "Full", "Up to 3", "Add-on"
  return feature.available;
}
