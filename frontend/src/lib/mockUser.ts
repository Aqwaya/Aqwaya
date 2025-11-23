export type UserPlan = "free" | "starter" | "pro" | "agency";

export interface User {
  id: string;
  email: string;
  credits: number;
  plan: "starter" | "pro" | "agency";
}

export interface MockUser {
  planId: UserPlan;
  credits: number;
  planName: string;
  paymentStatus?: "paid" | "unpaid";
  activated?: boolean;
}

export function getUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("mockUser");
  return data ? (JSON.parse(data) as MockUser) : null;
}

export function saveUser(user: MockUser): void {
  localStorage.setItem("mockUser", JSON.stringify(user));
}

export function updateUser(updates: Partial<MockUser>): MockUser {
  const currentUser = getUser();

  const updatedUser: MockUser = {
    planId: currentUser?.planId ?? "free",
    credits: currentUser?.credits ?? 0,
    planName: currentUser?.planName ?? "",
    paymentStatus: currentUser?.paymentStatus,
    activated: currentUser?.activated,
    ...updates,
  };

  localStorage.setItem("mockUser", JSON.stringify(updatedUser));
  return updatedUser;
}
