import { NextResponse } from "next/server";
import { listUsers } from "@/lib/db";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: listUsers(),
  });
}
