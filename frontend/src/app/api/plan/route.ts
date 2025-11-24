import { NextResponse } from "next/server";
import { plans } from "@/lib/plan";

export function GET() {
  return NextResponse.json({ success: true, plans });
}
