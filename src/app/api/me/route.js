import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = getAuthUser(req);

    return NextResponse.json({
      message: "Authorized",
      user,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
